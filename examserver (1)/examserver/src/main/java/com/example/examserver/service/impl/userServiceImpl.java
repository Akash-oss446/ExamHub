package com.example.examserver.service.impl;

import com.example.examserver.model.User;
import com.example.examserver.model.UserRole;
import com.example.examserver.repo.RoleRepository;
import com.example.examserver.repo.UserRepository;
import com.example.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Set;
@Service
public class userServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local=this.userRepository.findByUsername(user.getUsername());
        if(local!=null)
        {
            System.out.println("User is already there!!");
            throw new Exception("User already Present!!");
        }
        else {
             for(UserRole ur:userRoles)
             {
                 roleRepository.save(ur.getRole());
             }
             user.getUserRoles().addAll(userRoles);
             local=this.userRepository.save(user);
        }

        return local;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
