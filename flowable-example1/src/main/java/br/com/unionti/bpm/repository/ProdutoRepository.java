/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.unionti.bpm.repository;

import br.com.unionti.bpm.entity.Produto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;


public interface ProdutoRepository extends CrudRepository<Produto, Long>{

    @Override
    public Produto save(Produto p);

    @Override
    public long count();

    @Override
    public void delete(Produto t);

    @Override
    public void deleteById(Long id);

    @Override
    public boolean existsById(Long id);

    @Override
    public List<Produto> findAll();

    @Override
    public Optional<Produto> findById(Long id);

    public List<Produto> findByNome(String nome);

}
