import json


class Token:
    def __init__(self, type_, value=None, position_start=None, position_end=None):
        self.type = type_
        self.value = value

        if position_start:
            self.position_start = position_start.copy_position()
            self.position_end = self.position_start
            self.position_end = self.position_end.advance_index()

        if position_end:
            self.position_end = position_end.copy_position()

    def __repr__(self):
        if self.value is not None:
            return f'< {self.type}:{self.value} >'
        return f'< {self.type} >'


class TokenEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(0, Token):
            return {
                'type': o.type,
                'value': o.value
            }

        return super().default(o)
