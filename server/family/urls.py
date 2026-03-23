from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'members', views.FamilyMemberViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tree/', views.family_tree, name='family-tree'),
    path('stats/', views.family_stats, name='family-stats'),
]
