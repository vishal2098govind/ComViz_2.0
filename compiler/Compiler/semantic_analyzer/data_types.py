from Compiler.error_handler.runtime_error import RunTimeError


class Number:
    def __init__(self, number_value):
        self.number_value = number_value
        self.set_position()
        self.pos_start = None
        self.pos_end = None

    def set_position(self, pos_start=None, pos_end=None):
        self.pos_start = pos_start
        self.pos_end = pos_end
        return self

    def add_to(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value + other.number_value), None

    def sub_by(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value - other.number_value), None

    def mul_to(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value * other.number_value), None

    def div_by(self, other):
        if isinstance(other, Number):
            if other.number_value == 0:
                return None, RunTimeError(pos_start=self.pos_start, pos_end=self.pos_end, error_details='Division by '
                                                                                                        'Zero')
            return Number(number_value=self.number_value / other.number_value), None

    def raised_to(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(number_value=self.number_value**other_operand.number_value), None

    def get_comparison_eq(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value == other_operand.number_value)), None

    def get_comparison_ne(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value != other_operand.number_value)), None

    def get_comparison_lt(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value < other_operand.number_value)), None

    def get_comparison_gt(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value > other_operand.number_value)), None

    def get_comparison_lte(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value <= other_operand.number_value)), None

    def get_comparison_gte(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value >= other_operand.number_value)), None

    def anded_by(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value and other_operand.number_value)), None

    def ored_by(self, other_operand):
        if isinstance(other_operand, Number):
            return Number(int(self.number_value or other_operand.number_value)), None

    def notted(self):
        return Number(1 if self.number_value == 0 else 0), None

    def is_true(self):
        return self.number_value != 0

    def copy(self):
        copy = Number(self.number_value)
        copy.set_position(pos_start=self.pos_start, pos_end=self.pos_end)
        return copy

    def __repr__(self):
        return str(self.number_value)
