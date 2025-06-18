package khanh.book_ecommerce.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import khanh.book_ecommerce.models.Role;
import khanh.book_ecommerce.models.User;
import khanh.book_ecommerce.models.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtService {
    public static final String SECRET = "dfshr6986tjhds45rfsdvS";

    @Autowired
    private UserService userService;

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        User user = userService.findByUsername(username);
        if (user != null ) {
            List<UserRole> userRoles =  user.getListUserRoles();
            if (userRoles != null) {
                boolean isAdmin = false;
                boolean isStaff = false;
                boolean isUser = false;
                for (UserRole userRole : userRoles) {
                    if(userRole.getRole().getRoleName().equals("Admin")) {
                        isAdmin = true;
                    }
                    if(userRole.getRole().getRoleName().equals("User")) {
                        isUser = true;
                    }
                    if(userRole.getRole().getRoleName().equals("Staff")) {
                        isStaff = true;
                    }
                }
                claims.put("isAdmin", isAdmin);
                claims.put("isUser", isUser);
                claims.put("isStaff", isStaff);

            }
        }
        return createToken(claims,username);
    }


    //Create Token
    private String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+30*60*1000))
                .signWith(SignatureAlgorithm.HS256,getSignKey())
                .compact();

    }
    //Create SignKey
    private Key getSignKey() {
        byte[] encodedKey = Base64.getEncoder().encode(SECRET.getBytes());
        return Keys.hmacShaKeyFor(encodedKey);
    }

    //Extract Infos from Tokens

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    //Extract 1 info
    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    //Check date of Token

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Boolean isTokenExpried(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return ( username.equals(userDetails.getUsername())&&!isTokenExpried(token));
    }
}
