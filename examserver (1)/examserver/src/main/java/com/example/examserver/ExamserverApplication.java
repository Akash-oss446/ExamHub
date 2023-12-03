package com.example.examserver;

import com.example.examserver.model.Role;
import com.example.examserver.model.User;
import com.example.examserver.model.UserRole;
import com.example.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	public static void main(String[] args) {

		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting Code");
		/*User user=new User();
		user.setFirstname("Rahul");
		user.setLastname("Pandey");
		user.setUsername("Rahul33");
		user.setPassword(this.bCryptPasswordEncoder.encode("rahul@44"));
		user.setEmail("rahul48@gmail.com");
        user.setProfile("default.png");
		Role role1=new Role();
		role1.setRoleid(1L);
		role1.setRoleName("Normal User");
		Set<UserRole> userRoleSet=new HashSet<>();
		UserRole userRole=new UserRole();
		userRole.setRole(role1);
		userRole.setUser(user);
		userRoleSet.add(userRole);
		User user1=this.userService.createUser(user,userRoleSet);
		System.out.println(user1.getUsername());*/
	}
}
