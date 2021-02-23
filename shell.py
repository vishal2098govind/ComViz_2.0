from Compiler.run import run

while True:
    text = input('comviz >')
    lexer_result, lexer_errors, ast_root, syntax_errors, eval_result = run(file_name='<stdin>', text=text)

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
            # print(pt_digraphs)
            print(eval_result)
            # visualize_ast(ast_root)
            # print(ast_digraphs)
