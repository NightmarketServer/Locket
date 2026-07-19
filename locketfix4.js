/***********************************************
 > Author:  NightmarketServer
***********************************************/
// revenuecat.js - Bypass xác thực trạng thái thuê bao Locket Gold
let url = $request.url;
let method = $request.method;

// Hàm ép trạng thái subscriber thành Gold đến 25/11/2027
function forceGold(body) {
    try {
        let data = JSON.parse(body);
        if (!data.subscriber) return body;
        // Thiết lập quyền Gold
        data.subscriber.entitlements = {
            "gold": {
                "expires_date": "2027-11-25T23:59:59Z",
                "product_identifier": "gold_lifetime",
                "purchase_date": "2027-11-25T00:00:00Z",
                "is_sandbox": false,
                "unsubscribe_detected_at": null,
                "grace_period_expires_date": null,
                "ownership_type": "PURCHASED",
                "store": "app_store"
            }
        };
        // Ghi đè danh sách gói đang hoạt động
        data.subscriber.active_subscriptions = ["gold_lifetime"];
        data.subscriber.first_seen = "2027-11-25T00:00:00Z";
        data.subscriber.original_app_user_id = data.subscriber.original_app_user_id || "fake_user_gold";
        data.subscriber.original_application_version = "1.0.0";
        // Xóa các trường báo lỗi nếu có
        delete data.subscriber.nonce;
        delete data.subscriber.management_url;
        return JSON.stringify(data);
    } catch (e) {
        return body;
    }
}

if (url.includes("/receipts") || url.includes("/subscribers/")) {
    // Nếu là request POST (gửi receipt) - can thiệp body gửi đi
    if (method === "POST" && url.includes("/receipts")) {
        let reqBody = $request.body;
        if (reqBody) {
            try {
                let obj = JSON.parse(reqBody);
                // Ép receipt thành hợp lệ
                obj.attributes = obj.attributes || {};
                obj.attributes.product_identifier = "gold_lifetime";
                obj.attributes.price = 0;
                $done({ body: JSON.stringify(obj) });
            } catch (e) {
                $done({});
            }
        } else {
            $done({});
        }
    }
    // Nếu là response (GET /subscribers hoặc POST receipt trả về)
    else {
        let body = $response.body;
        let modified = forceGold(body);
        $done({ body: modified });
    }
} else {
    $done({});
}

