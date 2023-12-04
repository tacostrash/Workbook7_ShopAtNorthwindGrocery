const selectOptionDropdown = document.getElementById("searchOption");
const categoryDropdown = document.getElementById("category");
const categoryDropdownContainer = document.getElementById("categoryDropdown");
const productListContainer = document.getElementById("productList");
const searchButton = document.getElementById("searchButton");
const searchForm = document.getElementById("searchForm");

fetch("http://localhost:8081/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.categoryId;
      option.textContent = category.name;
      categoryDropdown.appendChild(option);
    });
  });

selectOptionDropdown.onchange = () => {
  productListContainer.innerHTML = "";

  if (selectOptionDropdown.value === "byCategory") {
    categoryDropdownContainer.style.display = "block";
  } else {
    categoryDropdownContainer.style.display = "none";
  }
};

searchButton.onclick = () => {
  if (selectOptionDropdown.value === "viewAll") {
    fetch("http://localhost:8081/api/products")
      .then((res) => res.json())
      .then((products) => displayProducts(products));


  // } else if (selectOptionDropdown.value === "byCategory") {
  //   const selectedCategoryId = categoryDropdown.value;

    fetch(`http://localhost:8081/api/products?category=${selectedCategoryId}`)
      .then((res) => res.json())
      .then((products) => displayProducts(products, selectedCategoryId));
  }
};

categoryDropdown.onchange = () => {
  productListContainer.innerHTML = "";

  const selectedCategoryId = categoryDropdown.value;

  fetch(`http://localhost:8081/api/products?category=${selectedCategoryId}`)
    .then((res) => res.json())
    .then((products) => displayProducts(products, selectedCategoryId));
};

function displayProducts(products, selectedCategoryId) {
  // Clear existing content in productListContainer
  productListContainer.innerHTML = "";

  const categoryIdToMatch = parseInt(selectedCategoryId);

  // Display each product
  products.forEach((product) => {
    if (product.categoryId === categoryIdToMatch) {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
      <p>${product.productId} - ${product.productName} - $${product.unitPrice}</p>
      <a href="product-details.html?productId=${product.productId}">See details</a>
    `;
      productListContainer.appendChild(productDiv);
    }
  });
}
