// === NightmarketServerr ===
// Ngày tham gia đặt thành 2025-10-20 (ISO)

var request = $request;

const options = {
    url: "https://api.revenuecat.com/v1/product_entitlement_mapping",
    headers: {
        'Authorization': request.headers["authorization"],
        'X-Platform': 'iOS',
        'User-Agent': request.headers["user-agent"]
    }
};

$httpClient.get(options, function (error, newResponse, data) {

    const ent = JSON.parse(data);

    // ====== Chỉnh ngày tham gia ======
    const joinDateISO = "2025-10-20T00:00:00Z";
    const joinDateMs = Date.parse(joinDateISO);

    let jsonToUpdate = {
        "request_date_ms": joinDateMs,
        "request_date": joinDateISO,
        "subscriber": {
            "entitlement": {},
            "first_seen": joinDateISO,
            "original_application_version": "9692",
            "last_seen": joinDateISO,
            "other_purchases": {},
            "management_url": null,
            "subscriptions": {},
            "entitlements": {},
            "original_purchase_date": joinDateISO,
            "original_app_user_id": "70B24288-83C4-4035-B001-573285B21AE2",
            "non_subscriptions": {}
        }
    };

    const productEntitlementMapping = ent.product_entitlement_mapping;

    for (const [entitlementId, productInfo] of Object.entries(productEntitlementMapping)) {
        const productIdentifier = productInfo.product_identifier;
        const entitlements = productInfo.entitlements;

        for (const entitlement of entitlements) {
            jsonToUpdate.subscriber.entitlements[entitlement] = {
                "purchase_date": joinDateISO,
                "original_purchase_date": joinDateISO,
                "expires_date": "9692-01-01T01:01:01Z",
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store",
                "product_identifier": productIdentifier
            };

            // Add product identifier to subscriptions
            jsonToUpdate.subscriber.subscriptions[productIdentifier] = {
                "expires_date": "9692-01-01T01:01:01Z",
                "original_purchase_date": joinDateISO,
                "purchase_date": joinDateISO,
                "is_sandbox": false,
                "ownership_type": "PURCHASED",
                "store": "app_store"
            };
        }
    }

    body = JSON.stringify(jsonToUpdate);
    $done({ body });
});

/*
  === Ghi chú ===
  - Tự động lấy danh sách entitlement từ RevenueCat.
  - Toàn bộ ngày mua/khởi tạo đã chỉnh về 2025-10-20.
  - Giữ nguyên cấu trúc hoạt động theo @Ohoang7.
*/
