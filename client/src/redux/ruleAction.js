export const addCompilerData=data=>{
    return {
        type:'ADD-DATA',
        payload:data
    }
}


export const changeParser=data=>{
    return {
        type:'CHANGE-PARSER',
        payload:data
    }
}