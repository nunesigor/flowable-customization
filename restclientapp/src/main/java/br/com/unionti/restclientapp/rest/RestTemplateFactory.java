package br.com.unionti.restclientapp.rest;

import org.apache.http.HttpHost;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.support.BasicAuthorizationInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateFactory implements FactoryBean<RestTemplate>, InitializingBean {

	private RestTemplate restTemplate;
	
	@Value("${flowable.rest.user}")
	private String user;
	
	@Value("${flowable.rest.password}")
	private String password;
	
	@Value("${flowable.rest.hostname}")
	private String hostname;
	
	@Value("${flowable.rest.port}")
	private int port;
	
	@Value("${flowable.rest.protocol}")
	private String protocol;
	
	public RestTemplate getObject() {
		return restTemplate;		
	}

	public Class<RestTemplate> getObjectType() {
		return RestTemplate.class;
	}

	public boolean isSingleton() {
		return true;
	}

	public void afterPropertiesSet() {
		HttpHost host = new HttpHost(hostname, port, protocol);
        final ClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactoryBasicAuth(host);
        restTemplate = new RestTemplate(requestFactory);
        restTemplate.getInterceptors().add(new BasicAuthorizationInterceptor(user, password));
	}
	
}