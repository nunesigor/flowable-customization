package br.com.unionti.restclientapp.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthorizationInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.unionti.restclientapp.rest.RestTemplateFactory;
import br.com.unionti.restclientapp.rest.mapping.Body;

@RestController
public class AppController {

	@Autowired
	RestTemplateFactory restTemplateFactory;
	
	@Value("${flowable.rest.url}")
	private String restUrl;
	
	@Deprecated
    @RequestMapping("/deployments")
    public String deployments() {
		RestTemplate restTemplate = restTemplateFactory.getObject();
	    String result = restTemplate.getForObject(restUrl + "repository/deployments", String.class);
        return result;
    }

	@Deprecated
    @RequestMapping("/processDefinitions")
    public String processDefinitions() {
		RestTemplate restTemplate = restTemplateFactory.getObject();
	    String result = restTemplate.getForObject(restUrl + "repository/process-definitions", String.class);
        return result;
    }
    
    @RequestMapping(value="/invoke", method=RequestMethod.POST)
    public ResponseEntity<String> invoke(@RequestBody Body body) {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		RestTemplate restTemplate = restTemplateFactory.getObject();
		restTemplate.getInterceptors().add(new BasicAuthorizationInterceptor(auth.getPrincipal().toString(),auth.getCredentials().toString()));
		ResponseEntity<String> result = null;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<String> entity = new HttpEntity<String>(body.getBody(),headers);
		switch (body.getMethod()) {
		case "GET":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.GET, entity, String.class);
			break;
		case "POST":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.POST, entity, String.class);
			break;
		case "PUT":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.PUT, entity, String.class);
			break;
		case "DELETE":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.DELETE, null, String.class);
			break;
		case "OPTIONS":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.OPTIONS, entity, String.class);
			break;
		case "HEAD":
			result = restTemplate.exchange(restUrl + body.getUri(), HttpMethod.HEAD, entity, String.class);
			break;

		default:
			break;
		}
        return result;
    }
    
    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public String logout(HttpSession session) {
        try {
    	session.invalidate();
        } catch (Exception e) {
			return "{success:'false'}";
		}
        return "{success:'true'}";
    }
    
    @RequestMapping(value="/loggeduser", method = RequestMethod.GET)
    public ResponseEntity<String> loggeduser() {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		RestTemplate restTemplate = restTemplateFactory.getObject();
		restTemplate.getInterceptors().add(new BasicAuthorizationInterceptor(auth.getPrincipal().toString(),auth.getCredentials().toString()));
		//HttpHeaders responseHeaders = new HttpHeaders();
		//responseHeaders.set("X-Requested-With", "XMLHttpRequest"); 
		return restTemplate.exchange(restUrl + "idm-api/users/" + auth.getPrincipal().toString(), HttpMethod.GET, null, String.class);
    }

}

