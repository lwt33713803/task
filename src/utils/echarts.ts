export const filterCharts = (data: any, key: string) => {
    let result: []
    if (data.length) {
        result = data.map((item: any) => {
            return item[key]
        })
    } else {
        result = []
    }
    return result
}