from Compiler.run import run
from Visualizer.visualize_pt import digraphs

def generateCompilationOutput(text):
    result = {}
    lexer_result, lexer_errors, ast_root, syntax_errors = run(file_name='<stdin>', text=text)

    try:
        if lexer_errors:
            print(lexer_errors.as_string())
            result['status'] = 'error'
            result['data'] = lexer_errors.as_string()
        else:
            # No lexical errors
            print(lexer_result)

            if syntax_errors:
                result['status'] = 'error'
                result['data'] = syntax_errors.as_string()
                print(syntax_errors.as_string())
            else:
                # No syntax errors
                result['status'] = 'success'
                value = {
                    'ast_root' : ast_root,
                    'digraphs' : digraphs
                }
                result['data'] = str(value)
                print(ast_root)
                print(digraphs)
        return result
    except Exception as e:
        print("An error occurred : "+str(e))
        result['status'] = 'error'
        result['data'] = str(e)
        return result
