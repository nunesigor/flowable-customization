package br.com.unionti.restclientapp.controller;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.unionti.restclientapp.entity.User;
import br.com.unionti.restclientapp.entity.UserRepository;

@RestController
public class UserController {
	
	
//	@RequestMapping(value="/login", method=RequestMethod.POST)
//	public ResponseEntity<?> login(@RequestBody User user) {
//		Optional<User> optuser = userRepository.findById(user.getId());
//		if (optuser.isPresent()) {
//			if (user.getPwd().equals(optuser.get().getPwd()))
//				return new ResponseEntity<User>(optuser.get(), HttpStatus.OK);
//			else
//				return new ResponseEntity<String>("unauthorized",HttpStatus.UNAUTHORIZED);
//		} else
//			return new ResponseEntity<String>("unauthorized",HttpStatus.UNAUTHORIZED);
//		
//	}
	
	@RequestMapping("/")
	  public Message home() {
	    return new Message("Hello World");
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
