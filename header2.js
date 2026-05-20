// deleteHeader.js - NightmarketServer
// Remove headers that might be used by RevenueCat/app server to detect tampering

var req = $request;
var headers = req.headers || {};

// Remove a set of headers that can trigger server-side checks
delete headers['x-revenuecat-etag'];
delete headers['x-revenuecat-signature'];
delete headers['if-none-match'];
delete headers['if-modified-since'];
// Optionally remove user-agent if you want to force the UA from the config (uncomment if desired)
// delete headers['user-agent'];

$done({ headers: headers });
// ========= Nightmarket ========= //

