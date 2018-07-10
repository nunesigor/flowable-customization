package br.com.unionti.bpm.task;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("restTask")
public class RestTask implements JavaDelegate {

	public void execute(DelegateExecution execution) {
		RestTemplate restTemplate = new RestTemplate();
	    String result = restTemplate.getForObject("https://jsonplaceholder.typicode.com/users", String.class);
	    System.out.println(result);
	}
	
}