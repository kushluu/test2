from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Appointment, Catogary, Liked, NewArrivals, Properties, Reports,TypeTable,Owner,Review,Prop_Images
from users.models import User
class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeTable
        fields ='__all__'

class CatogarySerializer(serializers.ModelSerializer):
    class Meta:
        model=Catogary
        fields='__all__'


class PropertySerializer(serializers.ModelSerializer):
    catogary=CatogarySerializer(many=True)

    class Meta:
        model = Properties
        fields ='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'
         
class LikedSerializer(serializers.ModelSerializer):
    property=PropertySerializer()
    customer=UserSerializer()
    class Meta:
        model = Liked
        fields = '__all__'
class newarivalserial(serializers.ModelSerializer):
    property=PropertySerializer()
    class Meta:
        model = NewArrivals
        fields = '__all__'
class AppointmentSerializer(serializers.ModelSerializer):
    malik_id=UserSerializer()
    customer=UserSerializer()
    class Meta:
        model=Appointment
        fields='__all__'







        
class OwnerSeriaizer(serializers.ModelSerializer):
    owner=UserSerializer()
    property=PropertySerializer()
    class Meta:
        model=Owner
        fields='__all__'

class ReviewSerializer(serializers.ModelSerializer):
    property=PropertySerializer()
    customer=UserSerializer()
    class Meta:
        model=Review
        fields='__all__'


class Prop_ImagesSerializer(serializers.ModelSerializer):
    property_id=PropertySerializer()
    class Meta:
        model=Prop_Images
        fields='__all__'

class ReportSerializer(serializers.ModelSerializer):
    property=PropertySerializer()
    reporter=UserSerializer()
    class Meta:
        model=Reports
        fields='__all__'
