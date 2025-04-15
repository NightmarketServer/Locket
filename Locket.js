// Author: Locket Gold Unlock - Nightmarket
var request = $request;

// Tạo cấu hình gọi API product_entitlement_mapping của RevenueCat
const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': request.headers["authorization"], // Lấy token từ header gốc
        'X-Platform': 'iOS',
        'User-Agent': request.headers["user-agent"]
    }
}

// Gửi request GET tới API của RevenueCat để lấy danh sách entitlement
$httpClient.get(options, function(error, newResponse, data) {

    // Parse dữ liệu trả về từ API
    const ent = JSON.parse(data);

    // Tạo JSON mẫu để trả về - giả lập user đã mua trọn đời (expires_date năm 9692)
    let jsonToUpdate = {
        "request_date_ms": 1704070861000,
        "request_date": "2024-04-12T01:01:01Z",
        "subscriber": {
            "entitlement": {},
            "first_seen": "2024-04-12T01:01:01Z",
            "original_application_version": "9692",
            "last_seen": "2024-04-12T01:01:01Z",
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": "2024-04-12T01:01:01Z",
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

    // Duyệt qua từng entitlement lấy được
    const productEntitlementMapping = ent.product_entitlement_mapping;

    for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
        const productIdentifier = productInfo.product_identifier;
        const entitlements = productInfo.entitlements;

        for (const entitlement of entitlements) {
            // Thêm entitlement vào JSON phản hồi
            jsonToUpdate.subscriber.entitlements[entitlement] = {
                "purchase_date": "2024-04-12T01:01:01Z",
                "original_purchase_date": "2024-04-12T01:01:01Z",
                "expires_date": "9692-01-01T01:01:01Z", // thời hạn vĩnh viễn
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store",
                "product_identifier": productIdentifier
            };

            // Thêm subscription tương ứng
            jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
                "expires_date": "9692-01-01T01:01:01Z",
                "original_purchase_date": "2024-04-12T01:01:01Z",
                "purchase_date": "2024-04-12T01:01:01Z",
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store"
            };
        }
    }

    // Trả về dữ liệu đã sửa
    body = JSON.stringify(jsonToUpdate);
    $done({ body });
});
