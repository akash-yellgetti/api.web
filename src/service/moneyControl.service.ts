import { curlRequest } from '../utils/curlRequest.util';
import moment from 'moment';
import _ from 'lodash';

class MoneyControlService {

  search = async (text: string) => {
    const url: string = 'https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&type=1&format=json&query='+text;
    const response: any = await curlRequest('GET', url);
    const data = {...response};
    return data;
  }

  detail = async (code: string) => {
    const url: string = 'https://priceapi-aws.moneycontrol.com/pricefeed/nse/equitycash/' + code;
    const response: any = await curlRequest('GET', url);
    const data = {...response};
    return data;
  }


  historicalData = async (code: string) => {
    const url: string = 'https://www.moneycontrol.com/tech_charts/nse/his/' + _.toLower(code) + '.csv';
    const response: any = await curlRequest('GET', url);
    const data = {...response};
    return data;
  }

  getCandleData = async (
    symbol: string,
    resolution: number,
    from: number,
    to: number,
    countback: number = 308,
    currencyCode: string = 'INR'
  ) => {
    const url: string =
      'https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=' + symbol +
      '&resolution=' + resolution +
      '&from=' + from +
      '&to=' + to +
      '&countback=' + countback +
      '&currencyCode=' + currencyCode;
    const response: any = await curlRequest('GET', url);
    const { s, t, o, h, l, c, v }: any = response;
    const data: any = [];
    for (const i in t) {
      if (i && t && t[i]) {
        data.push({
          ntime: this.getNormalDateFormat(t[i]),
          time: t[i],
          open: o[i],
          low: l[i],
          high: h[i],
          close: c[i],
          volume: v[i]
        });
      }
    }
    return data;
  };

  getNormalDateFormat = (timestamp: number) => { //1672221600
    return moment(new Date(timestamp * 1000)).utcOffset("+05:30").format('llll'); // December 28, 2022, 3:30
  }

  findPeaks = (data: any, key: string = 'close') => {
    let peaks = [];
    for (let i = 1; i < data.length - 1; i++) {
      const previous: any = data[i-1][key];
      const current: any = data[i][key];
      const next: any = data[i+1][key];
        if (current > previous && current > next) {
            peaks.push(data[i]);
        }
    }
    return peaks;
  }
}

export const moneyControlService = new MoneyControlService();
