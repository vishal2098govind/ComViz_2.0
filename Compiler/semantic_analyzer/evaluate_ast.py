from Compiler.error_handler.runtime_error import RunTimeError
from Compiler.lexical_analyzer.constants import *
from Compiler.semantic_analyzer.data_types import Number
from Compiler.semantic_analyzer.runtime_result import RuntimeResult


class EvaluateAST:
    def __init__(self):
        self.trace = []

    def evaluate_node(self, node, context):
        node_name_to_be_evaluated = f'evaluate_{type(node).__name__}'
        node_to_be_evaluated = getattr(self, node_name_to_be_evaluated,
                                       self.no_node)

        return node_to_be_evaluated(node, context)

    def no_node(self, node, context):
        raise Exception(f'No such evaluate_{type(node).__name__} defined')

    @staticmethod
    def evaluate_NumberNode(node, context):
        return RuntimeResult().success(Number(number_value=node.number_token.value).set_position(
            pos_start=node.pos_start,
            pos_end=node.pos_end))

    def evaluate_BinaryOperationNode(self, node, context):
        runtime_result = RuntimeResult()
        result, error = None, None
        left_node = runtime_result.register(self.evaluate_node(node.left_node, context))
        if runtime_result.error:
            return runtime_result

        right_node = runtime_result.register(self.evaluate_node(node.right_node, context))
        if runtime_result.error:
            return runtime_result

        if node.operator_token.type == TT_PLUS:
            result, error = left_node.add_to(right_node)

        elif node.operator_token.type == TT_MINUS:
            result, error = left_node.sub_by(right_node)

        elif node.operator_token.type == TT_MUL:
            result, error = left_node.mul_to(right_node)

        elif node.operator_token.type == TT_DIV:
            result, error = left_node.div_by(right_node)

        elif node.operator_token.type == TT_POWER:
            result, error = left_node.raised_to(right_node)

        elif node.operator_token.type == TT_EE:
            result, error = left_node.get_comparison_eq(right_node)

        elif node.operator_token.type == TT_GTE:
            result, error = left_node.get_comparison_gte(right_node)

        elif node.operator_token.type == TT_LTE:
            result, error = left_node.get_comparison_lte(right_node)

        elif node.operator_token.type == TT_GT:
            result, error = left_node.get_comparison_gt(right_node)

        elif node.operator_token.type == TT_LT:
            result, error = left_node.get_comparison_lt(right_node)

        elif node.operator_token.type == TT_NE:
            result, error = left_node.get_comparison_ne(right_node)

        elif node.operator_token.type == TT_KEYWORD and node.operator_token.value == 'AND':
            result, error = left_node.anded_by(right_node)

        elif node.operator_token.type == TT_KEYWORD and node.operator_token.value == 'OR':
            result, error = left_node.ored_by(right_node)

        if error:
            return runtime_result.failure(error=error)

        return runtime_result.success(result.set_position(pos_start=node.pos_start, pos_end=node.pos_end))

    def evaluate_UnaryOperationNode(self, node, context):
        runtime_result = RuntimeResult()
        number = runtime_result.register(self.evaluate_node(node.right_node, context))
        if runtime_result.error:
            return runtime_result

        error = None
        if node.operator_token.type == TT_MINUS:
            number, error = number.mul_to(Number(number_value=-1))
        elif node.op_token.type == TT_KEYWORD and node.op_token.value == 'NOT':
            number, error = number.notted()
        if error:
            return runtime_result.failure(error=error)

        return runtime_result.success(number.set_position(pos_start=node.pos_start, pos_end=node.pos_end))

    @staticmethod
    def evaluate_VariableAccessNode(node, context):
        runtime_result = RuntimeResult()
        var_name_to_be_accessed = node.var_name_token.value

        var_value = context.symbol_table.get_var_value(var_name_to_be_accessed)

        if not var_value:
            return runtime_result.failure(RunTimeError(pos_start=node.pos_start, pos_end=node.pos_end,
                                                       error_details=f'{var_name_to_be_accessed} is not defined'))

        var_value = var_value.copy().set_position(pos_start=node.pos_start, pos_end=node.pos_end)
        print(context.symbol_table)
        return runtime_result.success(var_value)

    def evaluate_VariableAssignNode(self, node, context):
        runtime_result = RuntimeResult()
        var_node_to_be_assigned = node.variable_name_token.value
        var_value = runtime_result.register(self.evaluate_node(node=node.variable_value, context=context))

        if runtime_result.error:
            return runtime_result

        context.symbol_table.set_var_value(var_name=var_node_to_be_assigned, new_var_value=var_value)
        print(context.symbol_table)
        return runtime_result.success(var_value)
