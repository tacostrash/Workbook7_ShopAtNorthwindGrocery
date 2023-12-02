



const selectOptionDropdown = document.getElementById("searchOption");
const categoryDropdown = document.getElementById("category");
const categoryDropdownContainer = document.getElementById("categoryDropdown");
const productListContainer = document.getElementById("productList");

fetch("http://localhost:8081/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      categoryDropdown.appendChild(option);
    });
  });

selectOptionDropdown.onchange = () => {
  if (selectOptionDropdown.value === "category") {
    categoryDropdownContainer.style.display = "block";
  } else {
    categoryDropdownContainer.style.display = "none";
  }
  if (selectOptionDropdown.value === "all") {
    fetch("http://localhost:8081/api/products")
      .then((res) => res.json())
      .then((products) => displayProducts(products));
  }
};

categoryDropdown.onchange = () => {
  const selectedCategory = categoryDropdown.value;

  fetch(`http://localhost:8081/api/products?category=${selectedCategory}`)
    .then((res) => res.json())
    .then((products) => displayProducts(products));
};

function displayProducts(products) {
  // Clear existing content in productListContainer
  productListContainer.innerHTML = "";

  // Display each product
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      <p>${product.productId} - ${product.productName} - $${product.unitPrice}</p>
      <a href="product-details.html?productId=${product.productId}">See details</a>
    `;
    productListContainer.appendChild(productDiv);
  });
}
