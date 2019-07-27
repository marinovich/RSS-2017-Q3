const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const delay = require('delay');

const URL = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed';
const KEY = 'AIzaSyCxa0sn_IXX6Pa6yWdEEXLulNw26mEH5jQ';
const STRATEGY = 'desktop';

let startTime = Date.now();

let objCount = 0;
let arrLength = 0;
let outputString = '';

let makeUrl = function(url) {
    return `${URL}?url=${url}&key=${KEY}&strategy=${STRATEGY}`;
}

async function getScore(url) {
    
    let i = 0;
    res = await fetch(makeUrl(url))
        .then(res => res.json())
        .catch(err => console.error(err));

    while (res.error && res.error.code >= 400 && i < 10) {
        await delay(i * 1000);
        res = await fetch(makeUrl(url))
            .then(res => res.json())
            .catch(err => console.error(err));   
        i++; 
    }

    if (!res.error) {
        outputString += JSON.stringify({
            'url': url,
            'score': res.score,
        }) + '\r\n';
        console.log(++objCount, res.id, res.score);
    }

    else {
        outputString += JSON.stringify({
            'url': url,
            'errorMessage': res.error.message,
        }) + '\r\n';
        console.log(++objCount, res);
    }

    if (objCount === arrLength) {
        writeToFile(outputString);
    }
}

function writeToFile(json) {
    fs.writeFile(process.argv[3], json, (err, data) => {
        if(err) throw err;
    });
    console.log(`Done in ${(Date.now() - startTime) / 1000} sec.`);
}

fs.readFile(process.argv[2], async function(err, data) {
    if(err) throw err;
    let array = data.toString().split('\r\n').filter(x => x);
    arrLength = array.length;

    for(let i in array) {
        await delay(1000);
        getScore(array[i])
    }
});


// { errors: [ [Object] ],
//      code: 403,
//      message: 'Daily Limit Exceeded. The quota will be reset at midnight Pacific
//  Time (PT). You may monitor your quota usage and adjust limits in the API Consol
// e: https://console.developers.google.com/apis/api/pagespeedonline.googleapis.com
// /quotas?project=953829213186' } }
