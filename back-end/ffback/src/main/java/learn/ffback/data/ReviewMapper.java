package learn.ffback.data;

import learn.ffback.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {
    @Override
    public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
        Review review = new Review();
        review.setId(rs.getInt("review_id"));
        review.setGame_id(rs.getInt("game_id"));
        review.setTitle(rs.getString("title"));
        review.setRating(rs.getBigDecimal("rating"));
        review.setReviewBody(rs.getString("review_body"));
        review.setDatePosted(rs.getDate("date_posted").toLocalDate());
        review.setContributor(rs.getString("contributor"));
        return review;
    }
}
