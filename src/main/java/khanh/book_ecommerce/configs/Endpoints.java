package khanh.book_ecommerce.configs;

public class Endpoints {
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/books/**",
            "/books/{id}",
            "/users/search/existsByUserName",
            "/users/search/existsByEmail",
            "/user/active",
            "/genres"
    };


    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/user/register"
    };
    public static final String[] ADMIN_GET_ENDPOINTS = {
           "/users",
            "/users/**",
    };
    public static final String FE_HOST = "http://localhost:3000";
}
