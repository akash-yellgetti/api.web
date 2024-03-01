$(document).ready(function () {
const datatableOptions = {
    ajax: {
      url: '/tradingview/webhook/logs',
      type: 'POST',
      contentType: 'application/json',
      data: function (d) {
        return JSON.stringify({
            // que
        //   symbol: 'SBIN',
        //   duration: time,
        //   countback: countback
        });
      }
    },
    dom: 'lBfrtip',
    buttons: [
      
      {
        extend: 'csv',
        split: ['pdf', 'excel'],
        title: new Date().getTime() + ' - Data export'
      },

      'colvis'
      
    ],
    lengthMenu: [
      [10, 20, 25, 50,   -1],
      [10, 20, 25, 50,  'All']
    ],
    pageLength: 20,
    columns: [
        { title: 'timestamp', data: 'timestamp' },
        { title: 'timeframe', data: 'timeframe' },
        { title: 'datetime', data: 'datetime' },
        { title: 'type', data: 'type' },
        { title: 'exchange', data: 'exchange' },
        { title: 'symbol', data: 'symbol' },
        { title: 'price', data: 'price' },
        { title: 'volume', data: 'volume' }
      
    ],
 
  };

  console.log(datatableOptions)

 
  let table2 = $('#webhook').dataTable(datatableOptions);
})