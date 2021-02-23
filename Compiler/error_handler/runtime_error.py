from Compiler.error_handler.error import Error


class RunTimeError(Error):
    def __init__(self, pos_start, pos_end, error_details=''):
        super().__init__(position_start=pos_start, position_end=pos_end,
                         error_name='Runtime Error', error_details=error_details)
