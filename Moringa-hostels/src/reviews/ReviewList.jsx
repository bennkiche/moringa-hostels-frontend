import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, setReview }) {
    return (
        <div id="container">
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <ReviewItem
                        key={review.id || `review-${index}`} // Ensure unique keys
                        review={review} // Pass entire review object
                        setReview={setReview}
                    />
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
}

export default ReviewList;
