class Context:
    def __init__(self, curr_context_name, parent_context_name=None, context_change_position=None):
        self.curr_context_name = curr_context_name
        self.parent_context_name = parent_context_name
        self.context_change_position = context_change_position
        self.symbol_table = None
