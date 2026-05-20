/***********************************************
> deleteHeader by NightMarket
***********************************************/	
/***********************************************
 > Author: William - Thành Long
***********************************************/
const version = 'V1.0.2';
function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}
var modifiedHeaders=$request.headers;
setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag","");
$done({headers:modifiedHeaders});

// ========= Nightmarket ========= //

