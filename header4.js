// deleteHeader.js - NightmarketServer
// Updated deleteHeader.js
let headers = $request.headers;
// Xóa token và header đặc trưng của Locket/RevenueCat
delete headers["Authorization"];
delete headers["X-Platform"];
delete headers["X-Version"];
delete headers["X-Client-Build"];
delete headers["X-Client-Date"];
delete headers["X-Client-Timezone"];
delete headers["X-Device-Id"];
delete headers["X-App-Build"];
delete headers["X-Storefront"];
delete headers["If-None-Match"];
// Giả mạo User-Agent iOS
headers["User-Agent"] = "Locket/1.0 CFNetwork/1404.0.5 Darwin/22.3.0";
$done({ headers: headers });
