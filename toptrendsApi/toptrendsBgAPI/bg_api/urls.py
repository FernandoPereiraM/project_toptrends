from django.urls import path
from .views import BigQueryView, Query_APIView, Query_APIView_Detail, ByNameQuery_APIView, \
    Comentary_APIView, ComByIdQuery_APIView, ByExcludeQuery_APIView
from rest_framework.routers import SimpleRouter

"""

    This code defines the URL patterns (urlpatterns) for a Django web application.

"""
urlpatterns = [
    path('bigquery/<int:id>', BigQueryView.as_view(), name='bigquery_process'),
    path('v1/bgquerys/<int:pk>/', Query_APIView_Detail.as_view()),

    path('v1/querys', Query_APIView.as_view()),
    path('v1/querys/<int:pk>/', Query_APIView_Detail.as_view()),

    path('v1/querysbyuser/<str:username>/', ByNameQuery_APIView.as_view()),
    path('v1/querysexuser/<str:username>/', ByExcludeQuery_APIView.as_view()),
    path('v1/combyidquery/<int:query>/', ComByIdQuery_APIView.as_view()),
]

router = SimpleRouter()
router.register('v1/queryscom', Comentary_APIView)
urlpatterns += router.urls
