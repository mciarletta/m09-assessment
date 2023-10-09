package learn.ffback.models;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public class Review {
    private int id;
    @NotNull
    @Min(value = 0)
    private int game_id;
    @NotNull
    @NotBlank
    private String title;
    @NotNull
   @DecimalMax(value = "10")
    @DecimalMin(value = "0")
    private BigDecimal rating;
    @NotNull
    @NotBlank
    private String reviewBody;
    @NotNull
    @PastOrPresent
    private LocalDate datePosted;

    @NotNull
    private String contributor;

    public Review() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGame_id() {
        return game_id;
    }

    public void setGame_id(int game_id) {
        this.game_id = game_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getReviewBody() {
        return reviewBody;
    }

    public void setReviewBody(String reviewBody) {
        this.reviewBody = reviewBody;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    public String getContributor() {
        return contributor;
    }

    public void setContributor(String contributor) {
        this.contributor = contributor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return id == review.id && game_id == review.game_id && Objects.equals(title, review.title) && Objects.equals(rating, review.rating) && Objects.equals(reviewBody, review.reviewBody) && Objects.equals(datePosted, review.datePosted) && Objects.equals(contributor, review.contributor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, game_id, title, rating, reviewBody, datePosted, contributor);
    }
}
