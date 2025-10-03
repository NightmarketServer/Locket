// ========= nightmarketserver ========= //
// Đặt ngày tham gia
var specificDate = "2025-09-02T00:00:00Z"; // ISO 8601

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// Bắt lỗi parse
var obj = {};
try {
  obj = JSON.parse($response.body);
} catch (e) {
  console.log("Parse error:", e);
  $done({});
}

if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// ========= Subscription ========= //
var locket02 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate, // thay bằng ngày mới
  purchase_date: specificDate,         // thay bằng ngày mới
  store: "app_store"
};

// ========= Entitlement ========= //
var dohungx = {
  grace_period_expires_date: null,
  purchase_date: specificDate, // thay bằng ngày mới
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// ========= Áp dụng mapping ========= //
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];

  if (s) {
    dohungx.product_identifier = s;
    obj.subscriber.subscriptions[s] = locket02;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  }

  obj.subscriber.entitlements[e] = dohungx;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  obj.subscriber.entitlements.pro = dohungx;
}

// ========= Trả kết quả ========= //
$done({ body: JSON.stringify(obj) });
