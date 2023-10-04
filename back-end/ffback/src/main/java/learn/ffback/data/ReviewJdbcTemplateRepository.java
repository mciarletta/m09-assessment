package learn.ffback.data;

import learn.ffback.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class ReviewJdbcTemplateRepository implements ReviewRepository {
    private final JdbcTemplate jdbcTemplate;

    public ReviewJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Review> findAllByGameId(int gameId) {
        String sql = """
                select review_id, game_id, title, rating, review_body, date_posted, contributor
                from review
                where game_id = ?;
                """;
        return jdbcTemplate.query(sql, new ReviewMapper(), gameId);
    }

    @Override
    public Review create(Review review) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("review")
                .usingColumns("game_id", "title", "rating",
                        "review_body", "date_posted", "contributor")
                .usingGeneratedKeyColumns("review_id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("game_id", review.getGame_id());
        args.put("title", review.getTitle());
        args.put("rating", review.getRating());
        args.put("review_body", review.getReviewBody());
        args.put("date_posted", review.getDatePosted());
        args.put("contributor", review.getContributor());

        int reviewId = insert.executeAndReturnKey(args).intValue();
        review.setId(reviewId);

        return review;    }

    @Override
    public boolean update(Review review) {
        String sql = """
                update review set
                    game_id = ?,
                    title = ?,
                    rating = ?,
                    review_body = ?,
                    date_posted = ?,
                    contributor = ?
                where review_id = ?;
                """;

        return jdbcTemplate.update(sql,
                review.getGame_id(), review.getTitle(), review.getRating(),
                review.getReviewBody(), review.getReviewBody(), review.getDatePosted(), review.getContributor()
        ) > 0;

    }

    @Override
    public boolean deleteById(int id) {
        return jdbcTemplate.update("delete from review where review_id = ?;", id) > 0;
    }
}
