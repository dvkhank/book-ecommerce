package khanh.book_ecommerce.utils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class VNPayUtils {

    public static String buildQueryUrl(Map<String, String> rawParams, String hashSecret) {
        try {
            // Clone để tránh bị thay đổi input bên ngoài
            Map<String, String> params = new HashMap<>(rawParams);

            // 1. Tính chữ ký từ bản raw (chưa encode)
            String hashData = hashDataString(params);
            String secureHash = hmacSHA512(hashSecret, hashData);

            // 2. Thêm chữ ký vào params
            params.put("vnp_SecureHash", secureHash);

            // 3. Tạo URL từ bản đã encode đúng
            String queryString = buildQueryString(params);
            return "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" + queryString;

        } catch (Exception e) {
            throw new RuntimeException("Error building VNPAY query URL", e);
        }
    }

    public static String buildQueryString(Map<String, String> params) throws Exception {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        List<String> pairs = new ArrayList<>();
        for (String name : fieldNames) {
            String value = params.get(name);
            if (value != null && !value.trim().isEmpty()) {
                // Phải thay dấu '+' bằng '%20' sau URLEncoder.encode
                String encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8.toString()).replace("+", "%20");
                String encodedValue = URLEncoder.encode(value, StandardCharsets.UTF_8.toString()).replace("+", "%20");
                pairs.add(encodedName + "=" + encodedValue);
            }
        }
        return String.join("&", pairs);
    }

    public static String hashDataString(Map<String, String> params) {
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        List<String> pairs = new ArrayList<>();
        for (String name : fieldNames) {
            String value = params.get(name);
            if (value != null && !value.isEmpty()) {
                try {
                    String encodedValue = URLEncoder.encode(value, "US-ASCII");
                    pairs.add(name + "=" + encodedValue);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return String.join("&", pairs);
    }


    public static String hmacSHA512(String key, String data) throws Exception {
        Mac hmac512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmac512.init(secretKeySpec);
        byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));

        StringBuilder hash = new StringBuilder();
        for (byte b : bytes) {
            hash.append(String.format("%02x", b));
        }
        return hash.toString();
    }

    public static boolean validateSignature(Map<String, String> params, String secretKey, String secureHashFromVNPay) {
        try {
            // KHÔNG đưa vnp_SecureHash vào phần dữ liệu cần ký
            Map<String, String> cloned = new HashMap<>(params);
            cloned.remove("vnp_SecureHash");
            cloned.remove("vnp_SecureHashType"); // optional

            String data = hashDataString(cloned);
            String hmac = hmacSHA512(secretKey, data);
            return hmac.equalsIgnoreCase(secureHashFromVNPay); // nên dùng equalsIgnoreCase
        } catch (Exception e) {
            return false;
        }
    }
}
