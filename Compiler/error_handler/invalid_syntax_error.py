from Compiler.error_handler.error import Error


class InvalidSyntaxError(Error):
    def __init__(self, position_start, position_end, error_details):
        super().__init__(position_start=position_start, position_end=position_end, error_name='Invalid Syntax',
                         error_details=error_details)
