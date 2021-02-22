import string

TT_INT = 'int'
TT_FLOAT = 'float'
TT_PLUS = '< + >'
TT_MINUS = '< - >'
TT_MUL = '< * >'
TT_DIV = '/'
TT_LPAREN = '('
TT_RPAREN = ')'
TT_POWER = '^'
TT_KEYWORD = 'KEYWORD'
TT_IDENTIFIER = 'ID'
TT_EQ = ' = '
TT_EE = 'EE'
TT_NE = 'NE'
TT_LT = 'LT'
TT_LTE = 'LTE'
TT_GT = 'GT'
TT_GTE = 'GTE'
TT_EOF = 'EOF'

LETTERS = string.ascii_letters
DIGITS = '012345689'
LETTERS_DIGITS = LETTERS+DIGITS

KEYWORDS = [
    'VAR',
    'AND',
    'OR',
    'NOT'
]
