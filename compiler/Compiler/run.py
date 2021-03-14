from Compiler.lexical_analyzer.lexer import Lexer
from Compiler.semantic_analyzer.context import Context
from Compiler.semantic_analyzer.data_types import Number
from Compiler.semantic_analyzer.evaluate_ast import EvaluateAST
from Compiler.semantic_analyzer.symbol_table import SymbolTable
from Compiler.syntax_analyzer.top_down_parser  import Parser

global_symbol_table = SymbolTable()
global_symbol_table.set_var_value("NULL", Number(0))
global_symbol_table.set_var_value("TRUE", Number(1))
global_symbol_table.set_var_value("FALSE",Number(0))

global_context = Context(curr_context_name='<program>', parent_context_name=None, context_change_position=None)
global_context.symbol_table=global_symbol_table


def run(file_name, text):
    lexer = Lexer(text=text, file_name=file_name)
    tokens, illegal_char_error = lexer.make_tokens()

    # Parser
    if illegal_char_error:
        return None, illegal_char_error, None, None, None, None
    parser = Parser(tokens_list=tokens)
    ast = parser.parse()
    ast_root, invalid_syntax_error = ast.node, ast.error

    if invalid_syntax_error:
        return tokens, None, None, invalid_syntax_error, None, None

    # print(pt_digraphs)
    evaluate_ast = EvaluateAST()
    runtime_result = evaluate_ast.evaluate_node(node=ast_root, context=global_context)
    eval_result = runtime_result.value
    runtime_error = runtime_result.error

    if runtime_error:
        return tokens, None, ast_root, None, None, runtime_error

    return tokens, None, ast_root, None, eval_result, None
