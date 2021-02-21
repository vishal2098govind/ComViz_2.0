class Number:
    def __init__(self, number_value):
        self.number_value = number_value
        self.set_position()

    def set_position(self, pos_start=None, pos_end=None):
        self.pos_start = pos_start
        self.pos_end = pos_end
        return self

    def add_to(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value + other.number_value)

    def sub_by(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value - other.number_value)

    def mul_to(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value * other.number_value)

    def div_by(self, other):
        if isinstance(other, Number):
            return Number(number_value=self.number_value / other.number_value)

    def __repr__(self):
        return str(self.number_value)
