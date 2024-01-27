import { curlRequest } from '../utils/curlRequest.util';
import moment from 'moment';
import _ from 'lodash';
const talib = require('ta-lib');

class MoneyControlService {

  search = async (text: string) => {
    const url: string = 'https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&type=1&format=json&query='+text;
    const response: any = await curlRequest('GET', url);
    const data = _.map(response, (r) => {
      r.symbol = _.trim(_.split(r.pdt_dis_nm, ',')[1]);
      return r;
    });
    return data;
  }

  details = async (code: string) => {
    const url: string = 'https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/' + code;
    const response: any = await curlRequest('GET', url);
    const data = {...response.data};
    return data;
  }


  historicalData = async (code: string) => {
    const url: string = 'https://www.moneycontrol.com/tech_charts/nse/his/' + _.toLower(code) + '.csv';
    const response: any = await curlRequest('GET', url);
    const data = {...response};
    return data;
  }

  getCandleData = async (params: any) => {
    const url = `https://priceapi.moneycontrol.com/techCharts/indianMarket/${params.type}/history?symbol=${params.symbol}&resolution=${params.duration}&from=${params.from}&to=${params.to}&countback=${params.countback}&currencyCode=${params.currencyCode}`;
    const response: any = await curlRequest('GET', url);
    const { s, t, o, h, l, c, v }: any = response;
    return this.algoTrade(response);
  };

  getNextNonWeekendDay = (date: any) => {
    const dayOfWeek = date.getDay();
    const daysToAdd = dayOfWeek === 5 ? 2 : dayOfWeek === 6 ? 1 : 0; // Skip Saturday or Sunday
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + daysToAdd + 1); // Add days to reach the next non-weekend day
    nextDay.setHours(9, 0, 0, 0); // Set time to 9:00 AM
    return nextDay;
  }

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


  algoTrade = (data: any) => {
    const accountFund = 100000;
    // ema
    const ema2 = talib.EMA(data.c, 2);
    const ema3 = talib.EMA(data.c, 3);
    const ema5 = talib.EMA(data.c, 5);
    const ema10 = talib.EMA(data.c, 10);
    const ema15 = talib.EMA(data.c, 15);
    const ema20 = talib.EMA(data.c, 20);

    let res = data.t.map((item: any, i: any) => ({
      timestamp: moment.unix(item).format("YYYY-MM-DD HH:mm:ss"),
      open: data["o"][i],
      high: data["h"][i],
      low: data["l"][i],
      close: data["c"][i],
      volume: data["v"][i],
      ema2: i >= 5 ? Number(ema2[i-2].toFixed(2)) : 0,
      ema3: i >= 5 ? Number(ema2[i-3].toFixed(2)) : 0,
      ema5: i >= 5 ? Number(ema5[i-5].toFixed(2)) : 0,
      ema10: i >= 10 ? Number(ema10[i-10].toFixed(2)) : 0,
      ema15: i >= 15 ? Number(ema15[i-15].toFixed(2)) : 0,
      ema20: i >= 20 ? Number(ema20[i-20].toFixed(2)) : 0,
    }));

    res = this.identifyFirst30MinuteCandles(res);

    for (const i in res) {
      if (res[i]) {
        const previousCandle = res[Number(i) > 0 ? Number(i)-1 : i];
        const candle = res[i];

        

        candle['trend'] = 'side';
        if(candle['ema5'] >= candle['ema10'] && candle['ema10'] >= candle['ema15'] && candle['ema15'] >= candle['ema20'] ) {
          candle['trend'] = 'up'
        }
        
        if(candle['ema5'] <= candle['ema10'] && candle['ema10'] <= candle['ema15'] && candle['ema15'] <= candle['ema20'] ) {
          candle['trend'] = 'down'
        }

        candle['signal'] = '';
        candle['price'] = '';
        candle['stopLoss'] = '';
        candle['stopLossHit'] = '';

        if(candle['trend'] == 'down' && candle['close'] < previousCandle['close'] && candle['ema3'] < candle['dayLow'] && candle['dayLow'] != 1000000) {
          candle['signal'] = 'Sell';
          candle['price'] = candle['close'];
          candle['stopLoss'] = previousCandle['high'];
          candle['stopLossHit'] =  candle['high'] > previousCandle['high'];
        }

        if(candle['trend'] == 'up' && candle['close'] > previousCandle['close'] && candle['ema3'] > candle['dayHigh'] && candle['dayHigh'] != -1000000) {
          candle['signal'] = 'Buy';
          candle['price'] = candle['close'];
          candle['stopLoss'] = previousCandle['low'];
          candle['stopLossHit'] =  candle['low'] < previousCandle['low'];
        }
        
      }
    }
    return res;
  }

  identifyFirst30MinuteCandles(data: any) {
    let date = new Date(data[0]['timestamp'])
    // console.log(date)
    let dayHigh = -Math.pow(10, 6);
    let dayLow = Math.pow(10, 6);
    let dayMid = 0;
    
    for (const i in data) {
      
      const candle = data[i];
      const timestamp = new Date(candle.timestamp);
      // console.log(' cond ', date != timestamp)
      const hours = timestamp.getHours();
      const minutes = timestamp.getMinutes();

      if(date.toDateString() != timestamp.toDateString()) {
        date = new Date(candle.timestamp);
        dayHigh = -Math.pow(10, 6);
        dayLow = Math.pow(10, 6);
        dayMid = 0;
      }

      // Check if the time is greater than 9:00 AM and less than or equal to 9:30 AM
      if (hours === 9 && minutes >= 0 && minutes <= 30) {
        const date = timestamp.toDateString(); // Extracting the date part
        data[i]['dayHigh'] = dayHigh;
        data[i]['dayMid'] = dayMid;
        data[i]['dayLow'] = dayLow;
        dayHigh = Math.max(candle.high, dayHigh)
        dayLow = Math.min(candle.low, dayLow)
        dayMid = Number(_.mean([dayHigh, dayLow]).toFixed());
      } else {
        data[i]['dayHigh'] = dayHigh;
        data[i]['dayMid'] = dayMid;
        data[i]['dayLow'] = dayLow;
      }
    }

    return data;
  }
}

export const moneyControlService = new MoneyControlService();
