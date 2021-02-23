from Compiler.run import run, global_symbol_table
from Visualizer.visualize_pt import pt_digraphs

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
    "data" : None
}


def comviz(source_code):
    try:
        lexer_result, lexer_errors, ast_root, syntax_errors, eval_result, runtime_errors = run(file_name='<stdin>',
                                                                                           text=source_code)

        if lexer_errors:
            print(lexer_errors.as_string())
            response["lexer_errors"] = lexer_errors.as_string()

            result['status'] = 'error'
            result['data'] = str(response)
        else:
            # No lexical errors
            print(lexer_result)
            response["tokens"] = lexer_result

            if syntax_errors:
                print(syntax_errors.as_string())
                response["syntax_errors"] = syntax_errors.as_string()

                result['status'] = 'error'
                result['data'] = str(response)
            else:
                # No syntax errors
                print(ast_root)
                response["digraphs"] = pt_digraphs

                if runtime_errors:
                    print(runtime_errors.as_string())
                    response["runtime_error"] = runtime_errors.as_string()

                    result['status'] = 'error'
                    result['data'] = str(response)
                else:
                    # No runtime errors
                    print(eval_result)
                    response["evaluation_result"] = eval_result
                    response["symbol_table"] = global_symbol_table
                    print(response)

                    result['status'] = 'success'
                    result['data'] = str(response)

        return result
    except Exception as e:
        print("An error occurred : "+str(e))
        
        result['status'] = "error"
        result['data'] = str(e)
        return result
