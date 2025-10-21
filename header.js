/***********************************************
> deleteHeader by NightMarket
***********************************************/	

const version = 'V1.0.3';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));
$done({ headers: modifiedHeaders });

// ========= Nightmarket ========= //

