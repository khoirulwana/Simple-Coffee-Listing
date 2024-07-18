// Menunggu hingga seluruh DOM content telah dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function () {
  // Mendapatkan referensi ke container list kopi dan tombol-tombol
  const coffeeListContainer = document.getElementById("coffeeList");
  const allProductsButton = document.querySelector(".all-products-btn");
  const availableProductsButton = document.querySelector(".available-btn");

  const buttons = document.querySelectorAll(".sort-button button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Mengatur ulang semua tombol ke warna asli
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "#1b1d1f"; // Warna asli dari CSS
      });
      // Mengubah background tombol yang diklik menjadi abu-abu
      this.style.backgroundColor = "#6f757c";
    });
  });

  let data = []; // Mendefinisikan data di skop yang lebih luas

  // Fetch data kopi dari URL yang disediakan
  fetch(
    "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json"
  )
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData; // Menyimpan data yang di-fetch ke variabel
      displayProducts(data); // Menampilkan semua produk saat halaman dimuat
      // Menambahkan event listener pada tombol "All Products"
      allProductsButton.addEventListener("click", () => {
        console.log("All Products button clicked"); // Debugging
        displayProducts(data);
      });
      // Menambahkan event listener pada tombol "Available Products"
      availableProductsButton.addEventListener("click", () => {
        console.log("Available Products button clicked"); // Debugging
        displayAvailableProducts(data);
      });
      // Aktifkan tombol "All Products" secara default
      allProductsButton.click();
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal memuat data produk kopi.");
    });

  // Fungsi untuk menampilkan semua produk
  function displayProducts(data) {
    coffeeListContainer.innerHTML = ""; // Bersihkan konten sebelumnya
    data.forEach((coffee) => {
      const coffeeElement = createCoffeeElement(coffee);
      coffeeListContainer.appendChild(coffeeElement);
    });
  }

  // Fungsi untuk menampilkan hanya produk yang tersedia
  function displayAvailableProducts(data) {
    coffeeListContainer.innerHTML = ""; // Bersihkan konten sebelumnya
    data
      .filter((coffee) => coffee.available)
      .forEach((coffee) => {
        const coffeeElement = createCoffeeElement(coffee);
        coffeeListContainer.appendChild(coffeeElement);
      });
  }

  // Fungsi untuk membuat elemen HTML untuk setiap produk kopi
  function createCoffeeElement(coffee) {
    const coffeeElement = document.createElement("div");
    coffeeElement.classList.add("coffee");

    // Membuat dan menambahkan elemen gambar, nama, harga, dan rating
    const coffeeImg = createImageElement(coffee.image, coffee.name);
    const namePrice = createNamePriceElement(coffee.name, coffee.price);
    const ratingVotes = createRatingVotesElement(coffee);
    coffeeElement.appendChild(coffeeImg);
    coffeeElement.appendChild(namePrice);
    coffeeElement.appendChild(ratingVotes);

    // Menandai produk sebagai populer jika applicable
    if (coffee.popular) {
      const popularText = document.createElement("p");
      popularText.classList.add("popular-text");
      popularText.textContent = "Popular";
      coffeeElement.appendChild(popularText);
    }

    return coffeeElement;
  }

  // Fungsi pembantu untuk membuat elemen gambar
  function createImageElement(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
  }

  // Fungsi pembantu untuk membuat elemen nama dan harga
  function createNamePriceElement(name, price) {
    const container = document.createElement("div");
    container.classList.add("name-price");

    const nameElement = document.createElement("p");
    nameElement.textContent = name;

    const priceElement = document.createElement("p");
    priceElement.classList.add("price");
    priceElement.textContent = price;

    container.appendChild(nameElement);
    container.appendChild(priceElement);

    return container;
  }

  // Fungsi pembantu untuk membuat elemen rating dan votes
  function createRatingVotesElement(coffee) {
    const container = document.createElement("div");
    container.classList.add("rating-votes");

    const starIcon = document.createElement("img");
    starIcon.classList.add("star-icon");
    starIcon.src = coffee.rating ? "images/Star_fill.svg" : "images/Star.svg";
    container.appendChild(starIcon);

    if (coffee.rating) {
      const ratingText = document.createElement("p");
      ratingText.textContent = coffee.rating;
      const votesText = document.createElement("p");
      votesText.textContent = `(${coffee.votes} votes)`;
      container.appendChild(ratingText);
      container.appendChild(votesText);
    } else {
      const noRatingText = document.createElement("p");
      noRatingText.textContent = "No Ratings";
      noRatingText.style.fontSize = "0.875rem";
      noRatingText.style.color = "#6f757c";
      container.appendChild(noRatingText);
    }

    if (!coffee.available) {
      const soldOutText = document.createElement("p");
      soldOutText.classList.add("sold-out-text");
      soldOutText.textContent = "Sold Out";
      container.appendChild(soldOutText);
      container.style.justifyContent = "space-around";
    }

    return container;
  }
});
