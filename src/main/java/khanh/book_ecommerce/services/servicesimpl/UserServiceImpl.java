package khanh.book_ecommerce.services.servicesimpl;

import khanh.book_ecommerce.configs.Endpoints;
import khanh.book_ecommerce.models.Role;
import khanh.book_ecommerce.models.User;
import khanh.book_ecommerce.models.UserRole;
import khanh.book_ecommerce.repositories.RoleRepository;
import khanh.book_ecommerce.repositories.UserRepository;
import khanh.book_ecommerce.repositories.UserRoleRepository;
import khanh.book_ecommerce.services.EmailService;
import khanh.book_ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private EmailService emailService;

    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,  EmailService emailService,
                           UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
        this.userRoleRepository = userRoleRepository;
    }
    @Override
    public ResponseEntity<?> registerAccount(User user) {
        if(userRepository.existsByUserName(user.getUserName())) {
            return ResponseEntity.badRequest().body("User name already exists");
        }
        if(userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(false);
        user.setActiveCode(createActiveCode());
        User savedUser = userRepository.save(user);
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(roleRepository.findByRoleName("User"));
        userRoleRepository.save(userRole);
        sendEmail(user.getEmail(),user.getActiveCode());
        return ResponseEntity.ok(savedUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                rolesToAuthorities(user.getListUserRoles().stream().map(userRole -> userRole.getRole())
                        .collect(Collectors.toList()))
        );
    }

    private Collection<? extends GrantedAuthority> rolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors
                .toList());
    }

    private String createActiveCode() {
        return UUID.randomUUID().toString();
    }

    private void sendEmail(String email, String activeCode) {
        String subject = "Email Active Code";
        String url = Endpoints.FE_HOST + "/user/active?email=" + email + "&activeCode=" + activeCode;
        String content = "<!DOCTYPE html>" +
                "<html>" +
                "<body style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
                "<h2 style='color: #2E86C1;'>🔐 Email Verification</h2>" +
                "<p>Hi there,</p>" +
                "<p>Thank you for registering! Please use the following code to activate your account:</p>" +
                "<p style='font-size: 20px; font-weight: bold; color: #D35400;'>" + activeCode + "</p>" +
                "<p>Or click the link below to verify directly:</p>" +
                "<a href='" + url + "' style='display: inline-block; padding: 10px 15px; background-color: #2E86C1; color: white; text-decoration: none; border-radius: 5px;'>Verify My Account</a>" +
                "<p>If you didn’t request this, you can safely ignore this email.</p>" +
                "<hr>" +
                "<p style='font-size: 12px; color: #888;'>This is an automated message. Do not reply.</p>" +
                "</body>" +
                "</html>";

        emailService.sendEmail(email, subject, content);
    }

    @Override
    public ResponseEntity<?> activateEmail(String activeCode,String email) {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            return ResponseEntity.badRequest().body("Email not found");
        }
        if(user.isActive()) {
            return ResponseEntity.badRequest().body("Email already activated");
        }
        if(activeCode.equals(user.getActiveCode())) {
            user.setActive(true);
            userRepository.save(user);
            return ResponseEntity.ok("Activated account successfully");
        } else {
            return ResponseEntity.badRequest().body("Account activation failed due to activation code is not correctly");
        }

    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUserName(username);
    }

}
