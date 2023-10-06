package learn.ffback.data;

import learn.ffback.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public User findByNameAndPassword(String userName, String userPassword) {
        final String sql = "select user_id, user_name, user_password " +
                "from users " +
                "where user_name = ? " +
                "and user_password = ?";
        return jdbcTemplate.query(sql, new UserMapper(), userName, userPassword).stream().findFirst().orElse(null);

    }
}
