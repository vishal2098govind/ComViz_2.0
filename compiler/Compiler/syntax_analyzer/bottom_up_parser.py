# E -> var id = E1       { id.value = E1.value }
#   -> E1 and C          { E.value = E1.value and C.value }
#   -> E1 or C           { E.value = E1.value or C.value }
#   -> C                 { E.value = C.value }
# --------------------------------------------------------------
# C -> not C1            { C.value = !C1.value }
#   -> C1 == Ar          { C.value = C1.value == Ar.value }
#   -> C1 >= Ar          { C.value = C1.value >= Ar.value }
#   -> C1 <= Ar          { C.value = C1.value <= Ar.value }
#   -> C1 < Ar           { C.value = C1.value < Ar.value }
#   -> C1 > Ar           { C.value = C1.value > Ar.value }
#   -> C1 != Ar          { C.value = C1.value != Ar.value }
#   -> Ar                { C.value = Ar.value }
# --------------------------------------------------------------
# Ar -> Ar1 + T          { Ar.value = Ar1.value + T.value }
#    -> Ar1 - T          { Ar.value = Ar1.value - T.value }
#    -> T                { Ar.value = T.value }
# --------------------------------------------------------------
# T  -> T1 * F           { T.value = T1.value * F.value }
#    -> T1 / F           { T.value = T1.value / F.value }
#    -> F                { T.value = F.value }
# --------------------------------------------------------------
# F  -> + P              { F.value = P.value }
#    -> - P              { F.value = -1 * P.value }
#    -> P                { F.value = P.value }
# --------------------------------------------------------------
# P  -> A ^ P1           { P.value = A.value ^ P1.value }
#    -> A                { P.value = A.value }
# --------------------------------------------------------------
# A  -> ( E )            { A.value = E.value }
#    -> int              { A.value = int }
#    -> float            { A.value = float }
#    -> id               { A.value = id.value }
# --------------------------------------------------------------


from Compiler.syntax_analyzer.node_classes import Error

import uuid

from anytree import AnyNode

from Visualizer.visualize_pt import visualize_bup_parse_tree

from Visualizer.visualize_ast import visualize_bottom_up_ast

from Compiler.semantic_analyzer.data_types import Number


class REError:
    def __init__(self, msg):
        self.err_msg = 'Runtime Error: '+ msg


