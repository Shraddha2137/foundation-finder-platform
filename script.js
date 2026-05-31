async function searchFoundation() {
  let query = document.getElementById("search").value;
  let url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation&brand=${query}`;
  let res = await fetch(url);
  let data = await res.json();
  let results = document.getElementById("results");
  results.innerHTML = "";

  if (data.length > 0) {
    data.forEach(item => {
      let card = `<div class="foundation-card">
                    <img src="${item.image_link}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Brand: ${item.brand}</p>
                    <p>Price: ${item.price} ${item.price_sign || ''}</p>
                    <button class="favorite-btn" onclick="addFavorite('${item.name}')">❤️ Add to Favorites</button>
                  </div>`;
      results.innerHTML += card;
    });
  } else {
    results.innerHTML = "<p>No foundation shades found.</p>";
  }
}

function addFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(name)) {
    favorites.push(name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${name} added to favorites!`);
  }
}
