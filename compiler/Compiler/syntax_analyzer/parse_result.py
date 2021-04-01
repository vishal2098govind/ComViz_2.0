class ParseResult:
    def __init__(self):
        self.error = None
        self.node = None
        self.parser_node = None

    def register(self, parse_result):
        if isinstance(parse_result, ParseResult):
            if parse_result.error:
                self.error = parse_result.error
            return parse_result.node
        else:
            return parse_result

    def success(self, node, parser_node):
        self.node = node
        self.parser_node=parser_node
        return self

    def failure(self, error, parser_node):
        self.error = error
        self.parser_node=parser_node
        return self
