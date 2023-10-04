package learn.ffback.domain;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import learn.ffback.data.ReviewRepository;
import learn.ffback.models.Review;
import org.springframework.stereotype.Service;

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

    public ReviewResult create(Review review) {
        ReviewResult result = validate(review);

        if (review != null && review.getId() > 0) {
            result.addErrorMessage("Review `id` should not be set.");
        }

        if (result.isSuccess()) {
            review = repository.create(review);
            result.setReview(review);
        }

        return result;
    }

    public ReviewResult update(Review review) {
        ReviewResult result = validate(review);

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

    public ReviewResult deleteById(int id) {
        ReviewResult result = new ReviewResult();
        boolean success = repository.deleteById(id);
        if (!success) {
            result.addErrorMessage(String.format("Could not delete panel id %s.", id));
            result.setNotFound();

        }
        return result;
    }

    private ReviewResult validate(Review review) {
        ReviewResult result = new ReviewResult();

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

