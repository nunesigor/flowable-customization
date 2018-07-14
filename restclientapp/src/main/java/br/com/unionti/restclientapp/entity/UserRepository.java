package br.com.unionti.restclientapp.entity;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User,String> {
	
	public Optional<User> findById(Long id);

}
