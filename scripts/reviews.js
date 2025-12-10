const reviewsList = document.getElementById("reviews-list");
const filterRating = document.getElementById("filterRating");
const reviewForm = document.getElementById("reviewForm");
const reviewName = document.getElementById("reviewName");
const reviewEmail = document.getElementById("reviewEmail");
const reviewBody = document.getElementById("reviewBody");
const reviewRating = document.getElementById("reviewRating");

let allReviews = [];
let localReviews = JSON.parse(localStorage.getItem("localReviews")) || [];

async function loadReviews() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json());
  const sampleNames = ["Alex", "Bob", "Carla", "Danny", "Emanuel", "Fernando", "Gregorio", "Hannah", "Ivan", "Julia"];
  
  allReviews = data.slice(0, 10).map((r, index) => {
    const name = sampleNames[index % sampleNames.length];
    return {
      userId: r.userId,
      name: name,
      email: `${name.toLowerCase()}${r.userId}@example.com`,
      body: r.body,
      rating: Math.floor(Math.random() * 5) + 1
    };
  });
  
  renderReviews();
  showRatingFilter();
}

function showRatingFilter() {
  const ratings = [1,2,3,4,5];
  filterRating.innerHTML = `<option value="all">All Ratings</option>` + ratings.map(r => `<option value="${r}">${r} ⭐</option>`).join("");
}

function renderReviews() {
  const selectedRating = filterRating.value;
  let reviewsToShow = [...allReviews, ...localReviews];
  
  if(selectedRating !== "all") {
    reviewsToShow = reviewsToShow.filter(r => (r.rating) == selectedRating);
  }

  reviewsList.innerHTML = "";
  if(reviewsToShow.length === 0){
    reviewsList.innerHTML = "<p>No reviews found.</p>";
    return;
  }

  reviewsToShow.forEach(r => {
    let stars = "⭐".repeat(r.rating) + "☆".repeat(5 - r.rating);
    reviewsList.innerHTML += `
      <div class="review-card">
        <h3>${r.name}</h3>
        <p><strong>Email:</strong> ${r.email}</p>
        <p>${r.body}</p>
        <p>${stars}</p>
      </div>
    `;
  });
}

function addLocalReview(e) {
  e.preventDefault();
  const newReview = {
    localId: Date.now(),
    name: reviewName.value,
    email: reviewEmail.value,
    body: reviewBody.value,
    rating: parseInt(reviewRating.value)
  };
  localReviews.push(newReview);
  localStorage.setItem("localReviews", JSON.stringify(localReviews));
  reviewForm.reset();
  renderReviews();
}

filterRating.addEventListener("change", renderReviews);
reviewForm.addEventListener("submit", addLocalReview);

loadReviews();