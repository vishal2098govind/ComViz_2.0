class Error:
    def __init__(self, position_start, position_end, error_name, error_details):
        self.position_start = position_start
        self.position_end = position_end
        self.error_name = error_name
        self.error_details = error_details

    def as_string(self):
        error_string = f'{self.error_name}: {self.error_details}'
        return error_string