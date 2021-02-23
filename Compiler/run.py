from Compiler.lexical_analyzer.lexer import Lexer
from Compiler.semantic_analyzer.evaluate_ast import EvaluateAST
from Compiler.syntax_analyzer.parser import Parser
from Visualizer.visualize_pt import pt_digraphs


def run(file_name, text):
    lexer = Lexer(text=text, file_name=file_name)
    tokens, illegal_char_error = lexer.make_tokens()

    # Parser
    if illegal_char_error:
        return tokens, illegal_char_error, None, None, None
    parser = Parser(tokens_list=tokens)
    ast = parser.parse()
    ast_root, invalid_syntax_error = ast.node, ast.error

    if invalid_syntax_error:
        return tokens, None, ast_root, invalid_syntax_error, None

    print(pt_digraphs)
    evaluate_ast = EvaluateAST()
    eval_result = evaluate_ast.evaluate_node(node=ast_root)

    return tokens, illegal_char_error, ast_root, invalid_syntax_error, eval_result
