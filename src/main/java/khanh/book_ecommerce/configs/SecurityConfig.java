package khanh.book_ecommerce.configs;

import khanh.book_ecommerce.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //Who check authen our system
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);//find user
        authenticationProvider.setPasswordEncoder(passwordEncoder());//check password
        return authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                configurer -> configurer
                        .requestMatchers((HttpMethod.GET),Endpoints.PUBLIC_GET_ENDPOINTS ).permitAll()
                        .requestMatchers(HttpMethod.POST, Endpoints.PUBLIC_POST_ENDPOINTS).permitAll()
                        .requestMatchers(HttpMethod.GET, Endpoints.ADMIN_GET_ENDPOINTS).hasAuthority("Admin")
                        .requestMatchers(HttpMethod.GET, "/users/{id}").hasAuthority("User")
                        .requestMatchers(HttpMethod.POST, "/user/register").permitAll()
        );

        http.cors(cors -> {
            cors.configurationSource(request -> {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.addAllowedOrigin(Endpoints.FE_HOST);
                corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfiguration.addAllowedHeader("*");
                return corsConfiguration;
            });
        });


        http.httpBasic(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        return http.build();
    }

}
