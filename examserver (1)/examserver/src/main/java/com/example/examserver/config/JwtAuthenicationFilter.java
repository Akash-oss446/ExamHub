package com.example.examserver.config;

import com.example.examserver.service.impl.UserDetailsServicesimp;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenicationFilter extends OncePerRequestFilter {
    @Autowired
   private UserDetailsServicesimp userDetailsServicesimp;
    @Autowired
    private JwtUtil jwtutil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      final  String requestTokenHeader=request.getHeader("Authorization");
        System.out.println(requestTokenHeader);
        String username=null;
        String jwtToken=null;
        if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer"))
        {
            jwtToken=requestTokenHeader.substring(7);
            try{
                username=this.jwtutil.extractUsername(jwtToken);
            }
            catch(ExpiredJwtException e)
            {
                e.printStackTrace();
                System.out.println("jwt token has expired");
            }catch (Exception e)
            {
                e.printStackTrace();
                System.out.println("error");
            }
        }
        else {
            System.out.println("Invalid token");
        }
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            UserDetails userdetails = this.userDetailsServicesimp.loadUserByUsername(username);
            if (this.jwtutil.validateToken(jwtToken, userdetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(userdetails, null, userdetails.getAuthorities());
                usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
            }
        }
        else {
            System.out.println("Token is invalid");

        }
     filterChain.doFilter(request,response);
    }
}
