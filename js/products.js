// Select elements
const addItemBtn = document.querySelector("#add-item-btn");
const popupModal = document.querySelector("#popup-modal");
const cancelBtn = document.querySelector("#cancel-btn");
const saveBtn = document.querySelector("#save-btn");
const productsTable = document.querySelector("#products-table tbody");
const updateModal = document.querySelector("#update-modal");
const updateCancelBtn = document.querySelector("#update-cancel-btn");
const updateSaveBtn = document.querySelector("#update-save-btn");

// Variables to hold the row being updated
let rowToUpdate = null;

// Open Add Item Modal
addItemBtn.addEventListener("click", () => {
    popupModal.classList.remove("hidden");
});

// Close Add Item Modal
cancelBtn.addEventListener("click", () => {
    popupModal.classList.add("hidden");
});

// Close Update Modal
updateCancelBtn.addEventListener("click", () => {
    updateModal.classList.add("hidden");
});

// Save New Product
saveBtn.addEventListener("click", () => {
    const productName = document.querySelector("#product-name").value;
    const productCategory = document.querySelector("#product-category").value;
    const productPrice = document.querySelector("#product-price").value;
    const productStatus = document.querySelector("#product-status").value;

    if (productName && productCategory && productPrice) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${productCategory}</td>
            <td>${productPrice}</td>
            <td>${productStatus}</td>
            <td>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        productsTable.appendChild(newRow);
        popupModal.classList.add("hidden");
        document.querySelector("#product-name").value = "";
        document.querySelector("#product-category").value = "";
        document.querySelector("#product-price").value = "";
        document.querySelector("#product-status").value = "In Stock";
        alert("Product added successfully!");
    } else {
        alert("Please fill out all fields!");
    }
});

// Event delegation for Update and Delete buttons
productsTable.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("update-btn")) {
        // Open the Update Modal
        const row = target.closest("tr");
        rowToUpdate = row;

        const productName = row.cells[0].innerText;
        const productCategory = row.cells[1].innerText;
        const productPrice = row.cells[2].innerText;
        const productStatus = row.cells[3].innerText;

        document.querySelector("#update-product-name").value = productName;
        document.querySelector("#update-product-category").value = productCategory;
        document.querySelector("#update-product-price").value = productPrice;
        document.querySelector("#update-product-status").value = productStatus;

        updateModal.classList.remove("hidden");
    } else if (target.classList.contains("delete-btn")) {
        // Delete the row
        const row = target.closest("tr");
        row.remove();
    }
});

// Save Updated Product
updateSaveBtn.addEventListener("click", () => {
    if (rowToUpdate) {
        const updatedName = document.querySelector("#update-product-name").value;
        const updatedCategory = document.querySelector("#update-product-category").value;
        const updatedPrice = document.querySelector("#update-product-price").value;
        const updatedStatus = document.querySelector("#update-product-status").value;

        if (updatedName && updatedCategory && updatedPrice) {
            rowToUpdate.cells[0].innerText = updatedName;
            rowToUpdate.cells[1].innerText = updatedCategory;
            rowToUpdate.cells[2].innerText = updatedPrice;
            rowToUpdate.cells[3].innerText = updatedStatus;

            updateModal.classList.add("hidden");
            alert("Product updated successfully!");
        } else {
            alert("Please fill out all fields!");
        }
    }
});
