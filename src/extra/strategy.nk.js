const capital = 10000; // available capital
const risk = 0.02; // maximum risk per trade
// const volatility = 0.15; // volatility of the stock
// const correlation = 0.5; // correlation of the stock

const positionSize = (risk * capital) / (volatility * correlation);
const shares = Math.floor(positionSize); //round down to the nearest whole number

// Position Size = (Maximum Risk * Capital) / (Volatility * Correlation)
// Position Size = (0.02 * 10000) / (0.15 * 0.5) = 53 shares

function calculateReturnsA(dataA) {
  const returnsA = [];
  for (let i = 1; i < dataA.length; i++) {
    returnsA.push((dataA[i].close - dataA[i - 1].close) / dataA[i - 1].close);
  }
  return returnsA;
}
function calculateReturnsB(dataB) {
  const returnsB = [];
  for (let i = 1; i < dataB.length; i++) {
    returnsB.push((dataB[i].close - dataB[i - 1].close) / dataB[i - 1].close);
  }
  return returnsB;
}

const pearsonCorrelationCoEfficient = (data) => {
   // Returns an array of daily returns
    function calculateReturns(data) {
        const returns = [];
        for (let i = 1; i < data.length; i++) {
            returns.push((data[i].close - data[i - 1].close) / data[i - 1].close);
        }
        return returns;
    }

    const returns = calculateReturns(data);

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
