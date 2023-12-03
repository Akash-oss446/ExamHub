package com.example.examserver.controller;

import com.example.examserver.model.Role;
import com.example.examserver.model.User;
import com.example.examserver.model.UserRole;
import com.example.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        Set<UserRole> roles=new HashSet<>();
        Role role=new Role();
        role.setRoleid(2L);
        role.setRoleName("Normal User");
        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);
        return this.userService.createUser(user,roles);
    }
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username)
    {
        return  this.userService.getUser(username);

        }

    //delete user by id
    @DeleteMapping("/{userId}")
    public void DeleteUser(@PathVariable("userId") Long userId)
    {
        this.userService.deleteUser(userId);
    }
}
