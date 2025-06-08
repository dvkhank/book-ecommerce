package khanh.book_ecommerce.configs;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Collection;
import java.util.stream.Collectors;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

    private String url = "http://localhost:3000";
    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        //Expose ids
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(EntityType::getJavaType).collect(Collectors.toList()).toArray(Class[]:: new));

        //CORS configuration
        cors.addMapping("/**")
                .allowedOrigins(url)
                .allowedMethods("GET", "POST", "PUT", "DELETE");


    }

}
