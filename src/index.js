const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener("DOMContentLoaded", main);

// Handle ramen image click
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById("ramen-detail");
  const detailImage = ramenDetail.querySelector(".detail-image");
  const detailName = ramenDetail.querySelector(".name");
  const detailRestaurant = ramenDetail.querySelector(".restaurant");
  const detailRating = document.getElementById("rating-display");
  const detailComment = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

// Attach submit listener to the form
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (event) => {
      event.preventDefault();

      const newRamen = {
          name: event.target["name"].value,
          restaurant: event.target["restaurant"].value,
          image: event.target["image"].value,
          rating: event.target["rating"].value,
          comment: event.target["new-comment"].value,
      };

      // Add the new ramen to the #ramen-menu div
      const ramenMenu = document.getElementById("ramen-menu");
      const img = document.createElement("img");
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.addEventListener("click", () => handleClick(newRamen));
      ramenMenu.appendChild(img);

      // Clear the form inputs
      form.reset();
  });
};

// Fetch and display all ramen images
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
      .then((response) => response.json())
      .then((ramens) => {
          const ramenMenu = document.getElementById("ramen-menu");

          ramens.forEach((ramen) => {
              const img = document.createElement("img");
              img.src = ramen.image;
              img.alt = ramen.name;
              img.addEventListener("click", () => handleClick(ramen));
              ramenMenu.appendChild(img);
          });
      })
      .catch((error) => console.error("Error fetching ramens:", error));
};

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}