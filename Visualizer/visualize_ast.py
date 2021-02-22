from anytree import AnyNode
from anytree.exporter import UniqueDotExporter

trace = []
ast_digraphs = ['']
nodes_so_far = []


def visualize_ast(node=None, ast_trace=None):

    if node:
        if node not in nodes_so_far:
            nodes_so_far.append(node)
        global trace, ast_digraphs
        dgi = ''

        for line in UniqueDotExporter(node, nodenamefunc=lambda node: node.id, nodeattrfunc=lambda node:
        f"label={node.name} type={node.type} fillcolor=\"#d62728\""):
            if len(ast_digraphs) > 0 and line.strip() not in ast_digraphs[-1]:
                for edge in line.strip().split(';'):
                    if 'digraph' not in edge and edge not in ast_digraphs[-1]:
                        dgi += line.strip() if not('digraph' in line or '}' in line ) else ''

        print(dgi)
        ast_digraphs.append(dgi)

    # print(ast_digraphs)


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