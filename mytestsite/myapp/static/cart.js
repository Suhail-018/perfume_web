$(document).ready(function() {
    // Update the subtotal when quantity changes
    $('.increase-qty, .decrease-qty').on('click', function() {
        let $item = $(this).closest('.cart-item');
        let $qtyInput = $item.find('.item-qty');
        let quantity = parseInt($qtyInput.val());

        if ($(this).hasClass('increase-qty')) {
            quantity += 1;
        } else if ($(this).hasClass('decrease-qty') && quantity > 1) {
            quantity -= 1;
        }

        $qtyInput.val(quantity);

        // Update the subtotal for this item
        let pricePerItem = parseFloat($item.find('.price').text().replace('AED', ''));
        let newSubtotal = (pricePerItem + quantity).toFixed(2);
        $item.find('.price').text('AED' + newSubtotal);

        // Update the total price
        updateTotalPrice();
    });

    function updateTotalPrice() {
        let total = 0;
        $('.cart-item').each(function() {
            let itemSubtotal = parseFloat($(this).find('.price').text().replace('AED', ''));
            total += itemSubtotal;
        });

        $('.total-price').text('AED' + total.toFixed(2));
    }

    // Remove an item from the cart
    $('.remove-item').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.cart-item').remove();
        updateTotalPrice();
    });
});
