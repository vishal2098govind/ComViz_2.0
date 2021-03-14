from anytree import AnyNode, RenderTree
from anytree.exporter import UniqueDotExporter

from Visualizer.visualize_ast import ast_digraphs

pt_digraphs = []


def visualize_parse_tree(trace, row=None, col=None):
    global pt_digraphs
    if trace:
        dgi = ''
        for line in UniqueDotExporter(trace[0], nodenamefunc=lambda node: node.id,
                                      nodeattrfunc=lambda node: f"label={node.name}"):
            dgi += line
        dgi = dgi[:-1] + ''.join(ast_digraphs) + '}'
        pt_digraphs.append({
            'digraph': [dgi],
            'index': {
                'row': row,
                'col': col
            }
        })


bupt_digraphs = []


def visualize_bup_parse_tree(stack):
    global bupt_digraphs
    if stack:
        dgi = 'digraph tree {'
        for item in stack:
            if isinstance(item, AnyNode):
                for line in UniqueDotExporter(item):
                    if 'digraph' not in line and '}' not in line:
                        dgi += line
        dgi += '}'
        bupt_digraphs.append([dgi])
        print(bupt_digraphs)
        print('-----------------------')
