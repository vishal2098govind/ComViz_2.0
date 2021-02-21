from anytree.exporter import UniqueDotExporter

pt_digraphs = []


def visualize_parse_tree(trace):
    global pt_digraphs
    if trace:
        dgi = ''
        # for pre, fill, node in RenderTree(trace[0]):
        #     print(f'{pre}{node.name}')

        for line in UniqueDotExporter(trace[0]):
            # print(line)
            dgi += line
        # print(dgi)
        pt_digraphs.append([dgi])
