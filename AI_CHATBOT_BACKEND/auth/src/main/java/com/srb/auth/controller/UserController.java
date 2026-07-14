package com.srb.auth.controller;

import com.srb.auth.model.User;
import com.srb.auth.service.UserService;
import com.srb.auth.util.UtilJwt;
import jdk.jshell.execution.Util;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    private final UtilJwt utilJwt;

    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, UtilJwt utilJwt, AuthenticationManager authenticationManager)
    {
        this.userService=userService;
        this.utilJwt = utilJwt;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public String createUser(@RequestBody User user)
    {
        return userService.addUserToDB(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> doLogin(@RequestParam String phNumber, @RequestParam String password)
    {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(phNumber,password)
        );
        if(authentication.isAuthenticated())
        {
            Map<String, String> response = new HashMap<>();
            response.put("token", utilJwt.generateJwtToken(phNumber));

            return ResponseEntity.ok(response);
           // return utilJwt.generateJwtToken(phNumber);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/get/{phNumber}")
    public User getUserDetails(@PathVariable String phNumber)
    {
        System.out.println("ph num : "+phNumber);
        return userService.getUserDetails(phNumber);
    }



}
