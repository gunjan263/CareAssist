package com.hexaware.careassist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import com.hexaware.careassist.filter.JwtAuthenticationFilter;
import com.hexaware.careassist.service.serviceimpl.UserDetailsServiceImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	private final UserDetailsServiceImpl userDetailsServiceImp;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

  

    public SecurityConfig(UserDetailsServiceImpl userDetailsServiceImp,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsServiceImp = userDetailsServiceImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
      
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/login/**","/register/**","/careassist/api/claims/**","/careassist/api/healthcare-providers/**","/careassist/api/insurance-companies/**",
                        		"/careassist/api/insurance-plans/**","/careassist/api/invoices/**","/careassist/api/patients/**")
                                .permitAll()
                                .requestMatchers("/careassist/api/administrators/**").hasAuthority("ADMIN")
                                .requestMatchers("/careassist/api/healthcare-providers/*","/careassist/api/invoices/*").hasAuthority("HEALTHCARE_PROVIDER")
                                .requestMatchers("/careassist/api/insurance-companies/*","/careassist/api/insurance-plans/*").hasAuthority("INSURANCE_COMPANY")
                                //.requestMatchers("/careassist/api/patients/*","/careassist/api/claims/*").hasAuthority("PATIENT")
                                .requestMatchers("/careassist/api/healthcare-providers/*","/careassist/api/invoices/*").hasAnyAuthority("HEALTHCARE_PROVIDER","ADMIN")
                                .requestMatchers("/careassist/api/claims/update/status/{id}","/careassist/api/insurance-companies/*","/careassist/api/insurance-plans/*").hasAnyAuthority("INSURANCE_COMPANY", "ADMIN")
                                .requestMatchers("/careassist/api/patients/**").hasAnyAuthority( "ADMIN")
                                //.requestMatchers("/careassist/api/insurance-plans/*","/careassist/api/patients/*").hasAnyAuthority("INSURANCE_COMPANY","PATIENT", "ADMIN")
                                .requestMatchers("/careassist/api/invoices/**").hasAnyAuthority("HEALTHCARE_PROVIDER","ADMIN","PATIENT")
                                .requestMatchers("/careassist/api/patients/**").hasAnyAuthority("INSURANCE_COMPANY")
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(userDetailsServiceImp)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e->e.accessDeniedHandler(
                                        (request, response, accessDeniedException)->response.setStatus(403)
                                )
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                
                .build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

}
