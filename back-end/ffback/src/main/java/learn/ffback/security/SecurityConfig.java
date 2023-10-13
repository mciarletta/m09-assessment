package learn.ffback.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    // SecurityFilterChain allows configuring
    // web based security for specific http requests.

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfiguration) throws Exception{
        // we're not using HTML forms in our app
        //so disable CSRF (Cross Site Request Forgery)
        http.csrf().disable();

        // this configures Spring Security to allow
        //CORS related requests (such as preflight checks)
        http.cors();

        // the order of the antMatchers() method calls is important
        // as they're evaluated in the order that they're added
        http.authorizeRequests()
                //add the authentication path and then our requests that we want to authorize
                .antMatchers(HttpMethod.POST,"/authenticate").permitAll()
                //for account creation
                .antMatchers(HttpMethod.POST,"/create_account").permitAll()
                //refresh the tokens
                .antMatchers(HttpMethod.POST,"/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET, "/api/review/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/review/create").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.PUT, "/api/review/update/*").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.DELETE, "/api/review/delete/*").hasAnyAuthority("ADMIN", "USER")
                //if we get to this point, let's deny all requests
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfiguration), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    //validate the user's credentials using the authentication manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
