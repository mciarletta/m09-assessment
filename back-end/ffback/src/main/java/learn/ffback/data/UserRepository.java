package learn.ffback.data;

import learn.ffback.models.User;

public interface UserRepository {
    User findByNameAndPassword(String userName, String userPassword);
}
