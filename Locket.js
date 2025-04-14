// version: V1.0.4
// Author: Locket Gold Unlock + Fake Badge

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
let obj = JSON.parse($response.body);

obj.Attention = "🎉 Chúc mừng bạn đã nhận được Locket Gold! Không chia sẻ mã này cho người khác nhé!";

// Fake subscription data
const fakeSubscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

// Fake entitlement data
const fakeEntitlement = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Thêm huy hiệu fake
obj.badge = {
  enabled: true,
  name: "Gold",
  icon: "🏆", // bạn có thể đổi thành biểu tượng khác nếu muốn
  color: "#FFD700"
};

// Tìm trong mapping
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entitlement] = mapping[match];
  if (entitlement) {
    fakeEntitlement.product_identifier = entitlement;
    obj.subscriber.subscriptions[entitlement] = fakeSubscription;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = fakeSubscription;
  }
  obj.subscriber.entitlements[entitlement] = fakeEntitlement;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = fakeSubscription;
  obj.subscriber.entitlements["pro"] = fakeEntitlement;
}

$done({ body: JSON.stringify(obj) });
