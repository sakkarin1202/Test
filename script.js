document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemCountElement = document.getElementById("cartItemCount");
    const cartIcon = document.getElementById("cartIcon");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItemsContainer = document.getElementById("cartItems");
    const closeCartButton = document.getElementById("closeCart");

    let cartItemCount = 0;

    // Function to update the cart item count
    function updateCartItemCount() {
        cartItemCountElement.textContent = cartItemCount;
    }
// Function to handle adding product to cart
function addToCart(event) {
    // Stop propagating the event to parent elements
    event.stopPropagation();

    // Get product details
    const productTitle = event.target.parentNode.querySelector("h2").textContent;

    // Get product price
    const productPrice = event.target.parentNode.querySelector(".price").textContent;

    // Check if the product is already in the cart
    const existingCartItem = Array.from(cartItemsContainer.children).find(item => {
        const title = item.querySelector('.title').getAttribute('data-title');
        return title === productTitle;
    });

    if (existingCartItem) {
        // If the product is already in the cart, increment its quantity
        const quantityElement = existingCartItem.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
    } else {
        // If the product is not already in the cart, add it
        cartItemCount++;
        updateCartItemCount();

        // Create cart item HTML with remove button
        const cartItemHTML = `
            <div class="cart-item">
                <span class="title" data-title="${productTitle}">${productTitle}</span>
                <span class="price">${productPrice}</span>
                <span class="quantity">1</span>
                <button class="remove-from-cart">Remove</button>
            </div>
        `;

        // Append cart item to cart container
        cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);

        // Attach click event listener to the remove button
        const removeButton = cartItemsContainer.querySelector(".cart-item:last-child .remove-from-cart");
        removeButton.addEventListener("click", removeFromCart);
    }

    // Update the total quantity displayed on the cart icon
    const totalQuantity = Array.from(cartItemsContainer.querySelectorAll('.quantity')).reduce((total, quantityElement) => {
        return total + parseInt(quantityElement.textContent);
    }, 0);
    cartItemCountElement.textContent = totalQuantity;

    // Show success message
    alert("สินค้าถูกเพิ่มลงในตะกร้าแล้ว");

    // Check if cart is empty and show appropriate message
    if (totalQuantity === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
    }
}



    // Function to open the cart
    function openCart() {
        cartOverlay.style.display = "block";
    }

    // Function to close the cart
    function closeCart() {
        cartOverlay.style.display = "none";
    }

    // Function to remove product from cart
   // Function to remove product from cart
   function removeFromCart() {
    const quantityElement = this.parentNode.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        // If the quantity is more than 1, decrement the quantity
        quantity--;
        quantityElement.textContent = quantity;
    } else {
        // If the quantity is 1, remove the entire cart item
        const cartItem = this.parentNode;
        cartItem.remove();
        cartItemCount--;
        updateCartItemCount();
    }

    // Update the total quantity displayed on the cart icon
    const totalQuantity = Array.from(cartItemsContainer.querySelectorAll('.quantity')).reduce((total, quantityElement) => {
        return total + parseInt(quantityElement.textContent);
    }, 0);
    cartItemCountElement.textContent = totalQuantity;

    // Show appropriate message if cart is empty
    if (totalQuantity === 0) {
        alert("ไม่มีสินค้าในตะกร้า");
    }
}



    // Attach click event listeners to all add-to-cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    // Attach click event listener to the cart icon to open cart
    cartIcon.addEventListener("click", openCart);

    // Attach click event listener to the close cart button to close cart
    closeCartButton.addEventListener("click", closeCart);
});
