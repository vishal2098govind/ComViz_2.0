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
                parserType: 'topDown'
            }

            return {...compilerData};
        case 'CHANGE-PARSER':
            return {...state,payload}
        default:
            return state;
}
}