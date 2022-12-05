import request from 'request';
import bodyParser from 'body-parser';

const callApi = async (METHOD: any,URL: any,BODY: any) => {
    let urlParameters = Object.entries(BODY).map(e => e.join('=')).join('&');
    var options = {
        method: METHOD,
        uri: URL+ urlParameters,
        
    };
    
    request(options, function (error: any, response: any) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

export const sms = async (toNumbers: any,rawMessage: any) => {
    let url = 'https://api.textlocal.in/send/?';
    let sender = encodeURIComponent('ITSLET');
    let encoded_message = encodeURIComponent(rawMessage);
    let body={
        apikey:"NTI3OTVhNGU3MDQ4NTQ0ZjYxNDc2YTQ0MzA3NDY3MzU=",
        numbers:toNumbers.join(','),
        sender:sender,
        message:encoded_message
    };
    console.log(body)
    let result = await callApi('GET',url,body);
    return result;
}

// function urlEncodeLikePHP(str: any) {
//     return encodeURIComponent(str).replace(/[.!~*'()]/g, function(c) {
//         return '%' + c.charCodeAt(0).toString(16);
//     });
// }

// export const sms = (numbers: any, message: any) => {
//     console.log(message)
//     const body: any = {
//         "apikey": urlEncodeLikePHP("NTI3OTVhNGU3MDQ4NTQ0ZjYxNDc2YTQ0MzA3NDY3MzU="),
//         "numbers": [919920021073].join(','),
//         "sender": "ITSLET",
//         "message": urlEncodeLikePHP(message)
//     };

//     console.log(body)
    
//     const data = 'apikey='+body.apiKey+'&numbers='+body.numbers+"&sender="+body.sender+"&message="+body.message;
//     var options = {
//         'method': 'GET',
//         'url': 'https://api.textlocal.in/send/?'+data,
        
//     };
//     request(options, function (error: any, response: any) {
//         if (error) throw new Error(error);
//         console.log(response.body);
//     });
// }

// sms(["919920021073"], );


