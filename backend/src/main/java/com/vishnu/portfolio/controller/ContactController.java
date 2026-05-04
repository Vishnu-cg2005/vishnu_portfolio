package com.vishnu.portfolio.controller;

import com.vishnu.portfolio.model.ContactRequest;
import com.vishnu.portfolio.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows the local HTML file to access this endpoint
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<String> handleContactSubmission(@RequestBody ContactRequest request) {
        try {
            // Validate inputs
            if (request.getName() == null || request.getName().trim().isEmpty() ||
                request.getEmail() == null || request.getEmail().trim().isEmpty() ||
                request.getMessage() == null || request.getMessage().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("All fields are required.");
            }

            // Send email
            emailService.sendContactEmail(request.getName(), request.getEmail(), request.getMessage());
            
            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to send message: " + e.getMessage());
        }
    }
}
