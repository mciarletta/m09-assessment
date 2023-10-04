package learn.ffback.controllers;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalErrHandler {

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<String> handleHttpMessageConversionException(HttpMessageConversionException ex) {
        //this might happen from a JSON parsing error
        return new ResponseEntity<String>("Check yourself(JSON) before you wreck yourself", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatchException(TypeMismatchException ex) {
        //bad type in parameter
        return new ResponseEntity<String>("Something's wrong with the G-Diffuser.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<String> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        return new ResponseEntity<String>("These are not the droids you are looking for...", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity<String>("Something went wrong on our end :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
