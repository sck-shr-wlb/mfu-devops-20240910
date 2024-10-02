package com.example.greetingservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String getGreeting() throws InterruptedException  {
        Thread.sleep(1000);
        return "Hello, Health Check!";
    }
}
