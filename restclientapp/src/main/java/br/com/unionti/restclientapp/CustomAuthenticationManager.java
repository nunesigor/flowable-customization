package br.com.unionti.restclientapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import br.com.unionti.restclientapp.entity.User;
import br.com.unionti.restclientapp.entity.UserRepository;

@Component
public class CustomAuthenticationManager implements AuthenticationManager {

	@Autowired
	UserRepository userRepository;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Authentication newUser = null;
		Optional<User> optuser = userRepository.findById(authentication.getPrincipal().toString());
		if (optuser.isPresent()) {
			if (authentication.getCredentials().toString().equals(optuser.get().getPwd())) {
				newUser = newUserAuth(authentication);
				newUser.setAuthenticated(true);
			} else
				throw new BadCredentialsException("Bad Credentials");
		} else
			throw new BadCredentialsException("Bad Credentials");
		return newUser;
	}

	private Authentication newUserAuth(Authentication auth) {
		Authentication newUser = null;
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		newUser = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), authorities);
		return newUser;
	}

}
