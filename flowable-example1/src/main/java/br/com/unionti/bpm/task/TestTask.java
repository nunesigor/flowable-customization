package br.com.unionti.bpm.task;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;

public class TestTask implements JavaDelegate {
	
	public void execute(DelegateExecution execution) {
		  if (execution.hasVariable("nome")) {
		    System.out.println(">>>>>> nome -> " + execution.getVariable("nome"));
		  } else {
		    System.out.println("########### blablabla");
		  }
	  }

}
