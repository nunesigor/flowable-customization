/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.unionti.bpm.task;

import br.com.unionti.bpm.entity.Produto;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.unionti.bpm.repository.ProdutoRepository;
import org.springframework.stereotype.Component;

/**
 *
 * @author dev
 */
@Component
public class JPATask implements JavaDelegate {

    @Autowired
    ProdutoRepository produtoRepository;

    public void execute(DelegateExecution execution) {
        if (execution.hasVariable("nome")) {
            Produto p = new Produto();
            p.setNome(execution.getVariable("nome").toString());
            produtoRepository.save(p);
        }
    }

}
