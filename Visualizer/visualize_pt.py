from anytree.exporter import UniqueDotExporter

from Visualizer.visualize_ast import ast_digraphs

pt_digraphs = []


def visualize_parse_tree(trace):
    global pt_digraphs
    if trace:
        dgi = ''
        for line in UniqueDotExporter(trace[0], nodenamefunc=lambda node: node.id,
                                      nodeattrfunc=lambda node: f"label={node.name}"):
            dgi += line
        dgi = dgi[:-1] + ''.join(ast_digraphs) + '}'
        pt_digraphs.append([dgi])
