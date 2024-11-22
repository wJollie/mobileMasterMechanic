async function fetchReviews() {
  try {
    const response = await fetch("/api/reviews");
    const reviews = await response.json();

    if (reviews.length) {
      displayReviews(reviews);
    } else {
      document.getElementById("review-list").innerHTML =
        "<p>No reviews found.</p>";
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    document.getElementById("review-list").innerHTML =
      "<p>Failed to load reviews.</p>";
  }
}

function displayReviews(reviews) {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = ""; // Clear existing reviews

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <h3>${review.author_name} (${review.rating} ⭐)</h3>
      <p>${review.text}</p>
      <small>Reviewed on: ${new Date(
        review.time * 1000
      ).toLocaleDateString()}</small>
    `;
    reviewList.appendChild(div);
  });
}

// Initialize Reviews on Page Load
fetchReviews();
