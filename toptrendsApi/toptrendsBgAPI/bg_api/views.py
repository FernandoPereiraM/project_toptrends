from django.http.response import JsonResponse, Http404
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Query, UsersCom
from .serializers import QuerySerializer, UserComSerializer
from .utils import obt_top25


class BigQueryView(View):
    """

    INFO:
    ****BigQueryView****
    This view essentially serves as an endpoint that, when accessed with a GET request,
    retrieves a query from the database, uses the obt_top25 function to fetch data from BigQuery,
    and returns the result as a JSON response. The CSRF exemption allows external
    services to access this endpoint without CSRF token validation.

    """

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            querys = Query.objects.filter(id=id).values()
            if len(querys) > 0:
                query = querys[0]
            else:
                datos = {'message': "Query not found..."}
            bgobt = obt_top25(country_name=querys[0]['country_name'],
                              top_terms=querys[0]['is_top_term'],
                              top_rising_term=querys[0]['is_top_rising'],
                              es_date=querys[0]['es_date'],
                              is_today=querys[0]['is_today'],
                              is_orderRank=querys[0]['is_orderRank'],
                              is_orderScore=querys[0]['is_orderScore'], )
            return JsonResponse(bgobt, safe=False)


class BigQuery_APIView_Detail(APIView):
    """

    INFO:
    This is responsible for retrieving a specific
    Query object by its primary key, and the get method uses
    this method to respond to GET requests by returning the
    serialized data of the specified Query object.
    The @csrf_exempt decorator indicates that this view is exempt
    from Cross-Site Request Forgery (CSRF) protection,
    allowing it to be accessed by external services
    without CSRF token validation.

    """

    @csrf_exempt
    def get_object(self, pk):
        try:
            return Query.objects.get(pk=pk)
        except Query.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = QuerySerializer(post)
        return Response(serializer.data)


class Query_APIView(APIView):
    """

    INFO:
    ****QueryView Localsb posgres.****
    These views provide a RESTful API for basic CRUD operations (Create, Read, Update, Delete)
    on Query objects. The QuerySerializer is crucial for validating and transforming data
    between the API and the database.

    """

    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        post = Query.objects.all().order_by('id')
        serializer = QuerySerializer(post, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Query_APIView_Detail(APIView):
    @csrf_exempt
    def get_object(self, pk):
        try:
            return Query.objects.get(pk=pk)
        except Query.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = QuerySerializer(post)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = QuerySerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# List of Query by User
class ByNameQuery_APIView(APIView):
    """
    INFO:
    this view retrieves a list of Query objects based on the provided username,
    orders them by ID, serializes the data, and returns the serialized data as
    a response. The @csrf_exempt decorator allows this view to be accessed
    without CSRF token validation. If the specified username doesn't exist
    in the database, it raises an Http404 exception.

    """
    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        arg = kwargs
        try:
            post = Query.objects.filter(user_name=arg.get('username')).order_by('id')
            serializer = QuerySerializer(post, many=True)
            return Response(serializer.data)
        except Query.DoesNotExist:
            raise Http404


# List of Query exclude User
class ByExcludeQuery_APIView(APIView):
    """

    INFO:
    this view retrieves a list of Query objects excluding those
    with a specified username, orders them by ID, serializes
    the data, and returns the serialized data as a response.
    The @csrf_exempt decorator allows this view to be accessed
    without CSRF token validation. If there are no records found
    based on the exclusion criteria, it raises an Http404 exception.

    """
    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        arg = kwargs
        try:
            post = Query.objects.exclude(user_name=arg.get('username')).order_by('id')
            serializer = QuerySerializer(post, many=True)
            return Response(serializer.data)
        except Query.DoesNotExist:
            raise Http404


# Commentary Locals postgres.
class Comentary_APIView(viewsets.ModelViewSet):
    """
    INFO:
    this code sets up a Django REST framework view or serializer for
    handling instances of the UsersCom model. It specifies that all
    instances of the UsersCom model should be included in the queryset,
    and the UserComSerializer should be used to serialize these instances
    for rendering or processing in the context of a Django view or API.

    """
    queryset = UsersCom.objects.all()
    serializer_class = UserComSerializer


# List of Coments by IdQuery
class ComByIdQuery_APIView(APIView):
    """
    INFO:
    this view retrieves a list of UsersCom objects from the database
    based on a specified query, orders them by ID in descending order,
    serializes the data, and returns the serialized data as a response.
    The @csrf_exempt decorator allows this view to be accessed without
    CSRF token validation. If there are no records found based on the
    specified query, it raises an Http404 exception.

    """

    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        arg = kwargs
        try:
            post = UsersCom.objects.filter(query=arg.get('query')).order_by('-id')
            serializer = UserComSerializer(post, many=True)
            return Response(serializer.data)
        except UsersCom.DoesNotExist:
            raise Http404
