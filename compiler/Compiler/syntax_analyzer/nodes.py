class NumberNode:
    def __init__(self, number_token):
        self.number_token = number_token

    def __repr__(self):
        return f'{self.number_token}'


class BinaryOperationNode:
    def __init__(self, left_node, operator_token, right_node):
        self.left_node = left_node
        self.operator_token = operator_token
        self.right_node = right_node

    def __repr__(self):
        return f'({self.left_node}  {self.operator_token}  {self.right_node})'


class UnaryOperationNode:
    def __init__(self, operator_token, right_node):
        self.operator_token = operator_token
        self.right_node = right_node

    def __repr__(self):
        return f'({self.operator_token} {self.right_node})'


class VariableAccessNode:
    def __init__(self, var_name_token):
        self.var_name_token = var_name_token

    def __repr__(self):
        return f'({self.var_name_token})'


class VariableAssignNode:
    def __init__(self, variable_name_token, variable_value):
        self.variable_name_token = variable_name_token
        self.variable_value = variable_value

    def __repr__(self):
        return f'({self.variable_name_token} = {self.variable_value})'
