package br.com.unionti.restclientapp;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@Order(SecurityProperties.BASIC_AUTH_ORDER)
@EnableWebSecurity
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomAuthenticationManager authenticationManager;
	
	@Autowired
	CustomAuthenticationEntryPoint authEntryPoint;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		.antMatchers("/**").authenticated()
		.and().httpBasic()
		.authenticationEntryPoint(authEntryPoint)
		.and().cors();
	}
	
	@Override
 	public void configure(WebSecurity web) throws Exception {
 		web.ignoring().antMatchers("/*.css")
 		   .and().ignoring().antMatchers("/*.js");
 	}
	
	@Autowired
 	protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
 		auth.parentAuthenticationManager(authenticationManager);
 	}

    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST","HEAD","OPTIONS","PUT"));
		configuration.setAllowedHeaders(Arrays.asList("Content-Type","X-Requested-With","accept","Origin","Access-Control-Request-Method","Access-Control-Request-Headers", "authorization"));
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);    		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}