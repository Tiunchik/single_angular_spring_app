package org.drive;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.HttpConnectionFactory;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.SecuredRedirectHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.jetty.JettyServerCustomizer;
import org.springframework.boot.web.embedded.jetty.JettyServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(org.drive.ServerApplication.class, args);
	}

	@Bean
	public ConfigurableServletWebServerFactory webServerFactory() {
		JettyServletWebServerFactory factory = new JettyServletWebServerFactory();
		factory.addServerCustomizers(new JettyServerCustomizer() {
			@Override
			public void customize(Server server) {
				final HttpConnectionFactory httpConnectionFactory = server.getConnectors()[0].getConnectionFactory(HttpConnectionFactory.class);

				final ServerConnector httpConnector = new ServerConnector(server, httpConnectionFactory);
				httpConnector.setPort(8080 /* HTTP */);
				server.addConnector(httpConnector);

				final HandlerList handlerList = new HandlerList();
				handlerList.addHandler(new SecuredRedirectHandler());
				for(Handler handler : server.getHandlers())
					handlerList.addHandler(handler);
				server.setHandler(handlerList);
			}
		});
		return factory;
	}

}
