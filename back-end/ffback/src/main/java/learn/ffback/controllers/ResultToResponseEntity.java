package learn.ffback.controllers;

import learn.ffback.domain.ReviewResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResultToResponseEntity {
    public static ResponseEntity<?> toResponseEntity(ReviewResult result, HttpStatus successStatus) {
        return switch (result.getType()) {
            case SUCCESS -> new ResponseEntity<>(result.getReview(), successStatus);
            case INVALID -> new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
            case NOT_FOUND -> new ResponseEntity<>(HttpStatus.NOT_FOUND);
        };
    }
}
