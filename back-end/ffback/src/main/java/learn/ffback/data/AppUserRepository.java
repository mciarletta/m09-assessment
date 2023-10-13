package learn.ffback.data;


import learn.ffback.models.AppUser;

public interface AppUserRepository {

    AppUser findByUsername (String username);

    AppUser create(AppUser user);

    boolean update(AppUser user);

    boolean delete(AppUser user);
}
