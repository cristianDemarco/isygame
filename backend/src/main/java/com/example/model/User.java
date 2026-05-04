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

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Size(min=3, max=30)
    @NotNull
    private String username;

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
}
