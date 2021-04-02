const initial={

}

export default function rootReducer(state=initial,{type,payload}){
    switch(type){
        case 'ADD-DATA':
            let rawSymbolData=payload.symbol_table
            rawSymbolData=rawSymbolData.replaceAll('\'','"')
            let compilerData={
                topDownDigraphs: payload.top_down_digraphs,
                bottomUpDigraphs: payload.bottom_up_digraphs,
                symbolTable : JSON.parse(rawSymbolData),
                tokens: payload.tokens,
                parserType: 'topDown',
                compilerInput: payload.compilerInput,
                lexerError: payload.lexer_errors,
                topDownError: payload.top_down_syntax_errors+payload.top_down_runtime_error,
                bottomUpError: payload.bottom_up_syntax_errors+payload.bottom_up_runtime_error
            }
            if (compilerData.topDownError){
                
                compilerData['errorIndex']={
                    row: payload.top_down_digraphs[payload.top_down_digraphs.length-1].index.row,
                    col: payload.top_down_digraphs[payload.top_down_digraphs.length-1].index.col
                }
                console.log(compilerData.errorIndex)
            }

            return {...compilerData};
        case 'CHANGE-PARSER':
            return {...state,payload}
        default:
            return state;
}
}