package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final List<Feedback> feedbackList = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        feedbackList.sort(Comparator.comparing(Feedback::getId).reversed());
        return feedbackList;
    }

    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        feedback.setId(counter.incrementAndGet());
        feedbackList.add(feedback);
        return feedback;
    }

    public static class Feedback {
        private Long id;
        private String name;
        private String email;
        private String course;
        private Integer rating;
        private String message;

        public Feedback() {
        }

        public Feedback(Long id, String name, String email, String course, Integer rating, String message) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.course = course;
            this.rating = rating;
            this.message = message;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getCourse() {
            return course;
        }

        public void setCourse(String course) {
            this.course = course;
        }

        public Integer getRating() {
            return rating;
        }

        public void setRating(Integer rating) {
            this.rating = rating;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}