package br.com.unionti.restclientapp.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.unionti.restclientapp.rest.RestTemplateFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class AppController {

	@Autowired
	RestTemplateFactory restTemplateFactory;
	
	@Value("${flowable.rest.url}")
	private String restUrl;
	
    @RequestMapping("/deployments")
    public String deployments() {
		RestTemplate restTemplate = restTemplateFactory.getObject();
	    String result = restTemplate.getForObject(restUrl + "repository/deployments", String.class);
        return result;
    }

    @RequestMapping("/processDefinitions")
    public String processDefinitions() {
		RestTemplate restTemplate = restTemplateFactory.getObject();
	    String result = restTemplate.getForObject(restUrl + "repository/process-definitions", String.class);
        return result;
    }


}