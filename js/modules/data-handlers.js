export function commodityDataHandler(data) {
    data = Object.values(data)[0]
    return data.map(function (d, i) {
        return {
            date: Date.parse(d.date),
            value: d.close
        }
    });
}

export function coronaDataHandler(data, country = null) {
    return data.map(function (d, i) {
        let countryKey;
        if(country) {
            const columnHeaders = Object.keys(d)
            for (let i = 0; i < columnHeaders.length; i++) {
                if (columnHeaders[i].startsWith(country)) {
                    countryKey = columnHeaders[i]
                    break
                }
            }
        }

        return {
            date: forbidNegatives(d.date),
            value: forbidNegatives(d.confirmed),
            confirmed: forbidNegatives(d.confirmed),
            deaths: forbidNegatives(d.deaths),
            recovered: forbidNegatives(d.recovered),
            country: country && countryKey ?
                forbidNegatives(parseInt(d[countryKey].split('|')[0])) : null
        }
    });
}


export function mapDataHandler(data, sliderStartDate) {
    const mapData = []
    const countries = Object.keys(data[0])
    for (let i = 0; i < countries.length; i++) {
        let obj = {}
        let dataObj = {}
        for (let j = 0; j < data.length; j++) {
            let date = new Date(data[j].date)
            let countryData = [
                parseInt(data[j][countries[i]].toString().split('|')[0]),
                parseInt(data[j][countries[i]].toString().split('|')[1]),
                parseInt(data[j][countries[i]].toString().split('|')[2])
            ]
            if (date.toDateString() === sliderStartDate.toDateString()) {
                obj.size = countryData
            }

            dataObj[formatDateKey(data[j].date)] = [date, countryData]
        }
        obj.data = dataObj

        if (countries[i].split('|').length === 3) {
            obj.latLng = new L.LatLng(countries[i].split('|')[1], countries[i].split('|')[2]);
            obj.country = countries[i].split('|')[0]
            mapData.push(obj)
        }
    }
    return mapData
}


export function formatDateKey(date){
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return year + '-' + month + '-' + day
}

function forbidNegatives(number){
    return number < 0 ? 0 : number
}