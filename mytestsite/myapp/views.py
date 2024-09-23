from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.models import User
# from . import models
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
import time
from django.http import JsonResponse
from .models import Products, Cart, CartItems, Order, OrderItems # Assuming these models exist
from decimal import Decimal
import re
import json

# Create your views here.

def main(request):
    user = request.user 
    cart = Cart.objects.get(userid=user)    
    return render(request, 'main.html',  {'cart': cart, 'user':user})


def signup(request):

    # if request.method == "POST":
    #     username = request.POST['username']
    #     email = request.POST['email']

    #     myuser= User.objects.create_user(username=username, email=email)
    #     myuser.save()

    #     messages.success(request, "Your Account has been successfully created.")
    #     return redirect('http://127.0.0.1:8000/')
        
        

    # return render(request, 'form.html')   
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account was created successfully!')
            # time.sleep(3)
            return redirect('http://127.0.0.1:8000/login')
        else:
             messages.error(request, 'There was an error in your signup details.')

    else:
        form = UserCreationForm()

    return render(request, 'form.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, 'You are now logged in.')
                return redirect('http://127.0.0.1:8000')
            else:
                messages.error(request, 'Invalid username or password.')

    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


def user_logout(request):
    logout(request)
    messages.success(request, 'You have successfully logged out.')
    return redirect('http://127.0.0.1:8000/login')

# @login_required
def home_view(request):
    return render(request, 'home.html')
def about(request):
    return render(request, 'about.html')
# Add to Cart / View Cart function
def viewcart(request):
    user = request.user  # Get the logged-in user

    if request.method == "POST":

        if not user.is_authenticated:
            return JsonResponse({'error': 'You need to be logged in to add items to the cart.'}, status=401)

        # return JsonResponse({'messages':'successful'})
        # # Extract product details from POST request
        # product_name = request.POST.get('name')
        # product_pricee = request.POST.get('price')
        # product_imgsrc = request.POST.get('imgsrc')  # Not used directly, but can be stored in CartItem

        data = json.loads(request.body)
        name = data.get('name')
        pricee = data.get('price')
        imgsrc = data.get('imgsrc')

        
            # Make sure all necessary data is present
        if not name or not pricee or not imgsrc:
            return JsonResponse({'error': 'Missing data'}, status=400)
       
        # if product_pricee is None:
                # return JsonResponse({'error': 'Price is missing'}, status=400)

        clean_price_str = re.sub(r'[^\d.]', '', pricee)  # '2046'
        product_price = Decimal(clean_price_str)
        desc ="nice elegant, exclusive perfume"
        

        try:
        #     # Fetch or create the cart for the user
            cart, created = Cart.objects.get_or_create(userid=user)
           
            if not Products.objects.filter(name=name).exists():
        #     # Fetch the product from the database (assuming you have a Product model)
                Products.objects.create(name=name, price=product_price, description=desc, imgsrc= imgsrc)
            
            product = Products.objects.get(name=name)
        #     # Add the product to the cart (assuming a CartItem model that links Product and Cart)
            cart_item, created = CartItems.objects.get_or_create(product=product, Cartid=cart)
            
            cart_item.quantity += 1  # Increment quantity if item already exists in cart
            
            cart_item.save()
            # if created:
            #     cart_item.quantity = 1  # Set initial quantity if it's a new item
            # else:
            num_of_item = cart.num_of_items

        #     # Return a success response
            return JsonResponse(num_of_item, safe=False)

        except Products.DoesNotExist:
        #     # Handle case where product is not found
            return JsonResponse({'error': 'Product not found!'}, status=404)
            

    elif request.method == "GET":
        # Render the cart page with all cart items for the user
        
        if not user.is_authenticated:
            return JsonResponse({'error': 'You need to be logged in to add items to the cart.'}, status=401)
        
        try:
            cart = Cart.objects.get(userid=user)
            cart_items = CartItems.objects.filter(Cartid=cart)
        except Cart.DoesNotExist:
            cart_items = []  # If no cart exists, start with an empty list

        # Render the cart HTML template and pass the cart items
        return render(request, 'cart.html', {'cart_items': cart_items, 'cart': cart, 'user': user})

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def remove_from_cart(request, product_id):
    user = request.user 
    cart = Cart.objects.get(userid=user)    
    product = Products.objects.get(id=product_id)
    cart_item = CartItems.objects.get(product=product, Cartid=cart)
    cart_item.delete()
    return redirect('cart:view_cart')

def confirm_payment(request):
    # cart = Cart.objects.get(id=pk)
    user = request.user 
    cart = Cart.objects.get(userid=user) 
    cart.completed = True
    cart.save()
    messages.success(request, "Payment made successfully")
    return redirect('http://127.0.0.1:8000/main')

def search_feature(request):
    # Check if the request is a post request.
    if request.method == "POST":
        # Retrieve the search query entered by the user
        search_query = request.POST.get('search_query')
        # Filter your model by the search query
        Product = Products.objects.filter(name__icontains=search_query)
        print(Product)
        return render(request, 'search.html', {'query':search_query, 'products':Product})
    else:
        return render(request, 'search.html',{})


def orderdone(request):
    user=request.user

    order=Order.objects.create(userid=user)
    cart = Cart.objects.get(userid=user) 
    items = cart.CartItems.all()
    # for item in items:
    #     # Logic to add each item to the order (depends on your OrderItems model)
    #     # For example:
    #     if not OrderItems.objects.filter(orderid=orders, productid=item.product).exists():
    #         OrderItems.objects.create(orderid=orders, productid=item.product, Quantity=item.quantity, price=item.product.price)

    #     else:
    #         order_item=OrderItems.objects.filter(orderid=orders, productid=item.product)
    #         order_item.quantity += item.quantity
    #         order_item.save()

    # for item in items:
    #     # Check if the order item already exists
    #     order_item, created = OrderItems.objects.get_or_create(
    #         orderid=orders,
    #         productid=item.product,  # Adjust if 'productid' is not the correct field name
    #         defaults={'Quantity': item.quantity, 'price': item.product.price}
    #     )

    #     if not created:
    #         # If the order item already exists, update its quantity
    #         order_item.Quantity += item.quantity  # Ensure 'Quantity' matches your field name
    #         order_item.save()


    processed_items = set()  # Set to keep track of processed product IDs

    for item in items:
        product_id = item.product.id  # Get the product ID

        # If this product has not been processed yet, continue
        if product_id not in processed_items:
            processed_items.add(product_id)  # Mark this product as processed

            # Check if the product already exists in the order
            if not OrderItems.objects.filter(orderid=order, productid=item.product).exists():
                # Create a new OrderItem if it doesn't exist
                OrderItems.objects.create(orderid=order, productid=item.product, 
                                          Quantity=item.quantity, price=item.product.price)
            else:
                # If the product exists, update the quantity
                order_item = OrderItems.objects.get(orderid=order, productid=item.product)
                order_item.Quantity += item.quantity
                order_item.save()

    cart.completed = True
   
    for item in items:
        item.delete()

    cart.save()
    orders=user.orders.all()
    # new_cart = Cart.objects.create(userid=user)

    return render(request, 'myaccount.html', {'orders':orders, 'products':items})

def orderdetail(request, id):
    orders= Order.objects.get(id=id)
    order_items=orders.OrderItems.all()
    # order_items=order_item.objects.all()
    return render(request, 'orderdetail.html', {'orders':orders, 'products':order_items})



