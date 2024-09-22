package com.example.projectManagement.service;

import com.example.projectManagement.model.Product;
import com.example.projectManagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService{
    @Autowired
    private ProductRepository productRepo;

    @Override
    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepo.findById(id).orElse(new Product());
    }

    @Override
    public Product editProduct(Product product, Integer id) {
        Product oldproduct = productRepo.findById(id).get();
            oldproduct.setProductName(product.getProductName());
            oldproduct.setDescription(product.getDescription());
            oldproduct.setPrice(product.getPrice());
            oldproduct.setStatus(product.getStatus());
            productRepo.save(oldproduct);
            return oldproduct;
    }

    @Override
    public String deleteProduct(Integer id) {
        Product prodact = productRepo.findById(id).get();
        if (prodact != null){
            productRepo.deleteById(id);
            return "product delete sucessfully";
        }
        return "Product not found";
    }

}
