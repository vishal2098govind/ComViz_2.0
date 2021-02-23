from django.urls import include, path
from comviz_api import views

urlpatterns = [
    path('submit_code', views.submit_source_code, name='submit_source_code'),
]