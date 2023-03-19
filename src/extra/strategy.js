const fs = require('fs');
const path = require('path');

// Load historical stock data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/tcs.json'), 'utf-8'));

const capital = 10000; // available capital
console.log('capital ', capital)
const risk = 0.02; // maximum risk per trade
console.log('risk percent ', risk)

// Returns an array of daily returns
function calculateReturns(data) {
    const returns = [];
    for (let i = 1; i < data.length; i++) {
        returns.push((data[i].close - data[i - 1].close) / data[i - 1].close);
    }
    return returns;
}

// Calculate the standard deviation of the returns
const returns = calculateReturns(data);
// volatility of the stock
const volatility = returns.reduce((a, b) => a + b, 0) / returns.length;
console.log('volatility ', volatility)

const pearsonCorrelationCoEfficient = (data, returns) => {
   
 
     // calculates the correlation between the current day return and the previous day return
     let numerator = 0;
     let denominator1 = 0;
     let denominator2 = 0;
     for (let i = 1; i < returns.length; i++) {
         numerator += returns[i] * returns[i-1];
         denominator1 += Math.pow(returns[i], 2);
         denominator2 += Math.pow(returns[i-1], 2);
     }
     const correlation = numerator / (Math.sqrt(denominator1) * Math.sqrt(denominator2));
     return correlation;
 };
 
 const correlation = pearsonCorrelationCoEfficient(data, returns);
console.log('correlation ', correlation)

const positionSize = (risk * capital) / (volatility * correlation);
console.log('positionSize ', positionSize)
const shares = Math.floor(positionSize); //round down to the nearest whole number
console.log('shares ', shares)
