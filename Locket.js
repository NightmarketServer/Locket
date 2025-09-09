// Updated Locket_fix.js
// ========= Đặt ngày tham gia là 2/9/2025 ========= //
var specificDate = "2025-02-09T00:00:00Z"; // Định dạng ISO 8601

// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold'] // Đảm bảo rằng Locket Gold được sử dụng đúng cách
};

// ========= Kiểm tra và Khởi tạo ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// Bắt lỗi khi parsing response
try {
  var obj = JSON.parse($response.body);
} catch (e) {
  console.log("Error parsing response body:", e);
  $done({}); // Trả kết quả trống nếu lỗi xảy ra
}

// Đảm bảo các key cơ bản tồn tại
if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

// ========= Tạo thông tin gói Locket Gold ========= //
var xunn = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z", // Ngày hết hạn lâu dài
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,  // Ngày tham gia
  purchase_date: specificDate,          // Ngày mua
  store: "app_store"
};

var xunn_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate, // Ngày tham gia
  product_identifier: "com.xunn.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z" // Ngày hết hạn lâu dài
};

// ========= Áp dụng Mapping ========= //
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let entitlementKey = mapping[match][0] || "Locket";
  let subscriptionKey = mapping[match][1] || "com.xunn.premium.yearly";

  obj.subscriber.subscriptions[subscriptionKey] = xunn;
  obj.subscriber.entitlements[entitlementKey] = xunn_entitlement;
} else {
  // Gán mặc định nếu không có khớp
  obj.subscriber.subscriptions["com.hoangvanbao.premium.yearly"] = xunn;
  obj.subscriber.entitlements["Locket"] = xunn_entitlement;
}

// ========= Thêm thông báo và Log ========= //
obj.Attention = "Chúc mừng bạn Xunn! Vui lòng không bán hoặc chia sẻ cho người khác!";
console.log("User-Agent:", ua);
console.log("Final Modified Response:", JSON.stringify(obj, null, 2));

// ========= Trả kết quả cuối cùng ========= //
$done({ body: JSON.stringify(obj) });

// ========= Xunn ========= //
