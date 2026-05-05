package com.example.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Size(min=3, max=30)
    @NotNull
    private String nickname;

    @Column(unique = true)
    @Size(min=3, max=50)
    @Email
    @NotNull
    private String email;

    @Column
    @Size(min=8, max=60)
    @NotNull
    private String password;

    @Column
    private LocalDate createdAt;

    @JsonManagedReference
    @OneToOne(cascade= CascadeType.ALL, mappedBy = "user", optional = false)
    @NotNull
    private Cart cart;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of();
    }

    @Override
    public String getUsername(){
        return email;
    }

    @Override
    public String getPassword(){
        return password;
    }

    @Override
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override
    public boolean isEnabled(){
        return true;
    }
}
