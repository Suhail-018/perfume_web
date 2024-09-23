from django.contrib import admin
from django.contrib.auth.models import User

from .models import Profile, Products, Order, OrderItems, Cart, Preferences, CartItems  

# Register your models here.

admin.site.register(Products)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(Cart)
admin.site.register(Preferences)
admin.site.register(CartItems)
# admin.site.register(User)
admin.site.register(Profile)
