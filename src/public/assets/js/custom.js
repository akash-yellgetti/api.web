$(document).ready(function () {
  // Initialize Bloodhound engine
  var engine = new Bloodhound({
      

    //   replace: function (url, query) {
    //     return url + '#' + query;
    //   },
    remote: {
        url: 'http://localhost:5001/money-control/search',
        prepare: function (query, settings) {
           settings.type = "POST";
           settings.contentType = "application/json; charset=UTF-8";
           settings.data = JSON.stringify({ text : query }); 

           return settings;
        },
        filter: function(res) {
            // console.log(res.data)
            // Format the data as needed
            return $.map(res.data, function(item) {
                return {
                    value: item.pdt_dis_nm,  // 'value' is what will be displayed in the suggestions
                    id: item.sc_id        // Additional properties you may want to use
                };
            });
        }
    },
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });

  // Initialize Typeahead with the Bloodhound engine
  $('#searchBox').typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'suggestions',
      source: engine
    }
  );

  // Set up Bloodhound prefetch to initialize the data
  engine.initialize();

 
  new DataTable('#example', {
    ajax: {
      url: 'http://localhost:5001/money-control/candles',
      type: 'POST',
      contentType: 'application/json',
      data: function (d) {
        return JSON.stringify({
          symbol: 'ICICIBANK',
          duration: 3,
          countback: 2393
        });
      }
    },
    lengthMenu: [
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 130, -1],
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 130, 'All']
    ],
    pageLength: 20,
    order: [[0, 'desc']],
    columns: [
      { title: 'timestamp', data: 'timestamp' },
      { title: 'open', data: 'open' },
      { title: 'high', data: 'high' },
      { title: 'low', data: 'low' },
      { title: 'close', data: 'close' },
      { title: 'volume', data: 'volume' },
      { title: 'ema2', data: 'ema2' },
      { title: 'ema3', data: 'ema3' },
      { title: 'ema5', data: 'ema5' },
      { title: 'ema10', data: 'ema10' },
      { title: 'ema15', data: 'ema15' },
      { title: 'ema20', data: 'ema20' },
      { title: 'dayHigh', data: 'dayHigh' },
      { title: 'dayMid', data: 'dayMid' },
      { title: 'dayLow', data: 'dayLow' },
      { title: 'trend', data: 'trend' },
      { title: 'signal', data: 'signal' },
      { title: 'price', data: 'price' },
      { title: 'stopLoss', data: 'stopLoss' },
      { title: 'stopLossHit', data: 'stopLossHit' }
    ]
    // processing: true,
    // serverSide: true
  });
});
