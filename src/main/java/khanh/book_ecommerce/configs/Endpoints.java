package khanh.book_ecommerce.configs;

public class Endpoints {
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/books/**",
            "/books/{id}",
            "/users/search/existsByUserName",
            "/users/search/existsByEmail",
            "/user/active",
            "/genres",
            "/user/info",
            "/user/order-info/**",
            "/payment/**",
            "/payment",
            "/payment/ipn",

    };


    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/user/register",
            "/user/login",
            "/payment/**",
            "/payment/ipn",
            "/payment"
    };
    public static final String[] ADMIN_GET_ENDPOINTS = {
           "/users",
            "/users/**",
    };
    public static final String[] ADMIN_POST_ENDPOINTS = {
          "/admin/**",
            "/books"
    };
    public static final String FE_HOST = "http://localhost:3000";
    public static final String BE_HOST = "http://localhost:8080";
}
