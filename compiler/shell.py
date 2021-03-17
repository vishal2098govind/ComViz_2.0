import json

from Compiler.run import run, global_symbol_table
from Visualizer.visualize_pt import pt_digraphs, bupt_digraphs
from Compiler.syntax_analyzer.bottom_up_parser import BUParser
from Compiler.syntax_analyzer.parsing_table import ParsingTable

response = {
    "tokens": None,
    "lexer_errors": None,
    "top_down_digraphs": None,
    "top_down_syntax_errors": None,
    "top_down_evaluation_result": None,
    "top_down_runtime_error": None,
    "symbol_table": None,
    "bottom_up_digraphs": None,
    "bottom_up_syntax_errors": None,
    "bottom_up_evaluation_result": None,
    "bottom_up_runtime_error": None
}

result = {
    "status": "",
    "data": None
}


def comviz(source_code):
    lexer_result, lexer_errors, ast_root, syntax_errors, eval_result, runtime_errors = run(file_name='<stdin>',
                                                                                           text=source_code)

    if lexer_errors:
        print(lexer_errors.as_string())
        response["lexer_errors"] = lexer_errors.as_string()

        result['status'] = 'error'
        result['data'] = response
    else:
        # No lexical errors
        print(lexer_result)
        tokens = []
        for token in lexer_result:
            tokens.append(token.__repr__())
        response["tokens"] = tokens

        print("Bottom Up Parser")
        buparser = BUParser(lexer_result, ParsingTable(), global_symbol_table)
        buparser.bottom_up_parse()
        buparser.digraphs = bupt_digraphs
        print('Bottom Up Runtime Result :', buparser.runtime_result)
        response["bottom_up_digraphs"] = buparser.digraphs
        response["bottom_up_syntax_errors"] = buparser.syntax_error
        response["bottom_up_evaluation_result"] = buparser.runtime_result
        response["bottom_up_runtime_error"] = buparser.runtime_error

        if syntax_errors:
            print(syntax_errors.as_string())
            response["top_down_syntax_errors"] = syntax_errors.as_string()
            response["top_down_digraphs"] = pt_digraphs

            result['status'] = 'error'
            result['data'] = response
        else:
            # No syntax errors
            print(ast_root)
            response["top_down_digraphs"] = pt_digraphs

            if runtime_errors:
                print(runtime_errors.as_string())
                response["top_down_runtime_error"] = runtime_errors.as_string()

                result['status'] = 'error'
                result['data'] = response
            else:
                # No runtime errors
                response["top_down_runtime_error"] = None
                response["bottom_runtime_error"] = None
                response["top_down_evaluation_result"] = eval_result.number_value
                response["symbol_table"] = global_symbol_table.__repr__()
                # print(json.dumps(response, indent=4))
                print('Top Down Runtime Result :', eval_result)

                result['status'] = 'success'
                result['data'] = response

    return result


# comviz("TRUE")
# comviz("a")
# comviz("(2^3)^2")
comviz("1+2")