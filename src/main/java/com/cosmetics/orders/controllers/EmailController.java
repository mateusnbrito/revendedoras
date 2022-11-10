package com.cosmetics.orders.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cosmetics.orders.entities.Email;
import com.cosmetics.orders.services.EmailService;

@RestController
public class EmailController {
  private final String request = "/pedido";
  private final String send = "/enviar";
  private String productsString = "";

  @PostMapping(request + send)
  public void sendEmail(@RequestBody Email email) {
    productsString = "";

    email.getProducts().forEach(product -> {
      String code = Integer.toString(product.getCode());
      String qty = Integer.toString(product.getQty());

      productsString = productsString.concat(code + " " + qty + " ");
    });

    EmailService newEmail = new EmailService();

    newEmail.sendEmail(email.getEmail(), "Pedido Avon de " + email.getDealerName() + " | " + email.getDealerCode(),
        productsString);
    newEmail.sendEmail("mateusnascbrito@gmail.com",
        "Pedido Avon de " + email.getDealerName() + " | " + email.getDealerCode(), productsString);
  }
}