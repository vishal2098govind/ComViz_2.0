from Compiler.syntax_analyzer.node_classes import Error

from Compiler.lexical_analyzer.token import Token
import uuid

from anytree import AnyNode, RenderTree

from Visualizer.visualize_pt import visualize_bup_parse_tree


def bottom_up_parse(tokens, pt):
    stack = [1]
    l = 0
    token_list = []
    for token in tokens:
        token_name = token.value if token.value else token.type
        token_node = AnyNode(id=uuid.uuid4(), name=token_name, parser_type=token.parser_type)
        token_list.append(token_node)

    while True:
        look_ahead = token_list[l]
        state = stack[-1]
        pte = pt.get(state, look_ahead.parser_type)
        if isinstance(pte, Error):
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
            parent_node = AnyNode(id=uuid.uuid4(), name=lhs.node_val)
            children = []
            for i in range(2 * len(rhs)):
                top = stack.pop()
                if not isinstance(top, int):
                    children.append(top)

            for child in children[::-1]:
                child.parent = parent_node

            stack.append(parent_node)
            goto = pt.get(stack[-2], lhs.node_val)
            stack.append(goto.value)
            # print(stack)
            visualize_bup_parse_tree(stack)

        elif pte.move == 'Accept':
            print('Accepted')
            break

