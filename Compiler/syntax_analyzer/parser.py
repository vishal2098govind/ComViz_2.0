# ---------------------GRAMMAR with SDT---------------------
# E  -> C E1     { E1.left_child = T ; E = E1}
#    -> var ID EQ E
# ----------------------------------------------------------
# E1 -> AND C E1
#    -> OR C E1
#    -> e
# ----------------------------------------------------------
# C  -> NOT C
#    -> A C1
# ----------------------------------------------------------
# C1 -> < A C1
#    -> <= A C1
#    -> > A C1
#    -> >= A C1
#    -> == A C1
#    -> != A C1
#    -> e
# ----------------------------------------------------------
# A  -> T A1
# ----------------------------------------------------------
# A1 -> + T A1 { A1_l.left_child = A1.left_child + T }
#    -> - T A1 { A1_l.left_child = A1.left_child - T }
#    -> e      { E1 = E1.left_child }
# ----------------------------------------------------------
# T  -> F T1     { T1.left_child = F }
# T1 -> * F T1   { T1_l.left_child = T1.left_child * F }
#    -> / F T1   { T1_l.left_child = T1.left_child / F }
#    -> e        { T1 = T1.left_child }
# ----------------------------------------------------------
# F  -> + P      { F = + P }
#    -> - P      { F = - P }
#    -> P        { F = P }
# ----------------------------------------------------------
# P  -> L ^ P    { P = L ^ P }
#    -> L        { P = L }
# ----------------------------------------------------------
# L  -> int
#    -> float
#    -> ID
#    -> ( E )

from anytree import AnyNode

from Compiler.error_handler.invalid_syntax_error import InvalidSyntaxError
from Compiler.lexical_analyzer.constants import *
from Compiler.syntax_analyzer.nodes import *
from Compiler.syntax_analyzer.parse_result import ParseResult
from Visualizer.visualize_pt import visualize_parse_tree


