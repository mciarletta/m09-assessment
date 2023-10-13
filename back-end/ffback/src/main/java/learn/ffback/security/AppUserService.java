package learn.ffback.security;


import learn.ffback.data.AppUserRepository;
import learn.ffback.domain.Result;
import learn.ffback.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<AppUser> create(String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        try {
            appUser = repository.create(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.addErrorMessage("The provided username already exists");
        }

        return result;
    }

    /**
     * Updates user information.
     *
     * @param user the user to be updated.
     *             The password should have been entered by the user, not pulled from the db
     * @return the updated AppUser payloaded in a result  info or an error message in the result
     */
    public Result<AppUser> update(AppUser user){
        //a bit of validation
        Result<AppUser> result = validate(user.getUsername(), user.getPassword());
        if (!result.isSuccess()) {
            return result;
        }

        //encode the password
        user.setPassword(encoder.encode(user.getPassword()));

        if (user != null && user.getAppUserId() <= 0) {
            result.addErrorMessage("User `id` should be set.");
        }

        if (result.isSuccess()) {
            boolean success = repository.update(user);
            if (!success) {
                //if the user couldn't be found then we would reach this scenario and should update the type of the result
                result.addErrorMessage(String.format("Could not update user %s.", user.getUsername()));
            }
        }

        return result;

    }

    public Result<AppUser> delete(AppUser user){
        Result<AppUser> result = new Result<>();
        boolean success = repository.delete(user);
        if (!success) {
            result.addErrorMessage(String.format("Could not delete user %s.", user.getUsername()));
        }
        return result;
    }

    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addErrorMessage("username is required");
            return result;
        }

        if (password == null) {
            result.addErrorMessage("password is required");
            return result;
        }

        if (username.length() > 50) {
            result.addErrorMessage("username must be less than 50 characters");
        }

        if (!isValidPassword(password)) {
            result.addErrorMessage(
                    "password must be at least 8 character and contain a digit," +
                            " a lower-case letter, and upper-case letter, and a non-digit/non-letter");
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int lowerCaseLetters = 0;
        int upperCaseLetters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c) && Character.isUpperCase(c)) {
                upperCaseLetters++;
            } else if (Character.isLetter(c) && !Character.isUpperCase(c)) {
                lowerCaseLetters++;
            } else {
                others++;
            }
        }

        return digits > 0 && lowerCaseLetters > 0 && upperCaseLetters > 0 && others > 0;
    }
}
