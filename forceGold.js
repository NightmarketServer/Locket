/*
 * Fake Locket Gold
 * Force unlock Gold flag in RevenueCat response
 */

let body = $response.body;
if (body) {
  try {
    let obj = JSON.parse(body);

    if (obj.subscriber) {
      // Tạo gói Gold giả
      obj.subscriber.subscriptions = {
        "locket.premium": {
          "expires_date": "2099-12-31T23:59:59Z",
          "original_purchase_date": "2023-01-01T00:00:00Z",
          "purchase_date": "2023-01-01T00:00:00Z",
          "ownership_type": "PURCHASED",
          "store": "app_store"
        }
      };
      obj.subscriber.entitlements = {
        "premium": {
          "product_identifier": "locket.premium",
          "expires_date": "2099-12-31T23:59:59Z",
          "purchase_date": "2023-01-01T00:00:00Z"
        }
      };
    }

    body = JSON.stringify(obj);
  } catch (e) {
    console.log("forceGold error: " + e);
  }
}
$done({ body });
