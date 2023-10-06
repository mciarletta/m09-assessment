package learn.ffback.domain;

import learn.ffback.data.UserRepository;
import learn.ffback.models.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User findByNameAndPassword(String userName, String userPassword){
        return repository.findByNameAndPassword(userName, userPassword);
    }
}
