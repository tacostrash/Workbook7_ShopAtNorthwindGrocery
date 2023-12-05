// productDetails.js

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('productId');

// Check if productId is present
if (!productId) {
  // Redirect to the home page if productId is not specified
  window.location.href = 'index.html';
}

// Fetch all product details based on productId
fetch(`http://localhost:8081/api/products/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    // Create a div to hold the product details
    const productDetailsContainer = document.querySelector(".product-details-container");

    // Create elements for each property
    for (const key in product) {
      const value = product[key];

      // Create a div element for each property
      const propertyDiv = document.createElement("div");
      propertyDiv.classList.add("product-item");

      // Create a span for the property name
      const propertyNameSpan = document.createElement("span");
      propertyNameSpan.classList.add("property-name");
      propertyNameSpan.textContent = `${key}:`;

      // Create a span for the property value
      const propertyValueSpan = document.createElement("span");
      propertyValueSpan.classList.add("property-value");
      propertyValueSpan.textContent = value;

      // Append the spans to the property div
      propertyDiv.appendChild(propertyNameSpan);
      propertyDiv.appendChild(propertyValueSpan);

      // Append the property div to the product details container
      productDetailsContainer.appendChild(propertyDiv);
    }

    // Add a link to go back to the home page
    const detailsLink = document.createElement("div");
    detailsLink.classList.add("details-link");
    
    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.textContent = "Back to Home";

    detailsLink.appendChild(homeLink);
    productDetailsContainer.appendChild(detailsLink);
  })
  .catch((error) => console.error("Error fetching product details:", error));
