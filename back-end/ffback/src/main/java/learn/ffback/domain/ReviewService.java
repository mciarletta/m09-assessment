package learn.ffback.domain;

import learn.ffback.data.ReviewRepository;
import learn.ffback.models.Review;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@Service
public class ReviewService {

    private final ReviewRepository repository;
    private final Validator validator;


    public ReviewService(ReviewRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public List<Review> findReviewsByGameId(int gameId){
        return repository.findAllByGameId(gameId);
    }

    public Result<Review> create(Review review) {
        Result<Review> result = validate(review);

        if (review != null && review.getId() > 0) {
            result.addErrorMessage("Review `id` should not be set.");
        }

        if (result.isSuccess()) {
            review = repository.create(review);
            result.setPayload(review);
        }

        return result;
    }

    public Result<Review> update(Review review) {
        Result<Review> result = validate(review);

        if (review != null && review.getId() <= 0) {
            result.addErrorMessage("SolarPanel `id` should be set.");
        }

        if (result.isSuccess()) {
            boolean success = repository.update(review);
            if (!success) {
                result.addErrorMessage(String.format("Could not update panel id %s.", review.getId()));
                //if the panel couldn't be found then we would reach this scenario and should update the type of the result
                result.setNotFound();
            }
        }

        return result;
    }

    public Result<Review> deleteById(int id) {
        Result<Review> result = new Result<Review>();
        boolean success = repository.deleteById(id);
        if (!success) {
            result.addErrorMessage(String.format("Could not delete panel id %s.", id));
            result.setNotFound();

        }
        return result;
    }

    private Result<Review> validate(Review review) {
        Result<Review> result = new Result<Review>();

        if (review == null){
            result.addErrorMessage("Review cannot be null.");
            return result;
        }

        Set<ConstraintViolation<Review>> violations = validator.validate(review);

        if (!violations.isEmpty()){
            for (ConstraintViolation<Review> violation: violations){
                result.addErrorMessage(violation.getMessage());
            }
            return result;
        }



        return result;
    }
}

