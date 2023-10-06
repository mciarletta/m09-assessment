package learn.ffback.controllers;

import jakarta.validation.Valid;
import learn.ffback.domain.Result;
import learn.ffback.domain.ReviewService;
import learn.ffback.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static learn.ffback.controllers.ResultToResponseEntity.toResponseEntity;


//make this a RestController
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})

//add a path
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    //-------------Reads----------------------

    @GetMapping("/{gameId}")
    public List<Review> findBySection(@PathVariable int gameId){
        return reviewService.findReviewsByGameId(gameId);
    }


    //-----------Create-----------------------

    @PostMapping("/create")
    public ResponseEntity<?> createPanel(@RequestBody @Valid Review review, BindingResult result){

        if (result.hasErrors()){
            return new ResponseEntity<>(result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        Result resultNew = reviewService.create(review);
        return toResponseEntity(resultNew, HttpStatus.CREATED);
    }

    //---------Update---------------------------

    @PutMapping("/update/{reviewId}")
    public ResponseEntity<?> updatePanel(@PathVariable int reviewId, @RequestBody Review review){
        //check if the panelId matches the id in the request body
        //Esin noted that you could add a not null check here too
        if (reviewId != review.getId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result result = reviewService.update(review);
        //the toResponseEntity checks these failure scenarios: valid, bad request 400 (like object is banjaxed) and not found 404 the id doesn't exist.
        return toResponseEntity(result, HttpStatus.NO_CONTENT);
    }

    //------------Delete----------------

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePanel(@PathVariable int id){
        Result result = reviewService.deleteById(id);
        return toResponseEntity(result, HttpStatus.NO_CONTENT);
    }

}
