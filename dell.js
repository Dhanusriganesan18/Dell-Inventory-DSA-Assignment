// Initial inventory array of Dell products.
var products = [
  "Dell Inspiron",
  "Dell XPS",
  "Dell Latitude",
  "Dell Vostro"
];

var productListElement = document.getElementById("product-list");
var statusMessageElement = document.getElementById("status-message");
var totalCountElement = document.getElementById("total-count");
var addProductBtn = document.getElementById("add-product-btn");
var removeProductBtn = document.getElementById("remove-product-btn");
var checkProductBtn = document.getElementById("check-product-btn");
var searchProductInput = document.getElementById("search-product");
var newProductInput = document.getElementById("new-product");
var removeProductInput = document.getElementById("remove-product");
var checkProductInput = document.getElementById("check-product");

// Test Case 1: Display Initial Inventory
// Test Case 2: Add Product
// Test Case 3: Remove Product
// Test Case 4: Check Existing Product
// Test Case 5: Check Non-existing Product
// Test Case 6: Duplicate Product Validation

function normalizeProductName(value) {
  if (!value) {
    return "";
  }
  return value.toString().trim().toLowerCase();
}

function getLevenshteinDistance(a, b) {
  var matrix = [];

  for (var i = 0; i <= a.length; i += 1) {
    matrix[i] = [i];
  }
  for (var j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (var i = 1; i <= a.length; i += 1) {
    for (var j = 1; j <= b.length; j += 1) {
      var cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function getFuzzyMatchProduct(query) {
  var normalizedQuery = normalizeProductName(query);
  if (normalizedQuery === "") {
    return null;
  }

  var bestMatch = null;
  var bestScore = Infinity;

  for (var i = 0; i < products.length; i += 1) {
    var productValue = products[i];
    var normalizedProduct = normalizeProductName(productValue);

    if (normalizedProduct === normalizedQuery) {
      return productValue;
    }

    if (normalizedProduct.indexOf(normalizedQuery) !== -1 || normalizedQuery.indexOf(normalizedProduct) !== -1) {
      return productValue;
    }

    var distance = getLevenshteinDistance(normalizedQuery, normalizedProduct);
    if (distance < bestScore) {
      bestScore = distance;
      bestMatch = productValue;
    }
  }

  return bestScore <= 2 ? bestMatch : null;
}

function getSearchMatches(query) {
  var normalizedQuery = normalizeProductName(query);
  if (normalizedQuery === "") {
    return [];
  }
  var matches = [];
  for (var i = 0; i < products.length; i += 1) {
    if (normalizeProductName(products[i]).indexOf(normalizedQuery) !== -1) {
      matches.push(products[i]);
    }
  }
  return matches;
}

function findProductIndex(productName) {
  var productMatch = getFuzzyMatchProduct(productName);
  if (productMatch === null) {
    return -1;
  }
  return products.indexOf(productMatch);
}

function updateDashboard() {
  totalCountElement.textContent = products.length;
}

function showStatus(message, type) {
  statusMessageElement.textContent = message;
  statusMessageElement.className = "status-message";
  if (type === "success") {
    statusMessageElement.classList.add("success");
  } else if (type === "error") {
    statusMessageElement.classList.add("error");
  } else {
    statusMessageElement.classList.add("info");
  }
}

function buildProductCard(productName, highlighted) {
  var item = document.createElement("li");
  item.className = "product-card";
  if (highlighted) {
    item.classList.add("highlight");
  }

  var nameElement = document.createElement("p");
  nameElement.className = "product-title";
  nameElement.textContent = productName;

  var statusBadge = document.createElement("span");
  statusBadge.className = "status-badge";
  statusBadge.textContent = "In Stock";

  item.appendChild(nameElement);
  item.appendChild(statusBadge);
  return item;
}

function displayInventory(searchQuery) {
  var query = normalizeProductName(searchQuery);
  productListElement.innerHTML = "";

  if (products.length === 0) {
    var emptyItem = document.createElement("li");
    emptyItem.textContent = "No products found in inventory.";
    emptyItem.className = "empty-state";
    productListElement.appendChild(emptyItem);
    return;
  }

  var matchedProducts = getSearchMatches(searchQuery);
  var fuzzyMatch = getFuzzyMatchProduct(searchQuery);

  for (var i = 0; i < products.length; i += 1) {
    var productName = products[i];
    var normalizedProductName = normalizeProductName(productName);
    var isMatch = false;

    if (query !== "" && normalizedProductName.indexOf(query) !== -1) {
      isMatch = true;
    }

    if (!isMatch && fuzzyMatch === productName) {
      isMatch = true;
    }

    if (!isMatch && matchedProducts.indexOf(productName) !== -1) {
      isMatch = true;
    }

    var card = buildProductCard(productName, isMatch);
    productListElement.appendChild(card);
  }
}

function addProduct() {
  var newName = newProductInput.value;
  var normalizedName = normalizeProductName(newName);

  if (normalizedName === "") {
    showStatus("Please enter a product name.", "error");
    return;
  }

  if (findProductIndex(newName) !== -1) {
    showStatus("Product already exists.", "error");
    return;
  }

  products.push(newName.trim());
  newProductInput.value = "";
  updateDashboard();
  displayInventory(searchProductInput.value);
  showStatus(newName.trim() + " added successfully.", "success");
}

function removeProduct() {
  var removeName = removeProductInput.value;
  var normalizedName = normalizeProductName(removeName);

  if (normalizedName === "") {
    showStatus("Please enter a product name.", "error");
    return;
  }

  var productIndex = findProductIndex(removeName);
  if (productIndex === -1) {
    showStatus("Product not found.", "error");
    return;
  }

  var removedName = products.splice(productIndex, 1)[0];
  removeProductInput.value = "";
  updateDashboard();
  displayInventory(searchProductInput.value);
  showStatus(removedName + " removed successfully.", "success");
}

function checkAvailability() {
  var checkName = checkProductInput.value;
  var normalizedName = normalizeProductName(checkName);

  if (normalizedName === "") {
    showStatus("Please enter a product name.", "error");
    return;
  }

  var productIndex = findProductIndex(checkName);
  if (productIndex !== -1) {
    var matchedProduct = products[productIndex];
    showStatus(matchedProduct + " is in stock.", "success");
  } else {
    showStatus(checkName.trim() + " is out of stock.", "error");
  }
}

function handleSearch() {
  var query = searchProductInput.value;
  var normalizedQuery = normalizeProductName(query);
  var matches = getSearchMatches(query);
  var fuzzyMatch = getFuzzyMatchProduct(query);

  displayInventory(query);

  if (normalizedQuery === "") {
    showStatus("Search inventory by product name.", "info");
    return;
  }

  if (matches.length > 1) {
    showStatus("Matching products highlighted.", "info");
    return;
  }

  if (matches.length === 1) {
    showStatus(matches[0] + " is in stock.", "success");
    return;
  }

  if (fuzzyMatch) {
    showStatus(fuzzyMatch + " is in stock.", "success");
    return;
  }

  showStatus("No matching product found.", "error");
}

addProductBtn.addEventListener("click", addProduct);
removeProductBtn.addEventListener("click", removeProduct);
checkProductBtn.addEventListener("click", checkAvailability);
searchProductInput.addEventListener("input", handleSearch);

updateDashboard();
displayInventory();
showStatus("Ready to manage Dell inventory.", "info");
