$(document).ready(function () {
  const time = $('#time').val();
  const countback = $('#countback').val();
  const datatableOptions = {
    ajax: {
      url: 'http://localhost:5001/money-control/candles',
      type: 'POST',
      contentType: 'application/json',
      data: function (d) {
        return JSON.stringify({
          symbol: 'SBIN',
          duration: time,
          countback: countback
        });
      }
    },
    responsive: true,
    dom: 'lBfrtip',

    buttons: [
      // {
      //     extend: 'csv',
      //     title: new Date().getTime()+ ' - Data export'
      // },
      // {
      //     extend: 'pdf',
      //     title: new Date().getTime()+ ' - Data export pdf'
      // },
      {
        extend: 'csv',
        split: ['pdf', 'excel'],
        title: new Date().getTime() + ' - Data export'
      },

      'colvis'
      // 'copy',
      // 'excel',
      // 'print'
    ],
    lengthMenu: [
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 127, 130, -1],
      [10, 20, 25, 50, 60, 80, 100, 120, 126, 127, 130, 'All']
    ],
    pageLength: 20,
    // order: [[0, 'desc']],
    columns: [
      { title: 'timestamp', data: 'timestamp' },
      { title: 'open', data: 'open' },
      { title: 'high', data: 'high' },
      { title: 'low', data: 'low' },
      { title: 'close', data: 'close' },
      { title: 'volume', data: 'volume' },
      { title: 'vwap', data: 'vwap' },
      // { title: 'dayLow', data: 'dayLow' },
      // { title: 'dayMid', data: 'dayMid' },
      // { title: 'dayHigh', data: 'dayHigh' },
      // { title: 'ema2', data: 'ema2' },
      // { title: 'ema3', data: 'ema3' },
      // { title: 'ema5', data: 'ema5' },
      // { title: 'ema10', data: 'ema10' },
      // { title: 'ema15', data: 'ema15' },
      // { title: 'ema20', data: 'ema20' },
      // { title: 'priceChange', data: 'priceChange' },
      // { title: 'volumeChange', data: 'volumeChange' },

      // { title: 'trend', data: 'trend' },
      // { title: 'signal', data: 'signal' },
      // { title: 'price', data: 'price' },
      // { title: 'stopLoss', data: 'stopLoss' },
      // { title: 'stopLossHit', data: 'stopLossHit' }
    ],
    initComplete: function () {
      const table = this;
      table.api().page('last').draw('page')
      const data = table.api().rows().data();
      refreshChart(data)
      // console.log()
      // this.api()
      //     .columns()
      //     .every(function () {
      //         let column = this;
      //         let title = column.footer().textContent;

      //         // Create input element
      //         let input = document.createElement('input');
      //         input.placeholder = title;
      //         column.footer().replaceChildren(input);

      //         // Event listener for user input
      //         input.addEventListener('keyup', () => {
      //             if (column.search() !== this.value) {
      //                 column.search(input.value).draw();
      //             }
      //         });
      //     });
    }

    // processing: true,
    // serverSide: true
  };

  $('#time').on('change', () => {
    const duration = $('#time').val();
    var data = table.api().ajax.params();
    // console.log(data)
    datatableOptions.ajax.data = function () {
      return JSON.stringify({
        ...JSON.parse(data),
        duration
      });
    };
    table.empty();
    table.api().destroy();
    table = $('#example').dataTable(datatableOptions);
  });

  $('#countback').on('change', () => {
    const countback = $('#countback').val();
    var data = table.api().ajax.params();
    // console.log(data)
    datatableOptions.ajax.data = function () {
      return JSON.stringify({
        ...JSON.parse(data),
        countback
      });
    };
    table.empty();
    table.api().destroy();
    table = $('#example').dataTable(datatableOptions);
  });

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
                text: item.stock_name + ' - ' + item.symbol,
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
        // console.log('POST request successful:', data);
        // Handle the response as needed

        // New parameters
        datatableOptions.ajax.data = function () {
          return JSON.stringify({
            symbol: data.NSEID,
            duration: $('#time').val(),
            countback: $('#countback').val()
          });
        };

        // Reload the table with new parameters
        // table.ajax.url('http://localhost:5001/money-control/candles').load(newParams);
        // table.api.ajax.load();
        // table.api().ajax..reload()
        // console.log()
        table.empty();
        table.api().destroy();
        table = $('#example').dataTable(datatableOptions);
        
        // refreshChart(table.rows().data())
        // console.log(table.api().rows().data())
      },
      error: function (error) {
        console.error('Error making POST request:', error);
        // Handle the error as needed
      }
    });
  }

  let table = $('#example').dataTable(datatableOptions);

  let datatableOptions1 = {...datatableOptions};
  datatableOptions1.ajax = {
    method: 'GET',
    url: 'http://localhost:5001/fyers/webhook/logs'
  }
  datatableOptions1.columns = [
    { title: 'type', data: 'type' },
    { title: 'orderType', data: 'orderType' },
    { title: 'instrument', data: 'instrument' },
    { title: 'symbol', data: 'symbol' },
    { title: 'price', data: 'price' },
    { title: 'qty', data: 'qty' },
    
  ]
  let table2 = $('#webhook').dataTable(datatableOptions1);
});
