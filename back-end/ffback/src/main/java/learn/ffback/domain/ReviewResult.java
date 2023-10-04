package learn.ffback.domain;

import learn.ffback.models.Review;

import java.util.ArrayList;
import java.util.List;

public class ReviewResult {
    private final ArrayList<String> messages = new ArrayList<>();
    private Review review;

    //set the result type
    private ReviewResultType type = ReviewResultType.SUCCESS;

    public List<String> getErrorMessages() {
        return new ArrayList<>(messages);
    }

    public void addErrorMessage(String message) {
        //set the type to invalid
        this.type = ReviewResultType.INVALID;
        messages.add(message);
    }

    public void addErrorMessage(String format, Object... args) {
        messages.add(String.format(format, args));
        //set the type to invalid
        this.type = ReviewResultType.INVALID;
    }

    /**
     * Sets the result to not found if there was a case where a valid search
     * ends up with nothing
     */
    public void setNotFound(){
        this.type = ReviewResultType.NOT_FOUND;
    }

    public ReviewResultType getType() {
        return type;
    }

    public boolean isSuccess() {
        // If an error message exists, the operation failed.
        return type == ReviewResultType.SUCCESS;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }
}
