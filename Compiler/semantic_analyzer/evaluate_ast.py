from Compiler.lexical_analyzer.constants import *
from Compiler.semantic_analyzer.data_types import Number


class EvaluateAST:
    def __init__(self):
        self.trace = []

    def evaluate_node(self, node):
        node_name_to_be_evaluated = f'evaluate_{type(node).__name__}'
        node_to_be_evaluated = getattr(self, node_name_to_be_evaluated,
                                       self.no_node)

        return node_to_be_evaluated(node)

    def no_node(self, node):
        raise Exception(f'No such evaluate_{type(node).__name__} defined')

    def evaluate_NumberNode(self, node):
        return Number(number_value=node.number_token.value).set_position(pos_start=node.pos_start, pos_end=node.pos_end)

    def evaluate_BinaryOperationNode(self, node):
        left_node = self.evaluate_node(node.left_node)
        right_node = self.evaluate_node(node.right_node)

        if node.operator_token.type == TT_PLUS:
            result = left_node.add_to(right_node)

        elif node.operator_token.type == TT_MINUS:
            result = left_node.sub_by(right_node)

        elif node.operator_token.type == TT_MINUS:
            result = left_node.sub_by(right_node)

        elif node.operator_token.type ==TT_MUL:
            result = left_node.mul_to(right_node)

        elif node.operator_token.type == TT_DIV:
            result = left_node.div_by(right_node)

        return result.set_position(pos_start=node.pos_start, pos_end=node.pos_end)


    def evaluate_UnaryOperationNode(self, node):
        number = self.evaluate_node(node.right_node)

        if node.operator_token.type == TT_MINUS:
            return number.mul_to(Number(number_value=-1))

        return number.set_position(pos_start=node.pos_start, pos_end=node.pos_end)


