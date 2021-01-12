export function commodityDataHandler(data) {
    data = Object.values(data)[0]
    return data.map(function (d, i) {
        return {
            date: Date.parse(d.date),
            value: d.close
        }
    });
}

export function coronaDataHandler(data) {
    return data.map(function (d, i) {
        return {
            date: d.date,
            value: d.cases
        }
    });
}