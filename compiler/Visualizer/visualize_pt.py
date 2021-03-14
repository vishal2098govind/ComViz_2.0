from anytree import AnyNode, RenderTree
from anytree.exporter import UniqueDotExporter

from Visualizer.visualize_ast import ast_digraphs

from Visualizer.visualize_ast import bup_ast_digraphs

pt_digraphs = []
test = []

def visualize_parse_tree(trace, row=None, col=None):
    global pt_digraphs
    if trace:
        dgi = ''
        for line in UniqueDotExporter(trace[0], nodenamefunc=lambda node: node.id,
                                      nodeattrfunc=lambda node: f"label={node.name}"):
            if 'digraph' in line:
                dgi += 'digraph tree {' \
                       'graph [rankdir=TB]' \
                        'node [style="filled"]'
            elif 'label' in line:
                dgi += line[:-2] + ' fillcolor="#F3DE8A"' + '];'
            else:
                dgi += line
        dgi = dgi[:-1] + ''.join(ast_digraphs) + '}'
        test.append([dgi])
        # print(test)
        # print('----------------------------')
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
        dgi = 'digraph tree {' \
              'graph [rankdir=TB]' \
              'node [style="filled"]'
        for item in stack:
            if isinstance(item, AnyNode):
                for line in UniqueDotExporter(item):
                    if 'digraph' not in line and '}' not in line:
                        if 'label' in line.strip():
                            dgi += line.strip()[:-2] + ' fillcolor="#F3DE8A"' + '];'
                        else:
                            dgi += line.strip()
        dgi += ''.join(bup_ast_digraphs) + '}'
        bupt_digraphs.append([dgi])
        # print(bupt_digraphs)
        print('-----------------------')
