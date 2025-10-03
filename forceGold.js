/*
 * nightmarketserver - Fake Locket Gold
 * Chỉ để hiển thị viền huy hiệu Gold local-only
 */

let body = $response.body;
if (body) {
  try {
    let obj = JSON.parse(body);

    if (!obj.subscriber) obj.subscriber = {};
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    // Fake subscription Gold
    obj.subscriber.subscriptions["locket.premium"] = {
      "is_sandbox": false,
      "ownership_type": "PURCHASED",
      "billing_issues_detected_at": null,
      "period_type": "normal",
      "expires_date": "2099-12-31T23:59:59Z",
      "grace_period_expires_date": null,
      "unsubscribe_detected_at": null,
      "original_purchase_date": "2025-09-02T00:00:00Z", // ngày fake tham gia
      "purchase_date": "2025-09-02T00:00:00Z",
      "store": "app_store"
    };

    // Fake entitlement Gold
    obj.subscriber.entitlements["Gold"] = {
      "grace_period_expires_date": null,
      "purchase_date": "2025-09-02T00:00:00Z",
      "product_identifier": "locket.premium",
      "expires_date": "2099-12-31T23:59:59Z"
    };

    // Flag attention
    obj.Attention = "nightmarketserver - Fake Gold local-only";

    body = JSON.stringify(obj);
  } catch (e) {
    console.log("Fake Gold error:", e);
  }
}

$done({ body });
