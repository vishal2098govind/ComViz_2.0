from anytree import AnyNode
from anytree.exporter import UniqueDotExporter

trace = []
ast_digraphs = []


def visualize_ast(node=None):

    if node:
        pre_order(node=node)
        global trace
        dgi = ''
        for line in UniqueDotExporter(trace[0]):
            # print(line)
            dgi += line
        # print(dgi)
        ast_digraphs.append([dgi])


def pre_order(node, parent=None):
    if node:
        if type(node).__name__ == 'BinaryOperationNode':
            print(node.operator_token.type)
            root = AnyNode(name=node.operator_token.type, parent=parent)

            trace.append(root)
            visualize_ast(trace[0])
            pre_order(node=node.left_node, parent=root)

            pre_order(node=node.right_node, parent=root)
        else:
            if type(node).__name__ == 'UnaryOperationNode':
                root = AnyNode(name=node, parent=parent)
                trace.append(root)
                visualize_ast(trace[0])
                pre_order(node.right_node, parent=root)
            elif type(node).__name__ in ['NumberNode', 'Token', 'VariableAccessNode']:
                trace.append(AnyNode(name=node, parent=parent))
                visualize_ast(trace[0])
            elif type(node).__name__ == 'VariableAssignNode':
                root = AnyNode(name=node.operator_token, parent=parent)

                trace.append(root)
                visualize_ast(trace[0])

                pre_order(node=node.var_name_token, parent=root)
                pre_order(node=node.var_value_node, parent=root)