
$(document).ready(function () {
  const datatableOptions = {
    ajax: {
      url: 'http://localhost:5001/money-control/candles',
      type: 'POST',
      contentType: 'application/json',
      data: function (d) {
        return JSON.stringify({
          symbol: 'SBIN',
          duration: 3,
          countback: 2393
        });
      }
    },
    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
    lengthMenu: [
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 127, 130, -1],
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 127, 130, 'All']
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
  };

  $('#mySelect')
    .select2({
      ajax: {
        url: 'http://localhost:5001/money-control/search', // Replace with your API endpoint
        dataType: 'json',
        delay: 250,
        method: 'POST',
        data: function (params) {
          // console.log(params);
          var queryParameters = {
            text: params.term
          };

          return queryParameters;
        },
        processResults: function (res) {
          // console.log(res.data);
          return {
            results: $.map(res.data, function (item) {
              // console.log()
              return {
                text: item.stock_name + ' - ' +item.symbol,
                id: item.sc_id,
                // symbol: (item.pdt_dis_nm.split(',')[1]), 
                ...item
              };
            })
          };
        },
        cache: true
      }
    })
    .on('select2:select', function (e) {
      getDetail(e.target.value);
    });

  function getDetail(code) {
    // Make a POST request
    $.ajax({
      url: 'http://localhost:5001/money-control/details ',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ code }),
      success: function (res) {
        const data = res.data;
        console.log('POST request successful:', data);
        // Handle the response as needed

        // New parameters
        datatableOptions.ajax.data = function () { 
            return JSON.stringify({
            symbol: data.NSEID,
            duration: 3,
            countback: 2393
          }) 
        }



        // Reload the table with new parameters
        // table.ajax.url('http://localhost:5001/money-control/candles').load(newParams);
        // table.api.ajax.load();
        // table.api().ajax..reload()
        // console.log()
        table.empty();
        table.api().destroy();
        table = $('#example').dataTable(datatableOptions);

        // console.log(table)
      },
      error: function (error) {
        console.error('Error making POST request:', error);
        // Handle the error as needed
      }
    });
  }

  let table = $('#example').dataTable(datatableOptions);
});
