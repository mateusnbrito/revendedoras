package com.cosmetics.orders.services;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailService {
  public void sendEmail(String to, String subject, String messageContent) {
    String from = "mateusnascbrito@gmail.com";
    Properties properties = System.getProperties();

    properties.put("mail.smtp.host", "smtp.gmail.com");
    properties.put("mail.smtp.port", "465");
    properties.put("mail.smtp.ssl.enable", "true");
    properties.put("mail.smtp.auth", "true");

    Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication("mateusnascbrito@gmail.com", "gzhppcadsnqlwhlm");
      }
    });

    session.setDebug(true);

    try {
      MimeMessage message = new MimeMessage(session);

      message.setFrom(new InternetAddress(from));

      message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

      message.setSubject(subject);

      message.setText(messageContent);

      Transport.send(message);

      System.out.println("Sent message successfully....");
    } catch (MessagingException mex) {
      mex.printStackTrace();
    }
  }
}