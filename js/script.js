document.addEventListener("DOMContentLoaded", function () {
  const coffeeListContainer = document.getElementById("coffeeList");

  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Loop melalui setiap objek kopi dalam data
      data.forEach((coffee) => {
        // Membuat elemen baru untuk setiap kopi
        const coffeeElement = document.createElement("div");
        coffeeElement.classList.add("coffee");

        // Menambahkan informasi kopi ke dalam elemen baru
        coffeeElement.innerHTML = `
            <h2>${coffee.name}</h2>
            <p>Harga: ${coffee.price}</p>
            <p>Rating: ${coffee.rating}</p>
            <img src="${coffee.image}" alt="${coffee.name}" style="max-width: 100%;">
          `;

        // Menambahkan elemen kopi ke dalam container daftar kopi
        coffeeListContainer.appendChild(coffeeElement);
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
});
