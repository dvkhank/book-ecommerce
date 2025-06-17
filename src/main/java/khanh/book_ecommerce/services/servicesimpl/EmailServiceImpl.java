package khanh.book_ecommerce.services.servicesimpl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import khanh.book_ecommerce.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public  EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendEmail(String to, String subject, String content) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true);
            messageHelper.setTo(to);
            messageHelper.setFrom("duongvan845@gmail.com");
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


}
