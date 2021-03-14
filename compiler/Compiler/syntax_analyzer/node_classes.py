

class PTEntry:
    """
        For shift move :
            move = "shift"
            value = "23"

        For goto move:
            move = "goto"
            value = "23"

        For reduce move:
            move = "reduce"
            value = Production instance

        For error:
            move = None
            value = Error Instance
    """

    def __init__(self, move, value):
        self.move = move
        self.value = value

    def __repr__(self):
        if self.move == "Shift":
            return f'S {self.value}'
        elif self.move == "Reduce":
            return f'{self.value}'
        elif self.move == 'Goto':
            return f'GT {self.value}'
        elif self.move == 'Accept':
            return 'ACCEPT'


class Production:

    def __init__(self, lhs, rhs):
        self.lhs = lhs
        self.rhs = rhs

    def __repr__(self):
        return f'{self.lhs}->{self.rhs}'


class Error:

    def __init__(self, msg="Invalid Syntax"):
        self.msg = msg

    def __repr__(self):
        return f'{self.msg}'


class Terminal:

    def __init__(self, node_val):
        self.node_val = node_val

    def __repr__(self):
        return f'{self.node_val}'


class NonTerminal:

    def __init__(self, node_val):
        self.node_val = node_val

    def __repr__(self):
        return f'{self.node_val}'

