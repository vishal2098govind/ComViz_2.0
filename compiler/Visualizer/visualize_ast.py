from anytree import RenderTree
from anytree.exporter import UniqueDotExporter

ast_digraphs = ['']


def visualize_ast(node=None):
    if node:
        global ast_digraphs
        dgi = ''

        for line in UniqueDotExporter(node, nodenamefunc=lambda n: n.id,
                                      nodeattrfunc=lambda n: f"label={n.name}"):
            if ('digraph' not in line) and ('}' not in line):
                if line.strip() not in ''.join(ast_digraphs):
                    if 'label' in line.strip():
                        dgi += line.strip()[:-2] + ' fillcolor="#FFB86F"' + '];'
                    else:
                        dgi += line.strip()
        ast_digraphs.append(dgi)

bup_ast_digraphs = ['']

def visualize_bottom_up_ast(root):
    # for pre, _, node in RenderTree(root):
    #     print("%s%s" % (pre, node.value))
    dgi = ''
    for line in UniqueDotExporter(root):
        if 'digraph' not in line and '}' not in line:
            if line.strip() not in ''.join(bup_ast_digraphs):
                if 'label' in line.strip():
                    dgi += line.strip()[:-2]+' fillcolor="#FFB86F"'+'];'
                else:
                    dgi += line.strip()
    bup_ast_digraphs.append(dgi)
