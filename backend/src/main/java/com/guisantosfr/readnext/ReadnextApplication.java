package com.guisantosfr.readnext;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ReadnextApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReadnextApplication.class, args);
	}

}

