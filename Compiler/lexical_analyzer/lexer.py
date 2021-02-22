from Compiler.error_handler.illegal_char_error import IllegalCharError
from Compiler.error_handler.position import Position
from Compiler.lexical_analyzer.constants import *
from Compiler.lexical_analyzer.token import Token


class Lexer:
    def __init__(self, text, file_name):
        self.file_name = file_name
        self.text = text
        self.pos = Position(index=-1, line_no=0, col_no=-1, file_name=file_name, file_text=text)
        self.current_char = None
        self.advance_char()

    def advance_char(self):
        self.pos.advance_index(current_char=self.current_char)
        self.current_char = self.text[self.pos.index] if self.pos.index < len(self.text) else None

    def make_tokens(self):
        tokens = []

        while self.current_char is not None:
            # Ignore if cur_char is a space or tab
            if self.current_char in ' \t':
                self.advance_char()

            # -------------------#
            # --OPERATOR-TOKENS--#
            # -------------------#
            elif self.current_char == '+':
                plus_token = Token(type_=TT_PLUS, value=None, position_start=self.pos)
                tokens.append(plus_token)
                self.advance_char()

            elif self.current_char == '-':
                minus_token = Token(type_=TT_MINUS, value=None, position_start=self.pos)
                tokens.append(minus_token)
                self.advance_char()

            elif self.current_char == '*':
                mul_token = Token(type_=TT_MUL, value=None, position_start=self.pos)
                tokens.append(mul_token)
                self.advance_char()

            elif self.current_char == '/':
                div_token = Token(type_=TT_DIV, value=None, position_start=self.pos)
                tokens.append(div_token)
                self.advance_char()

            elif self.current_char == '(':
                lparen_token = Token(type_=TT_LPAREN, value=None, position_start=self.pos)
                tokens.append(lparen_token)
                self.advance_char()

            elif self.current_char == ')':
                rparen_token = Token(type_=TT_RPAREN, value=None, position_start=self.pos)
                tokens.append(rparen_token)
                self.advance_char()

            elif self.current_char == '^':
                power_token = Token(type_=TT_POWER, value=None, position_start=self.pos)
                tokens.append(power_token)
                self.advance_char()

            elif self.current_char == '!':
                not_eq_token, error = self.make_not_equals()
                if error:
                    return [], error
                tokens.append(not_eq_token)

            elif self.current_char == '=':
                eq_token = self.make_equals()
                tokens.append(eq_token)

            elif self.current_char == '<':
                lt_token = self.make_less_than()
                tokens.append(lt_token)

            elif self.current_char == '>':
                gt_token = self.make_greater_than()
                tokens.append(gt_token)

            # ----------------------------------------------

            # -------------------#
            # -- NUMBER-TOKENS --#
            # -------------------#
            elif self.current_char in DIGITS:
                number_token = self.make_number_token()
                tokens.append(number_token)
            # ----------------------------------------------

            # ----------------------#
            # -- IDENTIFIER-TOKENS--#
            # ----------------------#
            elif self.current_char in LETTERS:
                identifier_token = self.make_identifier()
                tokens.append(identifier_token)

            # If cur_char is among none of valid char of our language => Illegal Character
            else:
                error_position_start = self.pos.copy_position()
                illegal_char = self.current_char
                self.advance_char()
                # Return an empty list of tokens due to Illegal Char Error and thus return IllegalCharError instance
                return [], IllegalCharError(
                            position_start=error_position_start,
                            position_end=self.pos,
                            error_details=f"'{illegal_char}'"
                        )

        tokens.append(Token(type_=TT_EOF, value=None, position_start=self.pos))
        return tokens, None

    def make_number_token(self):

        # To keep track of digits in the number:
        num_str = ''

        # To keep track of no.of floating point dots in the number if a float
        dot_count = 0

        position_start = self.pos.copy_position()

        # Continue adding digits to num_str until the cur_char is in digits or a dot
        while self.current_char is not None and self.current_char in DIGITS + '.':
            # If found one floating point i.e. one dot, => chance of a floating point number
            if self.current_char == '.':
                # If already a dot was found before => break as we can't have more than one dot in a floating point
                # number
                if dot_count == 1:
                    break

                # else
                dot_count += 1
                num_str += '.'
                self.advance_char()

            # If not a dot:
            else:
                # append the digit to num_str which forms the final number token to be returned
                num_str += self.current_char
                self.advance_char()

        # after reading all digits:
        if dot_count == 0:
            # The number is an integer-number-token
            integer_num_token = Token(type_=TT_INT, value=int(num_str), position_start=position_start,
                                      position_end=self.pos)
            return integer_num_token
        else:
            # The number is a float-number-token
            float_number_token = Token(type_=TT_FLOAT, value=float(num_str), position_start=position_start,
                                       position_end=self.pos)
            return float_number_token

    def make_identifier(self):
        identifier_str = ''
        pos_start = self.pos.copy_position()

        while self.current_char is not None and self.current_char in LETTERS_DIGITS + '_':
            identifier_str += self.current_char
            self.advance_char()

        if identifier_str in KEYWORDS:
            id_token_type = TT_KEYWORD
        else:
            id_token_type = TT_IDENTIFIER

        return Token(type_=id_token_type, value=identifier_str, position_start=pos_start, position_end=self.pos)

    def make_not_equals(self):
        pos_start = self.pos.copy_position()
        self.advance_char()
        char = self.current_char
        if self.current_char == '=':
            self.advance_char()
            return Token(type_=TT_NE, value='!=', position_start=pos_start, position_end=self.pos), None

        self.advance_char()
        return None, IllegalCharError(position_start=pos_start, position_end=self.pos, error_details='Expected "=" '
                                                                                                     'after !, '
                                                                                                     f'found {char}')

    def make_equals(self):
        pos_start = self.pos.copy_position()
        self.advance_char()
        token_type = TT_EQ
        token_value = '='

        if self.current_char == '=':
            self.advance_char()
            token_type = TT_EE
            token_value = '=='

        return Token(type_=token_type, value=token_value, position_start=pos_start, position_end=self.pos)

    def make_less_than(self):
        pos_start = self.pos.copy_position()
        self.advance_char()
        token_type = TT_LT
        token_value = '<'

        if self.current_char == '=':
            self.advance_char()
            token_type = TT_LTE
            token_value = '<='

        return Token(type_=token_type, value=token_value, position_start=pos_start, position_end=self.pos)

    def make_greater_than(self):
        pos_start = self.pos.copy_position()
        self.advance_char()
        token_type = TT_GT
        token_value = '>'

        if self.current_char == '=':
            self.advance_char()
            token_type = TT_GTE
            token_value = '>='

        return Token(type_=token_type, value=token_value, position_start=pos_start, position_end=self.pos)
