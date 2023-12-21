package com.example.gate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableDiscoveryClient
@SpringBootApplication
public class GateApplication {

	public static void main(String[] args) {
		SpringApplication.run(GateApplication.class, args);

	}

	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(p -> p
						.path("/auth/**")
						.filters(f -> f
								.rewritePath("/auth", "/")
						)
						.uri("lb://AUTH-SERVICE")
				)
				.route(p -> p
						.path("/submission_service/**")
						.filters(f -> f
								.rewritePath("/submission_service", "/")
						)
						.uri("lb://SUBMISSION-SERVICE")
				)
				.route(p -> p
						.path("/problem_service/**")
						.filters(f -> f
								.rewritePath("/problem_service", "/")
						)
						.uri("lb://PROBLEM-MANAGE-SERVICE")
				)
				.route(p -> p
						.path("/rt_service/**")
						.filters(f -> f
								.rewritePath("/rt_service", "/")
						)
							.uri("lb://RT-SERVICE")
				)
				.build();
	}

	@Bean
	CorsWebFilter corsWebFilter() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000","https://client-service-seven.vercel.app"));
		corsConfig.addAllowedMethod("*");
		corsConfig.addAllowedHeader("*");

		UrlBasedCorsConfigurationSource source =
				new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);

		return new CorsWebFilter(source);
	}

}
