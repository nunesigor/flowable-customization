package br.com.unionti.restclientapp.controller;

import java.util.Optional;

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
	
	@Autowired
	UserRepository userRepository;
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<?> login(@RequestBody User user) {
		Optional<User> optuser = userRepository.findById(user.getId());
		if (optuser.isPresent()) {
			if (user.getPwd().equals(optuser.get().getPwd()))
				return new ResponseEntity<User>(optuser.get(), HttpStatus.OK);
			else
				return new ResponseEntity<String>("unauthorized",HttpStatus.UNAUTHORIZED);
		} else
			return new ResponseEntity<String>("unauthorized",HttpStatus.UNAUTHORIZED);
		
	}

}
