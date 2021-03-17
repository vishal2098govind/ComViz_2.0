const initial={

}

export default function rootReducer(state=initial,{type,payload}){
    switch(type){
        case 'ADD-DATA':
            let rawSymbolData=payload.symbol_table
            rawSymbolData=rawSymbolData.replaceAll('\'','"')
            let compilerData={
                digraphs: payload.top_down_digraphs,
                symbolTable : JSON.parse(rawSymbolData),
                tokens: payload.tokens
            }

            return {...compilerData};
        default:
            return state;
}
}