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
                    dgi += line.strip()
        ast_digraphs.append(dgi)
