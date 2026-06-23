# Dell Inventory Management System

## Project Overview

A professional mini-project built with HTML, CSS, and vanilla JavaScript. The Dell Inventory Management System uses a JavaScript array to manage product names, display inventory cards, and support live search, add, remove, and availability checks.

## Key Features

- Modern Dell-inspired dashboard design
- Inventory display with status badge
- Total product count and in-stock count
- Add product with validation
- Remove product with feedback
- Check product availability
- Live case-insensitive search with highlight
- Responsive layout for desktop, tablet, and mobile
- Color-coded alert messages (success, error, info)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

## Folder Structure

```
project 2/
├─ dell.html
├─ dell.css
├─ dell.js
└─ README.md
```

## Installation and Run Steps

1. Open the `project 2` folder.
2. Open `dell.html` in any modern web browser.
3. Use the dashboard and controls to manage Dell inventory.

## Screenshots

![Dashboard Screenshot](./screenshots/dashboard.png)

> Replace the placeholder screenshot path if you add a real image.

## Test Cases

1. Display Initial Inventory
   - Open the app.
   - Expected Result: `Dell Inspiron`, `Dell XPS`, `Dell Latitude`, and `Dell Vostro` appear in inventory cards.

2. Add Product
   - Enter a new Dell product name and click `Add`.
   - Expected Result: The product list updates and a green success alert appears.

3. Remove Product
   - Enter an existing product name and click `Remove`.
   - Expected Result: The product is removed and a green success alert appears.

4. Check Existing Product
   - Enter a product name that exists and click `Check`.
   - Expected Result: A success alert shows the product is in stock.

5. Check Non-existing Product
   - Enter a product name that does not exist and click `Check`.
   - Expected Result: A red alert indicates the product is out of stock.

6. Duplicate Product Validation
   - Enter a product name already in inventory (case-insensitive) and click `Add`.
   - Expected Result: A red alert shows `Product already exists.`

7. Search Inventory
   - Type a product name in the search box.
   - Expected Result: Matching cards are highlighted; if none match, a red alert says `No matching product found.`

## Learning Outcomes

- Use JavaScript arrays to store and manage inventory data
- Build clean CRUD operations with `push()`, `splice()`, and `includes()`/`indexOf()`
- Implement reusable functions and clean event handling
- Create responsive UI with professional styling
- Apply input validation and user feedback
- Use case-insensitive search and string normalization
