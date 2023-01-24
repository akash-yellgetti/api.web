const fs = require('fs');
const path = require('path');

// Load historical stock data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/tcs.json'), 'utf-8'));

// Define the parameters for the SMA strategy
// const shortPeriod = 50;
// const longPeriod = 200;

// // Initialize variables to keep track of the strategy's performance
// let InitialBalance = 100000;
let balance = 100000;
// let shares = 0;
// let profit = 0;

// // Loop through the data to simulate trades
// for (let i = longPeriod; i < data.length; i++) {
//     // Calculate the short-term and long-term moving averages
//     const shortSMA = data.slice(i - shortPeriod, i).reduce((a, b) => a + b.close, 0) / shortPeriod;
//     const longSMA = data.slice(i - longPeriod, i).reduce((a, b) => a + b.close, 0) / longPeriod;

//     // Check if the short-term average is above the long-term average (a bullish signal)
//     if (shortSMA > longSMA) {
//         // Buy shares if we don't already own any
//         if (shares === 0) {
//             shares = balance / data[i].close;
//             balance = 0;
//         }
//     } else {
//         // Sell shares if we own any
//         if (shares > 0) {
//             balance = shares * data[i].close;
//             shares = 0;
//             profit += balance - 100000;
//         }
//     }
// }

// console.log(`Net profit: ${profit-InitialBalance}`);



const movingAverage = (data, balance, profit = 0) => {
    const shortPeriod = 50;
    const longPeriod = 200;
    let shares = 0;

    for (let i = longPeriod; i < data.length; i++) {
        // Calculate the short-term and long-term moving averages
        const shortSMA = data.slice(i - shortPeriod, i).reduce((a, b) => a + b.close, 0) / shortPeriod;
        const longSMA = data.slice(i - longPeriod, i).reduce((a, b) => a + b.close, 0) / longPeriod;

        // Check if the short-term average is above the long-term average (a bullish signal)
        if (shortSMA > longSMA) {
            // Buy shares if we don't already own any
            if (shares === 0) {
                shares = balance / data[i].close;
                balance = 0;
            }
        } else {
            // Sell shares if we own any
            if (shares > 0) {
                balance = shares * data[i].close;
                shares = 0;
                profit += balance - 100000;
            }
        }
    }

    return profit;
}

// console.log(movingAverage(data, balance))


const breakout = (data, balance, profit = 0) => {
    let shares = 0;
    let prevHigh = data[0].high;
    let prevLow = data[0].low;

    for (let i = 1; i < data.length; i++) {
        // Check if the current high is greater than the previous high (a bullish signal)
        if (data[i].high > prevHigh) {
            // Buy shares if we don't already own any
            if (shares === 0) {
                shares = balance / data[i].close;
                balance = 0;
                console.log('buy', data[i])
            }
        }
        // Check if the current low is less than the previous low (a bearish signal)
        else if (data[i].low < prevLow) {
            // Sell shares if we own any
            if (shares > 0) {
                balance = shares * data[i].close;
                shares = 0;
                profit += balance - 100000;
                console.log('sell', data[i])
            }
        }
        prevHigh = data[i].high;
        prevLow = data[i].low;
    }

    return profit;
}


console.log(breakout(data, balance))


const rsi = (data, balance, profit = 0) => {
    const period = 14;
    let shares = 0;
    
    for (let i = period; i < data.length; i++) {
        // Calculate the RSI
        let gains = 0, losses = 0;
        for (let j = i - period; j < i; j++) {
            if (data[j].close < data[j + 1].close) {
                gains += data[j + 1].close - data[j].close;
            } else {
                losses -= data[j + 1].close - data[j].close;
            }
        }
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));
    
        // Check if the RSI is above 70 (a bearish signal)
        if (rsi > 70) {
            // Sell shares if we own any
            if (shares > 0) {
                balance = shares * data[i].close;
                shares = 0;
                profit += balance - 100000;
            }
        }
        // Check if the RSI is below 30 (a bullish signal)
        else if (rsi < 30) {
            // Buy shares if we don't already own any
            if (shares === 0) {
                shares = balance / data[i].close;
                balance = 0;
            }
        }
    }    
}
