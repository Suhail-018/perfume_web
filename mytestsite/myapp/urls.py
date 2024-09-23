from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'shop'
urlpatterns = [
    path('', views.main, name='main'),
    path('signup', views.signup, name="signup"),
    # path('signin', views.signin, name="signin"),
    # path('signout', views.signout, name="signout"),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('home', views.home_view, name='home'),  # A view for the home page (optional)
    path('addtocart', views.viewcart, name='addtocart'),
    path('remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path("confirm_payment/", views.confirm_payment, name="add"),
    path('search/', views.search_feature, name='search-view'),
    path('order/', views.orderdone, name='order'),
    path('orderdetail/<int:id>', views.orderdetail, name='orderdetail'),
    path('about/', views.about, name='about'), 
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)