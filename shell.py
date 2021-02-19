from Compiler.run import run
from Visualizer.visualize_pt import digraphs

while True:
    text = input('comviz >')
    lexer_result, lexer_errors, ast_root, syntax_errors = run(file_name='<stdin>', text=text)

    if lexer_errors:
        print(lexer_errors.as_string())
    else:
        # No lexical errors
        print(lexer_result)

        if syntax_errors:
            print(syntax_errors.as_string())
        else:
            # No syntax errors
            print(ast_root)
            print(digraphs)
