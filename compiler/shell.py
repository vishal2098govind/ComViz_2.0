from Compiler.run import run, global_symbol_table
from Visualizer.visualize_pt import pt_digraphs

import json

response = {
    "tokens": None,
    "lexer_errors": None,
    "digraphs": None,
    "syntax_errors": None,
    "evaluation_result": None,
    "runtime_error": None,
    "symbol_table": None
}

result = {
    "status" : "",
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
        if syntax_errors:
            print(syntax_errors.as_string())
            response["syntax_errors"] = syntax_errors.as_string()

            result['status'] = 'error'
            result['data'] = response
        else:
            # No syntax errors
            print(ast_root)
            response["digraphs"] = pt_digraphs

            if runtime_errors:
                print(runtime_errors.as_string())
                response["runtime_error"] = runtime_errors.as_string()

                result['status'] = 'error'
                result['data'] = response
            else:
                # No runtime errors
                response["evaluation_result"] = eval_result.__repr__()
                response["symbol_table"] = global_symbol_table.__repr__()
                # print(json.dumps(response, indent=4))

                result['status'] = 'success'
                result['data'] = response

    return result


# comviz("VAR a = 1+2")
