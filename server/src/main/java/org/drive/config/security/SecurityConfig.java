package org.drive.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private Filter filter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.requiresChannel()
                .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
                .requiresSecure();

        http
                .cors().configurationSource(corsConfigurationSource()).and()
                .authorizeRequests()

                .antMatchers("/").fullyAuthenticated()
                .antMatchers("/employee").fullyAuthenticated()
                .antMatchers("/admin").fullyAuthenticated()
                .antMatchers("/holiday").fullyAuthenticated()
                .antMatchers("/holiday/**").fullyAuthenticated()
                .antMatchers("/employee/**").fullyAuthenticated()
                .antMatchers("/admin/**").fullyAuthenticated()
                .anyRequest().permitAll()

                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.applyPermitDefaultValues();
        config.setAllowedMethods(List.of("PUT", "POST", "OPTIONS", "DELETE", "GET"));
        source.registerCorsConfiguration("https://localhost:9999/**", config);
        return source;
    }


}
