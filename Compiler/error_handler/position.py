class Position:
    """
        To keep track of line-no , col-no and index of each character to be able to pin point error locations
    """
    def __init__(self, index, line_no, col_no, file_name, file_text):
        self.index = index
        self.line_no = line_no
        self.col_no = col_no
        self.file_name = file_name
        self.file_text = file_text

    def advance_index(self, current_char=None):
        """
            To move on to next index and update line_no and col_no
            :return: Position instance after reaching new_line if any
        """
        self.index += 1
        self.col_no += 1

        if current_char == '\n':
            self.line_no += 1
            self.col_no = 0

        return self

    def copy_position(self):
        return Position(index=self.index, line_no=self.line_no, col_no=self.col_no, file_name=self.file_name,
                        file_text=self.file_text)
