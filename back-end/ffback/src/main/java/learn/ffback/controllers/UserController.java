package learn.ffback.controllers;

import jakarta.validation.Valid;
import learn.ffback.domain.Result;
import learn.ffback.domain.UserService;
import learn.ffback.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static learn.ffback.controllers.ResultToResponseEntity.toResponseEntity;

//make this a RestController
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})

//add a path
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<String> verifyUser(@RequestBody User user){
        User foundUser = userService.findByNameAndPassword(user.getUserName(), user.getUserPassword());
        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(foundUser.getUserName()+" verified.");

    }

}
