from anytree import RenderTree
from anytree.exporter import UniqueDotExporter

digraphs = []


def visualize_parse_tree(trace):
    global digraphs
    if trace:
        dgi = ''
        # for pre, fill, node in RenderTree(trace[0]):
        #     print(f'{pre}{node.name}')

        for line in UniqueDotExporter(trace[0]):
            # print(line)
            dgi += line
        # print(dgi)
        digraphs.append([dgi])
