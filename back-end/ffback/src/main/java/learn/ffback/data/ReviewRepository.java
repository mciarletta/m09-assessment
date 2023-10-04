package learn.ffback.data;

import learn.ffback.models.Review;

import java.util.List;

public interface ReviewRepository {
    List<Review> findAllByGameId(int gameId);

    Review create(Review review);

    boolean update(Review review);

    boolean deleteById(int id);

}