class BUParser:
    def __init__(self, tokens, parsing_table, global_symbol_table):
        self.tokens = tokens
        self.parsing_table = parsing_table
        self.syntax_error = None
        self.runtime_error = None
        self.digraphs = None
        self.runtime_result = None
        self.symbol_table = global_symbol_table

    def bottom_up_parse(self):
        stack = [1]
        l = 0
        token_list = []
        for token in self.tokens:
            token_name = token.value if token.value is not None else token.type

            token_node = AnyNode(id=uuid.uuid4(), name=token_name, parser_type=token.parser_type, value=token.type)
            token_list.append(token_node)

        while True:
            look_ahead = token_list[l]
            state = stack[-1]
            pte = self.parsing_table.get(state, look_ahead.parser_type)
            if isinstance(pte, Error):
                print(stack)
                self.syntax_error = pte.msg
                print(pte.msg)
                break
            elif pte.move == 'Shift':
                stack.append(look_ahead)
                stack.append(pte.value)
                l += 1
                # print(stack)
                visualize_bup_parse_tree(stack)

            elif pte.move == 'Reduce':
                lhs = pte.value.lhs
                rhs = pte.value.rhs
                parent_node = AnyNode(id=uuid.uuid4(), name=lhs.node_val, value=None, ast_children=None)
                children = []
                node_name = f'eval_{parent_node.name}_node'
                eval_node = getattr(self, node_name)

                for i in range(2 * len(rhs)):
                    top = stack.pop()
                    if not isinstance(top, int):
                        children.append(top)
                for child in children[::-1]:
                    # print(child.name, end=' ')
                    child.parent = parent_node
                for child in children:
                    print(child.name)
                parent_node.value, parent_node.ast_children = eval_node(children[::-1])
                if parent_node.value is None:
                     print(parent_node.ast_children[0].err_msg)
                     self.runtime_error = parent_node.ast_children[0].err_msg
                else:
                    print(parent_node.value)
                    # print('Evaluation Result: ',parent_node.ast_children[0].value)
                    self.runtime_result=parent_node.ast_children[0].value
                stack.append(parent_node)
                goto = self.parsing_table.get(stack[-2], lhs.node_val)
                stack.append(goto.value)
                # print(stack)
                visualize_bup_parse_tree(stack)

            elif pte.move == 'Accept':
                print('Accepted')
                break

    def eval_E_node(self, pt_children):
        if len(pt_children) == 3:

            if pt_children[1].parser_type == 'and':
                ast_node = AnyNode(id=uuid.uuid4(), name='and', value=pt_children[0].value and pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value and pt_children[2].value, (ast_node,)

            elif pt_children[1].parser_type == 'or':
                ast_node = AnyNode(id=uuid.uuid4(), name='or', value=pt_children[0].value or pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value or pt_children[2].value, (ast_node,)

        elif len(pt_children) == 4:

            id_node = AnyNode(id=uuid.uuid4(), name=pt_children[1].value, value=pt_children[1].value)
            self.symbol_table.set_var_value(pt_children[1].name, Number(pt_children[3].value))
            print(self.symbol_table)

            ast_node = AnyNode(id=uuid.uuid4(), name='=', value=pt_children[3].value,
                               children=list(pt_children[3].ast_children)+[id_node])

            visualize_bottom_up_ast(ast_node)

            return pt_children[3].value, (ast_node,)

        else:
            if isinstance(pt_children[0].ast_children, REError):
                return pt_children[0].value, pt_children[0].ast_children
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_C_node(self, pt_children):
        if len(pt_children) == 2:
            ast_node = AnyNode(id=uuid.uuid4(), name='not', value=not pt_children[1].value,
                               children=[pt_children[0].value, pt_children[1].ast_children])
            visualize_bottom_up_ast(ast_node)
            return not pt_children[1].value, (ast_node,)
        elif len(pt_children) == 3:
            if pt_children[1].name == '==':
                ast_node = AnyNode(id=uuid.uuid4(), name='==', value=int(pt_children[0].value == pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value == pt_children[2].value), (ast_node,)
            elif pt_children[1].name == '>=':
                ast_node = AnyNode(id=uuid.uuid4(), name='>=', value=int(pt_children[0].value >= pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value >= pt_children[2].value), (ast_node,)
            elif pt_children[1].name == '<=':
                ast_node = AnyNode(id=uuid.uuid4(), name='<=', value=int(pt_children[0].value <= pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value <= pt_children[2].value), (ast_node,)
            elif pt_children[1].value == '<':
                ast_node = AnyNode(id=uuid.uuid4(), name='<', value=int(pt_children[0].value < pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value < pt_children[2].value), (ast_node,)
            elif pt_children[1].name == '>':
                ast_node = AnyNode(id=uuid.uuid4(), name='>', value=int(pt_children[0].value > pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value > pt_children[2].value), (ast_node,)
            elif pt_children[1].name == '!=':
                ast_node = AnyNode(id=uuid.uuid4(), name='!=', value=int(pt_children[0].value != pt_children[2].value),
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].value != pt_children[2].value), (ast_node,)
        else:
            if isinstance(pt_children[0].ast_children, REError):
                return pt_children[0].value, pt_children[0].ast_children
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_Ar_node(self, pt_children):
        if len(pt_children) == 3:
            if pt_children[1].value == '+':
                ast_node = AnyNode(id=uuid.uuid4(), name='+', value=pt_children[0].value + pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value + pt_children[2].value, (ast_node,)
            elif pt_children[1].value == '-':
                ast_node = AnyNode(id=uuid.uuid4(), name='-', value=pt_children[0].value - pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value - pt_children[2].value, (ast_node,)
        else:
            if isinstance(pt_children[0].ast_children, REError):
                return pt_children[0].value, pt_children[0].ast_children
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_T_node(self, pt_children):
        if len(pt_children) == 3:
            if pt_children[1].value == '*':
                ast_node = AnyNode(id=uuid.uuid4(), name='*', value=pt_children[0].value * pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value * pt_children[2].value, (ast_node,)
            elif pt_children[1].value == '/':
                if pt_children[2].value == 0:
                    return None, (REError('Division by Zero'),)
                ast_node = AnyNode(id=uuid.uuid4(), name='/', value=pt_children[0].value / pt_children[2].value,
                                   children=pt_children[0].ast_children + pt_children[2].ast_children)
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value / pt_children[2].value, (ast_node,)
        else:
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_F_node(self, pt_children):
        if len(pt_children) == 2:
            if pt_children[0].value == '-':
                ast_node = AnyNode(id=uuid.uuid4(), name=pt_children[1].value, value=-1 * pt_children[1].value,
                                   children=pt_children[1].ast_children)
                visualize_bottom_up_ast(ast_node)
                return -1 * pt_children[1].value, (ast_node)
            ast_node = AnyNode(id=uuid.uuid4(), value=pt_children[1].value, name=pt_children[1].value,
                               children=pt_children[1].ast_children)
            visualize_bottom_up_ast(ast_node)
            return pt_children[1].value, (ast_node,)
        else:
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_P_node(self, pt_children):
        if len(pt_children) == 3:
            ast_node = AnyNode(id=uuid.uuid4(), value=pt_children[0].value ** pt_children[2].value, name='^',
                               children=pt_children[0].ast_children + pt_children[2].ast_children)
            if type(pt_children[0].value) == type(pt_children[2].value):
                visualize_bottom_up_ast(ast_node)
                return pt_children[0].value ** pt_children[2].value, (ast_node,)
        else:
            return pt_children[0].value, (pt_children[0].ast_children[0],)

    def eval_A_node(self, pt_children):
        if len(pt_children) == 3:
            ast_node = AnyNode(id=uuid.uuid4(), name=pt_children[1].value, value=pt_children[1].value,
                               children=pt_children[1].ast_children)
            visualize_bottom_up_ast(ast_node)
            return pt_children[1].value, (ast_node,)
        else:
            if pt_children[0].value == 'int':
                ast_node = AnyNode(id=uuid.uuid4(), name=pt_children[0].name, value=int(pt_children[0].name),
                                   children=())
                visualize_bottom_up_ast(ast_node)
                return int(pt_children[0].name), (ast_node,)
            elif pt_children[0].value == 'float':
                ast_node = AnyNode(id=uuid.uuid4(), name=pt_children[0].name, value=float(pt_children[0].name),
                                   children=())
                visualize_bottom_up_ast(ast_node)
                return float(pt_children[0].name), (ast_node,)
            elif pt_children[0].value == 'id':
                value = self.symbol_table.get_var_value(pt_children[0].name).number_value
                if value is not None:
                    ast_node = AnyNode(id=uuid.uuid4(), name=pt_children[0].name, value=value, children=())
                    return value, (ast_node,)
                else:
                    return None, (REError(f'{pt_children[0].name} is not defined'), )