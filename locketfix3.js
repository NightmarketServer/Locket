/***********************************************
 > Author:  NightmarketServer
***********************************************/
// == Locket Gold Unlock Script with Badge ==
// ✅ By NightMarket | Version 1.0.4

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// 🎉 Custom message
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// 🪙 Subscription block
var locketSub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2027-11-25T00:00:00Z",
  purchase_date: "2027-11-25T00:00:00Z",
  store: "app_store"
};

// 🪙 Entitlement block
var locketEnt = {
  grace_period_expires_date: null,
  purchase_date: "2027-11-25T00:00:00Z",
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// 🏅 Badge entitlement
var badgeEnt = {
  product_identifier: "locket_gold_badge",
  purchase_date: "2027-11-25T00:00:00Z",
  expires_date: "2099-12-18T01:04:17Z"
};

// 🧠 Feature flags
obj.subscriber.features = ["changeAppIcon", "cameraTheme", "goldBadge"];

// 🔁 Mapping logic
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [entKey, subKey] = mapping[match];
  if (subKey) {
    locketEnt.product_identifier = subKey;
    obj.subscriber.subscriptions[subKey] = locketSub;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locketSub;
  }
  obj.subscriber.entitlements[entKey] = locketEnt;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locketSub;
  obj.subscriber.entitlements["Gold"] = locketEnt;
}

// 🏅 Inject badge entitlement
obj.subscriber.subscriptions["locket_gold_badge"] = locketSub;
obj.subscriber.entitlements["GoldBadge"] = badgeEnt;

$done({ body: JSON.stringify(obj) });


// == Header Cleaner ==
const version = 'V1.0.4';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
console.log("Modified Headers:", JSON.stringify(modifiedHeaders));
$done({ headers: modifiedHeaders });
});
