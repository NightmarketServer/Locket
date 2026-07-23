/***********************************************
> deleteHeader by NightmarketServer
***********************************************/

const version = 'V1.0.2';

function setHeaderValue(headers, key, value) {
    var lowerKey = key.toLowerCase();
    lowerKey in headers ? headers[lowerKey] = value : headers[key] = value;
}

var modifiedHeaders = $request.headers;

setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

$done({
    headers: modifiedHeaders
});