class Parser:
    def __init__(self, tokens_list):
        self.tokens_list = tokens_list
        self.token_index = -1
        self.current_token = None
        self.trace = []
        self.ast_trace = []
        self.advance_token()

    def advance_token(self):
        self.token_index += 1

        if self.token_index < len(self.tokens_list):
            self.current_token = self.tokens_list[self.token_index]

        return self.current_token

    def parse(self, caller=None):

        non_terminal_node = AnyNode(id='E' + str(len(self.trace)), name='E', parent=caller)
        self.trace.append(non_terminal_node)
        visualize_parse_tree(self.trace)
        parse_result = self.expression(caller=non_terminal_node)

        if not parse_result.error and self.current_token.type != TT_EOF:
            return parse_result.failure(InvalidSyntaxError(position_start=self.current_token.position_start,
                                                           position_end=self.current_token.position_end,
                                                           error_details="Expected + or - or * or /"))
        # print(self.trace)

        return parse_result

    # L -> int | float | ID | ( E )
    def leaf(self, caller):
        parse_result = ParseResult()
        token = self.current_token

        # L -> int | float
        if token.type in (TT_INT, TT_FLOAT):
            terminal_node = AnyNode(id='number' + str(len(self.trace)), name=token, parent=caller)

            self.trace.append(terminal_node)
            visualize_parse_tree(self.trace)

            self.ast_trace.append(NumberNode(number_token=token))

            parse_result.register(self.advance_token())
            return parse_result.success(node=NumberNode(number_token=token))

        # L -> ID
        if token.type == TT_IDENTIFIER:
            terminal_id_node = AnyNode(id='ID' + str(len(self.trace)), name='ID', parent=caller)
            self.trace.append(terminal_id_node)

            parse_result.register(self.advance_token())

            self.ast_trace.append(VariableAccessNode(var_name_token=token))

            return parse_result.success(node=VariableAccessNode(var_name_token=token))

        # L -> ( E )
        elif token.type == TT_LPAREN:
            terminal_node = AnyNode(id='(' + str(len(self.trace)), name='(', parent=caller)
            self.trace.append(terminal_node)

            non_terminal_e_node = AnyNode(id='E' + str(len(self.trace)), name='E', parent=caller)
            self.trace.append(non_terminal_e_node)

            terminal_node = AnyNode(id=')' + str(len(self.trace)), name=')', parent=caller)
            self.trace.append(terminal_node)

            parse_result.register(self.advance_token())

            e_node = parse_result.register(parse_result=self.expression(caller=non_terminal_e_node))
            if parse_result.error:
                return parse_result

            if self.current_token.type == TT_RPAREN:
                parse_result.register(self.advance_token())
                return parse_result.success(node=e_node)
            else:
                # Syntax Error
                return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                     position_end=token.position_end,
                                                                     error_details=f'Expected ), '
                                                                                   f'found {self.current_token.type}'))

        else:
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected int or float or ID or (, '
                                                                               f'found {token}'))

    # P -> L ^ P | L ( LL(2) )
    def power(self, caller):
        parse_result = ParseResult()
        token = self.current_token
        power_token = self.tokens_list[self.token_index + 1] if self.token_index + 1 < len(self.tokens_list) else None

        if token.type in (TT_INT, TT_FLOAT, TT_LPAREN, TT_IDENTIFIER) or (power_token and power_token.type == TT_POWER):

            # P -> A ^ P ( LL(2) )
            if power_token.type == TT_POWER:
                non_terminal_a_node = AnyNode(id='A' + str(len(self.trace)), name='A', parent=caller)
                self.trace.append(non_terminal_a_node)

                terminal_power_node = AnyNode(id='^' + str(len(self.trace)), name='^', parent=caller)
                self.trace.append(terminal_power_node)

                non_terminal_p_node = AnyNode(id='P' + str(len(self.trace)), name='P', parent=caller)
                self.trace.append(non_terminal_p_node)
                visualize_parse_tree(self.trace)

                a_node = parse_result.register(parse_result=self.leaf(caller=non_terminal_a_node))
                if parse_result.error:
                    return parse_result

                parse_result.register(self.advance_token())

                p_node = parse_result.register(parse_result=self.power(caller=non_terminal_p_node))
                if parse_result.error:
                    return parse_result

                self.ast_trace.append(BinaryOperationNode(left_node=a_node,
                                                          operator_token=power_token, right_node=p_node))

                return parse_result.success(node=BinaryOperationNode(left_node=a_node, operator_token=power_token,
                                                                     right_node=p_node))

            # P -> L
            non_terminal_a_node = AnyNode(id='A' + str(len(self.trace)), name='A', parent=caller)
            self.trace.append(non_terminal_a_node)
            visualize_parse_tree(self.trace)

            a_node = parse_result.register(parse_result=self.leaf(caller=non_terminal_a_node))
            if parse_result.error:
                return parse_result

            return parse_result.success(node=a_node)

        else:
            if token.type in (TT_INT, TT_FLOAT, TT_LPAREN, TT_IDENTIFIER) and power_token.type != TT_POWER:
                return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                     position_end=token.position_end,
                                                                     error_details=f'Expected ^ after {token}, '
                                                                                   f'found {power_token}'))
            elif token.type not in (TT_INT, TT_FLOAT, TT_LPAREN, TT_IDENTIFIER):
                return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                     position_end=token.position_end,
                                                                     error_details=f'Expected int or float or ( or ID, '
                                                                                   f'found {token}'))

    # F -> + P | - P | P
    def factor(self, caller):
        parse_result = ParseResult()
        token = self.current_token

        # F -> + P | - P
        if token.type in (TT_PLUS, TT_MINUS):
            operator_token = token
            terminal_node = AnyNode(id='+' + str(len(self.trace)), name=token, parent=caller)
            self.trace.append(terminal_node)

            non_terminal_f_node = AnyNode(id='F' + str(len(self.trace)), name='F', parent=caller)
            self.trace.append(non_terminal_f_node)
            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())

            p_node = parse_result.register(self.power(caller=non_terminal_f_node))
            if parse_result.error:
                return parse_result

            self.ast_trace.append(UnaryOperationNode(operator_token=operator_token, right_node=p_node))

            return parse_result.success(node=UnaryOperationNode(operator_token=operator_token, right_node=p_node))

        # F -> P
        elif token.type in (TT_LPAREN, TT_INT, TT_FLOAT, TT_IDENTIFIER):
            non_terminal_p_node = AnyNode(id='P' + str(len(self.trace)), name='P', parent=caller)
            self.trace.append(non_terminal_p_node)
            visualize_parse_tree(self.trace)

            p_node = parse_result.register(parse_result=self.power(caller=non_terminal_p_node))
            if parse_result.error:
                return parse_result

            return parse_result.success(node=p_node)

        else:
            # Syntax Error
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected token of type int or float '
                                                                               'or + or - or ( or ID, '
                                                                               f'found {token}'))

    # T1 -> * F T1 | / F T1 | e
    def term_1(self, left_child, caller):
        parse_result = ParseResult()
        operator_token = self.current_token

        # T1 -> * F T1 | / F T1
        if operator_token.type in (TT_MUL, TT_DIV):
            terminal_node = AnyNode(id='*//' + str(len(self.trace)), name=operator_token, parent=caller)
            self.trace.append(terminal_node)

            non_terminal_f_node = AnyNode(id='F' + str(len(self.trace)), name='F', parent=caller)
            self.trace.append(non_terminal_f_node)

            non_terminal_t1_node = AnyNode(id='T1' + str(len(self.trace)), name='T1', parent=caller)
            self.trace.append(non_terminal_t1_node)
            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())

            f_node = parse_result.register(self.factor(caller=non_terminal_f_node))

            if parse_result.error:
                return parse_result

            self.ast_trace.append(BinaryOperationNode(left_node=left_child,
                                                      operator_token=operator_token,right_node=f_node))

            t1_node = parse_result.register(
                parse_result=self.term_1(left_child=BinaryOperationNode(left_node=left_child,
                                                                        operator_token=operator_token,
                                                                        right_node=f_node),
                                         caller=non_terminal_t1_node))
            if parse_result.error:
                return parse_result

            else:
                return parse_result.success(node=t1_node)

        # T1 -> e
        elif operator_token.type in (TT_PLUS, TT_MINUS, TT_EOF, TT_RPAREN, TT_LT, TT_GT, TT_LTE, TT_GTE, TT_NE, TT_EE) \
                or (operator_token.type == TT_KEYWORD and operator_token.value in ('AND', 'OR')):
            terminal_e_node = AnyNode(id='e' + str(len(self.trace)), name='e', parent=caller)
            self.trace.append(terminal_e_node)
            visualize_parse_tree(self.trace)

            return parse_result.success(node=left_child)

        else:
            # Syntax Error
            return parse_result.failure(error=InvalidSyntaxError(position_start=operator_token.position_start,
                                                                 position_end=operator_token.position_end,
                                                                 error_details=f'Expected + or - or * or / or ) or '
                                                                               f'EOF, '
                                                                               f'found {operator_token}'))

    # T -> F T1
    def term(self, caller):

        parse_result = ParseResult()
        # T -> F T1
        if self.current_token.type in (TT_INT, TT_FLOAT, TT_PLUS, TT_MINUS, TT_LPAREN, TT_IDENTIFIER):

            non_terminal_f_node = AnyNode(id='F' + str(len(self.trace)), name='F', parent=caller)
            self.trace.append(non_terminal_f_node)

            non_terminal_t1_node = AnyNode(id='T1' + str(len(self.trace)), name='T1', parent=caller)
            self.trace.append(non_terminal_t1_node)
            visualize_parse_tree(self.trace)

            f_node = parse_result.register(parse_result=self.factor(caller=non_terminal_f_node))

            if parse_result.error:
                return parse_result

            t1_node = parse_result.register(parse_result=self.term_1(left_child=f_node, caller=non_terminal_t1_node))
            if parse_result.error:
                return parse_result

            else:
                return parse_result.success(node=t1_node)

        else:
            # Syntax Error
            return parse_result.failure(error=InvalidSyntaxError(position_start=self.current_token.position_start,
                                                                 position_end=self.current_token.position_end,
                                                                 error_details=f'Expected int or float or + or - or '
                                                                               f'( or ID '
                                                                               f'found {self.current_token}'))

    # A1 -> + T A1 | - T A1 | e
    def arith_expression_1(self, left_child, caller):
        parse_result = ParseResult()
        operator_token = self.current_token

        # A1 -> + T A1 | - T A1
        if operator_token.type in (TT_PLUS, TT_MINUS):

            terminal_node = AnyNode(id='+/-' + str(len(self.trace)), name=operator_token, parent=caller)
            self.trace.append(terminal_node)

            non_terminal_t_node = AnyNode(id='T' + str(len(self.trace)), name='T', parent=caller)
            self.trace.append(non_terminal_t_node)

            non_terminal_ae1_node = AnyNode(id='A1' + str(len(self.trace)), name='A1', parent=caller)
            self.trace.append(non_terminal_ae1_node)

            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())

            right_child = parse_result.register(parse_result=self.term(caller=non_terminal_t_node))

            if parse_result.error:
                return parse_result

            self.ast_trace.append(BinaryOperationNode(
                left_node=left_child,
                operator_token=operator_token,
                right_node=right_child
            ))

            e1_node = parse_result.register(parse_result=self.arith_expression_1(left_child=BinaryOperationNode(
                left_node=left_child,
                operator_token=operator_token,
                right_node=right_child
            ), caller=non_terminal_ae1_node))

            if parse_result.error:
                return parse_result

            else:
                return parse_result.success(node=e1_node)

        # A1 -> e
        elif operator_token.type in (TT_EOF, TT_RPAREN, TT_LT, TT_GT, TT_GTE, TT_LTE, TT_NE, TT_EE) or \
                (operator_token.type == TT_KEYWORD and operator_token.value in ('AND', 'OR')):
            terminal_e_node = AnyNode(id='e' + str(len(self.trace)), name='e', parent=caller)
            self.trace.append(terminal_e_node)

            visualize_parse_tree(self.trace)
            return parse_result.success(node=left_child)

        else:
            # Syntax Error
            return parse_result.failure(error=InvalidSyntaxError(position_start=operator_token.position_start,
                                                                 position_end=operator_token.position_end,
                                                                 error_details=f'Expected + or - or ) or EOF, '
                                                                               f'found {operator_token}'))

    # A -> T A1
    def arith_expression(self, caller):
        parse_result = ParseResult()
        token = self.current_token

        if token.type in (TT_INT, TT_FLOAT, TT_PLUS, TT_MINUS, TT_LPAREN, TT_IDENTIFIER):
            non_terminal_t_node = AnyNode(id='T'+str(len(self.trace)), name='T', parent=caller)
            self.trace.append(non_terminal_t_node)

            non_terminal_a1_node = AnyNode(id='A1'+str(len(self.trace)), name='A1', parent=caller)
            self.trace.append(non_terminal_a1_node)
            visualize_parse_tree(self.trace)

            t_node = parse_result.register(parse_result=self.term(caller=non_terminal_t_node))
            if parse_result.error:
                return parse_result

            a1_node = parse_result.register(parse_result=self.arith_expression_1(left_child=t_node,
                                                                                 caller=non_terminal_a1_node))
            if parse_result.error:
                return parse_result

            return parse_result.success(node=a1_node)

        else:
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected int or float or + or - or ( '
                                                                               f'or ID, found {token}'))

    # C1 -> < A C1 | <= A C1 | > A C1 | >= A C1 | == A C1 | != A C1 | e
    def comparison_expression_1(self, left_child, caller):
        parse_result = ParseResult()
        token = self.current_token

        # C1 -> < A C1 | <= A C1 | > A C1 | >= A C1 | == A C1 | != A C1
        if token.type in (TT_LT, TT_GT, TT_GTE, TT_LTE, TT_NE, TT_EE):
            terminal_comp_node = AnyNode(id=token.type+str(len(self.trace)), name=token.type, parent=caller)
            self.trace.append(terminal_comp_node)

            non_terminal_a_node = AnyNode(id='A'+str(len(self.trace)), name='A', parent=caller)
            self.trace.append(non_terminal_a_node)

            non_terminal_c1_node = AnyNode(id='C1'+str(len(self.trace)), name='C1', parent=caller)
            self.trace.append(non_terminal_c1_node)
            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())

            a_node = parse_result.register(parse_result=self.arith_expression(caller=non_terminal_a_node))
            if parse_result.error:
                return parse_result

            self.ast_trace.append(BinaryOperationNode(
                left_node=left_child, operator_token=token, right_node=a_node))

            c1_node = parse_result.register(parse_result=self.comparison_expression_1(left_child=BinaryOperationNode(
                left_node=left_child, operator_token=token, right_node=a_node), caller=non_terminal_c1_node))
            if parse_result.error:
                return parse_result

            return parse_result.success(node=c1_node)

        # C1 -> e
        elif token.type in (TT_RPAREN, TT_EOF) or (token.type == TT_KEYWORD and token.value in ('AND', 'OR')):
            terminal_e_node = AnyNode(id='e'+str(len(self.trace)), name='e', parent=caller)
            self.trace.append(terminal_e_node)
            visualize_parse_tree(self.trace)

            return parse_result.success(node=left_child)

        else:
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected < or <= or > or >= or == or '
                                                                               '!= or ) or EOF or AND or OR, '
                                                                               f'found {token}'))

    # C -> NOT C | A C1
    def comparison_expression(self, caller):
        parse_result = ParseResult()
        token = self.current_token

        # C -> NOT C
        if token.type == TT_KEYWORD and token.value == 'NOT':
            terminal_not_node = AnyNode(id='NOT'+str(len(self.trace)), name='NOT', parent=caller)
            self.trace.append(terminal_not_node)

            non_terminal_c_node = AnyNode(id='C'+str(len(self.trace)), name='C', parent=caller)
            self.trace.append(non_terminal_c_node)
            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())

            c_node = parse_result.register(parse_result=self.comparison_expression(caller=non_terminal_c_node))
            if parse_result.error:
                return parse_result

            self.ast_trace.append(UnaryOperationNode(operator_token=token, right_node=c_node))

            return parse_result.success(node=UnaryOperationNode(operator_token=token, right_node=c_node))

        # C -> A C1
        elif token.type in (TT_INT, TT_FLOAT, TT_PLUS, TT_MINUS, TT_LPAREN, TT_IDENTIFIER):
            non_terminal_a_node = AnyNode(id='A'+str(len(self.trace)), name='A', parent=caller)
            self.trace.append(non_terminal_a_node)

            non_terminal_c1_node = AnyNode(id='C1'+str(len(self.trace)), name='C1', parent=caller)
            self.trace.append(non_terminal_c1_node)
            visualize_parse_tree(self.trace)

            a_node = parse_result.register(parse_result=self.arith_expression(caller=non_terminal_a_node))
            if parse_result.error:
                return parse_result

            c1_node = parse_result.register(parse_result=self.comparison_expression_1(left_child=a_node,
                                                                                      caller=non_terminal_c1_node))
            if parse_result.error:
                return parse_result

            return parse_result.success(node=c1_node)

        else:
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected NOT or int or float or + or '
                                                                               f'- or ( or ID, found {token}'))

    # E1 -> AND C E1 | OR C E1 | e
    def expression_1(self, left_child, caller):
        parse_result = ParseResult()
        token = self.current_token

        # E1 -> AND C E1 | OR C E1
        if token.type == TT_KEYWORD and token.value in ('AND', 'OR'):
            terminal_logical_node = AnyNode(id=token.value + str(len(self.trace)), name=token.value, parent=caller)
            self.trace.append(terminal_logical_node)

            non_terminal_c_node = AnyNode(id='C' + str(len(self.trace)), name='C', parent=caller)
            self.trace.append(non_terminal_c_node)

            non_terminal_e1_node = AnyNode(id='E1' + str(len(self.trace)), name='E1', parent=caller)
            self.trace.append(non_terminal_e1_node)
            visualize_parse_tree(self.trace)

            parse_result.register(parse_result=self.advance_token())

            c_node = parse_result.register(parse_result=self.comparison_expression(caller=non_terminal_c_node))
            if parse_result.error:
                return parse_result

            self.ast_trace.append(BinaryOperationNode(left_node=left_child, operator_token=token,
                                               right_node=c_node))

            e1_node = parse_result.register(parse_result=self.expression_1(
                left_child=BinaryOperationNode(left_node=left_child, operator_token=token,
                                               right_node=c_node), caller=non_terminal_e1_node))

            if parse_result.error:
                return parse_result

            return parse_result.success(node=e1_node)

        # E1 -> e
        elif token.type in (TT_RPAREN, TT_EOF):
            terminal_e_node = AnyNode(id='e'+str(len(self.trace)), name='e', parent=caller)
            self.trace.append(terminal_e_node)
            visualize_parse_tree(self.trace)

            return parse_result.success(node=left_child)

        else:
            return parse_result.failure(error=InvalidSyntaxError(position_start=token.position_start,
                                                                 position_end=token.position_end,
                                                                 error_details='Expected AND or OR or ) or EOF, '
                                                                               f'found {token}'))

    # E -> C E1 | VAR ID EQ E
    def expression(self, caller):
        parse_result = ParseResult()

        # E -> C E1
        if self.current_token.type in (TT_INT, TT_FLOAT, TT_PLUS, TT_MINUS, TT_LPAREN, TT_IDENTIFIER):
            non_terminal_c_node = AnyNode(id='C' + str(len(self.trace)), name='C', parent=caller)
            self.trace.append(non_terminal_c_node)

            non_terminal_e1_node = AnyNode(id='E1' + str(len(self.trace)), name='E1', parent=caller)
            self.trace.append(non_terminal_e1_node)
            visualize_parse_tree(self.trace)

            c_node = parse_result.register(parse_result=self.comparison_expression(caller=non_terminal_c_node))

            if parse_result.error:
                return parse_result
            e1_node = parse_result.register(parse_result=self.expression_1(left_child=c_node,
                                                                           caller=non_terminal_e1_node))
            if parse_result.error:
                return parse_result

            else:
                return parse_result.success(node=e1_node)

        # E -> VAR ID EQ E
        elif self.current_token.type == TT_KEYWORD and self.current_token.value == 'VAR':
            terminal_var_node = AnyNode(id='VAR' + str(len(self.trace)), name='VAR', parent=caller)
            self.trace.append(terminal_var_node)

            terminal_id_node = AnyNode(id='ID' + str(len(self.trace)), name='ID', parent=caller)
            self.trace.append(terminal_id_node)

            terminal_eq_node = AnyNode(id='EQ' + str(len(self.trace)), name='=', parent=caller)
            self.trace.append(terminal_eq_node)

            non_terminal_e_node = AnyNode(id='E' + str(len(self.trace)), name='E', parent=caller)
            self.trace.append(non_terminal_e_node)
            visualize_parse_tree(self.trace)

            parse_result.register(self.advance_token())
            if self.current_token.type == TT_IDENTIFIER:
                variable_name_token = self.current_token
                parse_result.register(self.advance_token())

                if self.current_token.type == TT_EQ:
                    parse_result.register(self.advance_token())

                    e_node = parse_result.register(parse_result=self.expression(caller=non_terminal_e_node))
                    if parse_result.error:
                        return

                    self.ast_trace.append(VariableAssignNode(variable_name_token=variable_name_token,
                                                                        variable_value=e_node))

                    return parse_result.success(node=VariableAssignNode(variable_name_token=variable_name_token,
                                                                        variable_value=e_node))

                else:
                    return parse_result.failure(error=InvalidSyntaxError(
                        position_start=self.current_token.position_start,
                        position_end=self.current_token.position_end, error_details=f'Expected = , '
                                                                                    f'found {self.current_token}'))
            else:
                return parse_result.failure(error=InvalidSyntaxError(
                    position_start=self.current_token.position_start,
                    position_end=self.current_token.position_end, error_details=f'Expected identifier , '
                                                                                f'found {self.current_token}'))

        else:
            # Syntax Error
            return parse_result.failure(error=InvalidSyntaxError(position_start=self.current_token.position_start,
                                                                 position_end=self.current_token.position_end,
                                                                 error_details=f'Expected int or float or + or - or '
                                                                               f'VAR or or ID or ( or NOT'
                                                                               f'found {self.current_token}'))
