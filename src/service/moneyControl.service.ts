import { curlRequest } from '../utils/curlRequest.util';
import moment from 'moment';

class MoneyControlService {
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
    return moment(new Date(timestamp * 1000)).format('MMMM DD, YYYY, h:m' ); // December 28, 2022, 3:30
  }
}

export const moneyControlService = new MoneyControlService();
