from anytree import AnyNode, RenderTree
from anytree.exporter import UniqueDotExporter

class VisualizeParseTree:
    def __init__(self):
        self.pt_digraphs = []
        self.bupt_digraphs = []

    def clear_digraphs(self):
        self.pt_digraphs.clear()
        self.bupt_digraphs.clear()

    def visualize_parse_tree(self, trace, ast_digraphs, row=None, col=None, look_ahead = None):
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
            self.pt_digraphs.append({
                'digraph': [dgi],
                'index': {
                    'row': row,
                    'col': col,
                    'look_ahead': look_ahead
                }
            })

    def visualize_bup_parse_tree(self, stack, bup_ast_digraphs):
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
            self.bupt_digraphs.append([dgi])
