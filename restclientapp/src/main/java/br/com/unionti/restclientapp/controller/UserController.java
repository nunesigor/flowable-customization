package br.com.unionti.restclientapp.controller;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.unionti.restclientapp.entity.User;
import br.com.unionti.restclientapp.entity.UserRepository;
import br.com.unionti.restclientapp.rest.mapping.Body;
import br.com.unionti.restclientapp.rest.mapping.Password;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	
	@SuppressWarnings("finally")
	@RequestMapping(value="/changepassword", method=RequestMethod.POST )
	  public @ResponseBody String changepassword(@RequestBody Password password) {
		String response = "";
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if (auth.getCredentials().toString().equals(password.getCurrentpassword())) {
				Optional<User> user = userRepo.findById(auth.getPrincipal().toString());
				if (user.isPresent()) {
					user.get().setPwd_(password.getNewpassword());
					userRepo.save(user.get());
					response = "{\"success\":\"true\"}";
				} else {
					response = "{success:'false',error:'not possible to change pasword - user not found on database'}";
				}
			} else {
				response = "{success:'false',error:'current password is wrong.'}";
			}		
		}catch (Exception e) {
			response = "{success:'false',error:'"+e.getMessage()+"'}";
		} finally {
			return response;
		}
	  }
	
	@RequestMapping("/token")
	  public Map<String,String> token(HttpSession session) {
	    return Collections.singletonMap("token", session.getId());
	  }
}

class Message {
	  private String id = UUID.randomUUID().toString();
	  private String content;
	  public Message(String content) {
	    this.content = content;
	  }
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
