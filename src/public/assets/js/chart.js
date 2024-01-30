



function refreshChart(data) {
    console.log(_.values(_.mapValues(_.map(data, r => {
        r.dayHigh = r && r.dayHigh === -1000000 ? 0 : r.dayHigh;
        return r;
    }), 'dayHigh')))
    Highcharts.chart('volume', {
        chart: {
            type: 'area'
        },
        series: [
            {
                name: 'volume',
                data: _.values(_.mapValues(data, 'volume'))
            }
        ]
    });

    Highcharts.chart('close', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Close -> Day High, Low and Mid'
        },
        series: [
            {
                name: 'close',
                data: _.values(_.mapValues(data, 'close'))
            },
            {
                name: 'dayLow',
                data: _.values(_.mapValues(_.map(data, r => {
                    r.dayLow = r && (r.dayLow === 0 || r.dayLow === 1000000) ? r.close : r.dayLow;
                    return r;
                }), 'dayLow'))
            },
            {
                name: 'dayHigh',
                data: _.values(_.mapValues(_.map(data, r => {
                    r.dayHigh = r && (r.dayHigh === 0 || r.dayHigh === -1000000) ? r.close : r.dayHigh;
                    return r;
                }), 'dayHigh'))
            },
            {
                name: 'dayMid',
                data: _.values(_.mapValues(_.map(data, r => {
                    r.dayMid = r && (r.dayMid === 0 ) ? r.close : r.dayMid;
                    return r;
                }), 'dayMid'))
            },
             
        ]
    });
  }