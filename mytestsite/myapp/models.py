from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

# Create your models here.
# class User(models.Model):
#     username = models.CharField(max_length=100)
#     email =models.EmailField(unique=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)

class Products(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.TextField()
    imgsrc = models.CharField(max_length=200, default='/static/images/best-product/B1-1.png')

    def __str__(self):
        return self.name

    def id(self):
        return self.id

class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders' )

class OrderItems(models.Model):
    orderid= models.ForeignKey(Order, on_delete=models.CASCADE, related_name='OrderItems')
    productid= models.ForeignKey(Products, on_delete=models.CASCADE)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    Quantity=models.PositiveIntegerField()

class Cart(models.Model):
    # id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    userid = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    Productsid= models.ManyToManyField(Products, through='CartItems')
    created_at = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)


    def __str__(self):
        return str(self.id)
    @property
    def total_price(self):
        cartitems = self.CartItems.all()
        total = sum([item.subtotal for item in cartitems])
        return total

       
    @property
    def num_of_items(self):
        cartitems = self.CartItems.all()
        quantity = sum([item.quantity for item in cartitems])
        return quantity
    
class CartItems(models.Model):
    Cartid= models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='CartItems')
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.product.name
    
    @property
    def subtotal(self):
        return self.quantity * self.product.price

class Preferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferences = models.JSONField()
