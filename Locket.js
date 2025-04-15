// Author: Locket Gold Unlock - Nightmarket
// Bản đồ định danh User-Agent với entitlement và subscription tương ứng
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'], // App khác (có thể là app tiếng Trung)
  'Locket': ['Gold'] // App Locket sẽ được gán quyền 'Gold'
};

// Lấy User-Agent từ header request
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// Chuyển đổi nội dung phản hồi thành object
var obj = JSON.parse($response.body);

// Thêm thông điệp cảnh báo
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Thông tin gói đăng ký (subscription) giả lập
var locket02 = {
  is_sandbox: false,
  ownership_type: "PURCHASED", // Đã mua
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z", // Hết hạn rất xa
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

// Thông tin quyền lợi (entitlement) tương ứng với subscription
var dohungx = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.locket02.premium.yearly", // ID gói mặc định
  expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra xem User-Agent có khớp với app nào trong bảng mapping không
const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match]; // Lấy tên entitlement và ID gói

  if (s) {
    // Nếu có chỉ định ID gói riêng
    dohungx.product_identifier = s;
    obj.subscriber.subscriptions[s] = locket02;
  } else {
    // Nếu không có ID riêng thì dùng ID mặc định
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  }

  // Gán entitlement theo tên app
  obj.subscriber.entitlements[e] = dohungx;
} else {
  // Trường hợp không khớp User-Agent nào → gán mặc định
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
  obj.subscriber.entitlements.pro = dohungx;
}

// Trả lại kết quả JSON sau khi chỉnh sửa
$done({ body: JSON.stringify(obj) });

