const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");
const form = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

stars.forEach(star => {
    star.addEventListener("click", () => {
        let rating = star.dataset.value;
        ratingInput.value = rating;

        stars.forEach(s => {
            s.classList.remove("active");

            if(s.dataset.value <= rating){
                s.classList.add("active");
            }
        });
    });
});

displayReviews();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const review = {
        name: document.getElementById("name").value,
        rating: document.getElementById("rating").value,
        text: document.getElementById("reviewText").value
    };

    reviews.push(review);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();

    form.reset();

    stars.forEach(s => s.classList.remove("active"));
});

function displayReviews(){

    reviewsList.innerHTML = "";

    let total = 0;

    reviews.forEach((review,index)=>{

        total += Number(review.rating);

        reviewsList.innerHTML += `
        <div class="review">
            <button class="delete-btn" onclick="deleteReview(${index})">Delete</button>

            <h3>${review.name}</h3>

            <p>${"⭐".repeat(review.rating)}</p>

            <p>${review.text}</p>
        </div>
        `;
    });

    let avg = reviews.length
        ? (total / reviews.length).toFixed(1)
        : 0;

    document.getElementById("averageRating").innerHTML =
        avg + " ⭐";
}

function deleteReview(index){

    reviews.splice(index,1);

    localStorage.setItem("reviews",JSON.stringify(reviews));

    displayReviews();
}