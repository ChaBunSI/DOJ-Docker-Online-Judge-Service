package com.chabunsi.problemmanage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ProblemManageApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProblemManageApplication.class, args);
	}

}
