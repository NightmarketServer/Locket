// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
// =========  @NightMarket ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var nightmarket = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-10-20T01:01:01Z",
  purchase_date: "2025-10-20T01:01:01Z",
  store: "app_store"
},

vuong2023 = {
  grace_period_expires_date: null,
  purchase_date: "2025-10-20T01:01:01Z",
  product_identifier: "com.nightmarket.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    vuong2023.product_identifier = s;
    obj.subscriber.subscriptions[s] = nightmarket;
  } else {
    obj.subscriber.subscriptions["com.nightmarket.premium.yearly"] = nightmarket;
  }
  obj.subscriber.entitlements[e] = vuong2023;
} else {
  obj.subscriber.subscriptions["com.nightmarket.premium.yearly"] = nightmarket;
  obj.subscriber.entitlements.pro = vuong2023;
}

$done({ body: JSON.stringify(obj) });
