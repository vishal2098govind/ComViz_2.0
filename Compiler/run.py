from Compiler.lexical_analyzer.lexer import Lexer
from Compiler.syntax_analyzer.parser import Parser


def run(file_name, text):
    lexer = Lexer(text=text, file_name=file_name)
    tokens, illegal_char_error = lexer.make_tokens()

    # Parser
    if illegal_char_error:
        return tokens, illegal_char_error, None, None
    parser = Parser(tokens_list=tokens)
    ast = parser.parse()
    ast_root, invalid_syntax_error = ast.node, ast.error

    return tokens, illegal_char_error, ast_root, invalid_syntax_error
