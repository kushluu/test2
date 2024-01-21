from distutils.command.upload import upload
from email.policy import default
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth import get_user_model
User=get_user_model()


# Create your models here.


class Catogary(models.Model):
    apartment=models.BooleanField(default=False)
    independent_house=models.BooleanField(default=False)
    independent_floor=models.BooleanField(default=False)
    duplex=models.BooleanField(default=False)
    penthouse=models.BooleanField(default=False)
    villa=models.BooleanField(default=False)

    one_bhk=models.BooleanField(default=False)
    two_bhk=models.BooleanField(default=False)
    three_bhk=models.BooleanField(default=False)

    male=models.BooleanField(default=False)
    female=models.BooleanField(default=False)

    swimmingpool=models.BooleanField(default=False)
    gated_community=models.BooleanField(default=False)
    gym=models.BooleanField(default=False)
    lift=models.BooleanField(default=False)
    parking=models.BooleanField(default=False)
    powerbackup=models.BooleanField(default=False)
   
    full_fur=models.BooleanField(default=False)
    partially_fur=models.BooleanField(default=False)
    not_fur=models.BooleanField(default=False)

    single=models.BooleanField(default=False)
    married=models.BooleanField(default=False)
    coliving=models.BooleanField(default=False)

    buy=models.BooleanField(default=False)
    rent=models.BooleanField(default=False)
    lease=models.BooleanField(default=False)



class TypeTable(models.Model):
    property_type = models.CharField(max_length=255)
    bhk_type = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    room_type = models.CharField( max_length=255)  
    furnishing = models.CharField(max_length=255)
    aminities = models.CharField(max_length=255)
    residence_type = models.CharField(max_length=255)

class Properties(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.IntegerField()
    long = models.CharField(max_length=255,default=000)
    lat=models.CharField(max_length=255,default=000)
    # image=models.ImageField(upload_to="",null=True,blank=True)
    image= models.TextField(null=True)
    adress=models.TextField(null=True)
    
    malik = models.ForeignKey(User,on_delete=models.CASCADE)
    # type = models.ManyToManyField(TypeTable)
    catogary=models.ManyToManyField(Catogary, related_name="categories")








class Appointment(models.Model):
    date = models.DateField()    
    about = models.TextField(null=True)
    customer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='customer')
    malik_id = models.ForeignKey(User,on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    status = models.BooleanField(default=False)












class Liked(models.Model):
    property = models.ForeignKey(Properties, on_delete=models.CASCADE)
    customer = models.ForeignKey(User,on_delete=models.CASCADE)



class Owner(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    property = models.ForeignKey(Properties, on_delete=models.CASCADE)




class NewArrivals(models.Model):
    datetime = models.DateTimeField()

    property = models.ForeignKey(Properties, on_delete=models.CASCADE)


class Review(models.Model):
    rating = models.IntegerField(default=3)
    review = models.CharField(default='no comments',max_length=255)
    subject = models.CharField(default='average',max_length=255)
    property = models.ForeignKey(Properties, on_delete=models.CASCADE)
    customer = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField(null=True)

class Prop_Images(models.Model):
    property_id = models.ForeignKey(Properties, on_delete=models.CASCADE , default=1000)
    img1 = models.TextField(null=True)
    img2 = models.TextField(null=True)
    img3 = models.TextField(null=True)
    img4 = models.TextField(null=True)
    img5 = models.TextField(null=True)

class Reports(models.Model):
    property=models.ForeignKey(Properties, on_delete=models.CASCADE , default=1000)
    reporter=models.ForeignKey(User,on_delete=models.CASCADE)
    complant= models.CharField(max_length=255)

class Admin_messages(models.Model):
    message=models.TextField()
    report=models.ForeignKey(Reports,on_delete=models.CASCADE)
    receiver=models.ForeignKey(User,on_delete=models.CASCADE)
