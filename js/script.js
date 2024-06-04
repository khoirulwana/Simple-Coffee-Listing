document.addEventListener("DOMContentLoaded", function () {
  const coffeeListContainer = document.getElementById("coffeeList");

  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Loop melalui setiap objek kopi dalam data
      data.forEach((coffee) => {
        // Membuat elemen baru untuk setiap kopi
        const coffeeElement = document.createElement("div");
        coffeeElement.classList.add("coffee");

        const namePrice = document.createElement("div");
        namePrice.classList.add("name-price");

        const ratingVotes = document.createElement("div");
        ratingVotes.classList.add("rating-votes");

        const starIcon = document.createElement("img");
        starIcon.classList.add("star-icon");
        starIcon.src = "/images/Star.svg";
        starIcon.alt = "Star Icon";
        ratingVotes.appendChild(starIcon);

        // Menambahkan informasi kopi ke dalam elemen baru
        coffeeElement.innerHTML = `
        <img src="${coffee.image}" alt="${coffee.name}" style="max-width: 100%;">   
        `;

        namePrice.innerHTML = `
        <h2>${coffee.name}</h2>
        <p>${coffee.price}</p>
        `;

        ratingVotes.innerHTML = `
        <p>${coffee.rating}</p>
        <p>(${coffee.votes} votes)</p>
        `;

        // Menambahkan elemen kopi ke dalam container daftar kopi
        coffeeElement.appendChild(namePrice);
        coffeeElement.appendChild(ratingVotes);
        coffeeListContainer.appendChild(coffeeElement);
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
});
