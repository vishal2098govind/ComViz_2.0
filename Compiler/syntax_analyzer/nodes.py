class NumberNode:
    def __init__(self, number_token):
        self.number_token = number_token
        self.pos_start = self.number_token.position_start
        self.pos_end = number_token.position_end

    def __repr__(self):
        return f'{self.number_token}'


class BinaryOperationNode:
    def __init__(self, left_node, operator_token, right_node):
        self.left_node = left_node
        self.operator_token = operator_token
        self.right_node = right_node

        self.pos_start = self.left_node.pos_start
        self.pos_end = self.right_node.pos_end

    def __repr__(self):
        return f'({self.left_node}  {self.operator_token}  {self.right_node})'


class UnaryOperationNode:
    def __init__(self, operator_token, right_node):
        self.operator_token = operator_token
        self.right_node = right_node

        self.pos_start = self.operator_token.position_start
        self.pos_end = self.right_node.pos_end

    def __repr__(self):
        return f'({self.operator_token} {self.right_node})'


class VariableAccessNode:
    def __init__(self, var_name_token):
        self.var_name_token = var_name_token

        self.pos_start = self.var_name_token.pos_start
        self.pos_end = self.var_name_token.pos_end

    def __repr__(self):
        return f'({self.var_name_token})'


class VariableAssignNode:
    def __init__(self, variable_name_token, variable_value):
        self.variable_name_token = variable_name_token
        self.variable_value = variable_value
        self.op_token = '='

        self.pos_start = self.variable_name_token.pos_start
        self.pos_end = self.variable_value.pos_end

    def __repr__(self):
        return f'({self.variable_name_token}, {self.op_token},{self.variable_value})'
