const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var locket02 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-10-20T01:01:01Z",
  purchase_date: "2025-10-20T01:01:01Z",
  store: "app_store",
  badge_awarded: true,                 // thêm flag huy hiệu ở subscription
  badge_awarded_date: "2025-10-20T01:01:01Z"
},

locket01 = {
  grace_period_expires_date: null,
  purchase_date: "2025-10-20T01:01:01Z",
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z",
  badge: {                              // thêm object huy hiệu ở entitlement
    name: "Premium",
    awarded: true,
    awarded_date: "2025-10-20T01:01:01Z"
  }
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    locket01.product_identifier = s;
    obj.subscriber.subscriptions[s] = locket02;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  }
  // dùng key entitlement (giải mã nếu cần)
  try {
    obj.subscriber.entitlements[decodeURIComponent(e)] = locket01;
  } catch (ex) {
    obj.subscriber.entitlements[e] = locket01;
  }
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  obj.subscriber.entitlements.pro = locket01;
}

$done({ body: JSON.stringify(obj) });
