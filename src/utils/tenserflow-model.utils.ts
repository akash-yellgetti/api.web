// import * as tf from '@tensorflow/tfjs';
// import * as tfvis from '@tensorflow/tfjs-vis';

// // Load the stock data into a JavaScript array
// const stockData = loadStockData();

// // Normalize the data
// const normalizedData = normalizeData(stockData);

// // Split the data into a training and test set
// const trainData = normalizedData.slice(0, normalizedData.length * 0.8);
// const testData = normalizedData.slice(normalizedData.length * 0.8);

// // Convert the data to a Tensor
// const trainTensor = tf.tensor2d(trainData, [
//   trainData.length,
//   trainData[0].length
// ]);
// const testTensor = tf.tensor2d(testData, [testData.length, testData[0].length]);

// // Create the model
// const model = tf.sequential();
// model.add(
//   tf.layers.lstm({
//     units: 64,
//     inputShape: [1, trainTensor.shape[1]],
//     returnSequences: true
//   })
// );
// model.add(
//   tf.layers.lstm({
//     units: 64
//   })
// );
// model.add(
//   tf.layers.dense({
//     units: 1,
//     activation: 'linear'
//   })
// );

// // Compile the model
// model.compile({
//   optimizer: 'adam',
//   loss: 'meanSquaredError'
// });

// // Train the model
// model
//   .fit(trainTensor, {
//     epochs: 10,
//     batchSize: 32,
//     validationData: [testTensor, testTensor],
//     shuffle: false
//   })
//   .then(() => {
//     // Save the model
//     model.save('stock_prediction_model.json');
//   });
