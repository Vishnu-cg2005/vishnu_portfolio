package com.vishnu.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactEmail(String name, String email, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        
        // You are sending the email to yourself
        mailMessage.setTo("vishnucg.2005@gmail.com");
        
        // Subject line includes the sender's name
        mailMessage.setSubject("New Portfolio Contact from: " + name);
        
        // Format the message body
        String text = "You have received a new message from your portfolio website!\n\n"
                    + "Name: " + name + "\n"
                    + "Email: " + email + "\n\n"
                    + "Message:\n" + message;
        
        mailMessage.setText(text);
        
        // Set the reply-to header so you can easily reply to the sender
        mailMessage.setReplyTo(email);
        
        mailSender.send(mailMessage);
    }
}
