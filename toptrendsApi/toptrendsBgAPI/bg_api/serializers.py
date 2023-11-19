from rest_framework import serializers
from .models import Query, UsersCom

"""
    These are Django REST framework serializers, 
    which are used to convert complex data types, 
    such as Django models, into Python data types 
    that can be easily rendered into JSON or other 
    content types

"""
class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = '__all__'


class UserComSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCom
        fields = '__all__'

