package br.com.unionti.restclientapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "br.com.unionti")
@EnableAutoConfiguration
@SpringBootApplication
public class RestclientappApplication extends SpringBootServletInitializer {
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(RestclientappApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(RestclientappApplication.class, args);
	}
	
}
