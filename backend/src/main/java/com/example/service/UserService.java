package com.example.service;

import com.example.model.Cart;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUserWithCart(User user){
        Cart cart = new Cart();

        cart.setUser(user);
        user.setCart(cart);

        return userRepository.save(user);
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
