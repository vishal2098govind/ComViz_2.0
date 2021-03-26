from anytree import RenderTree
from anytree.exporter import UniqueDotExporter

class VisualizeAST:
    def __init__(self):
        self.ast_digraphs = []
        self.bup_ast_digraphs = []

    def clear_digraphs(self):
        self.ast_digraphs.clear()
        self.bup_ast_digraphs.clear()

    def visualize_ast(self, node=None):
        if node:
            dgi = ''
            for line in UniqueDotExporter(node, nodenamefunc=lambda n: n.id,
                                          nodeattrfunc=lambda n: f"label={n.name}"):
                if ('digraph' not in line) and ('}' not in line):
                    if line.strip() not in ''.join(self.ast_digraphs):
                        if 'label' in line.strip():
                            dgi += line.strip()[:-2] + ' fillcolor="#FFB86F"' + '];'
                        else:
                            dgi += line.strip()
            self.ast_digraphs.append(dgi)


    def visualize_bottom_up_ast(self, root):
        # for pre, _, node in RenderTree(root):
        #     print("%s%s" % (pre, node.value))
        dgi = ''
        for line in UniqueDotExporter(root):
            if 'digraph' not in line and '}' not in line:
                if line.strip() not in ''.join(self.bup_ast_digraphs):
                    if 'label' in line.strip():
                        dgi += line.strip()[:-2]+' fillcolor="#FFB86F"'+'];'
                    else:
                        dgi += line.strip()
        self.bup_ast_digraphs.append(dgi)
