document.addEventListener('DOMContentLoaded', function() {
    // Event listener for removing items from cart
    const removeButtons = document.querySelectorAll('.remove-item');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            if (confirm('Are you sure you want to remove this item?')) {
                // Handle removal logic here (e.g., make a request to the server)
                console.log(`Removing item with ID ${itemId}`);
            }
        });
    });

    // Event listener for viewing order details
    const viewOrderButtons = document.querySelectorAll('.view-order-details');
    
    // viewOrderButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const orderId = this.dataset.orderId;
    //         // Logic to load order details can go here (e.g., redirect to order details page)
    //         console.log(`Viewing details for order ID ${orderId}`);
    //     });
    // });
});
