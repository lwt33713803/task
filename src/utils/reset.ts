export const resetObject = (params: any) => {
    Object.keys(params).forEach(key => {
        if (typeof params[key] === 'string') {
            params[key] = ""
        } else if (typeof params[key] === 'boolean') {
            params[key] = false
        } else if (typeof params[key] === 'number') {
            params[key] = 0
        } else if (typeof params[key] === 'object') {
            // arr || obj
            params[key] instanceof Array ? params[key] = [] : params[key] = {}
        } else {
            params[key] = undefined
        }
    })

}
