from rest_framework.response import Response
from .models import *
from .serializers import *
import geopy.distance
import datetime
from cloudinary.uploader import upload
from django.utils import timezone
import datetime
from django.db.models import Q
def get_images_ofproperty(id):
     temp=Prop_Images.objects.filter(property_id=id).values()
     lis=list(temp)
     return lis

def get_property(id):
        # properties=Properties.objects.filter(id=id)
        temp=Properties.objects.prefetch_related('catogary').filter(id=id)
    
        serializer=PropertySerializer(temp,many=True).data
        return serializer

def get_all_properties():
    properties=Properties.objects.all().values()
    s=list(properties)
    return s

def like_dislike_property(p_id,c_id):
    liked_item=Liked.objects.filter(property=p_id,customer=c_id)

    if(liked_item):
        liked_item.delete()
    else:
        item=Liked()
        item.property=Properties.objects.get(id=p_id)
        item.customer=User.objects.get(id=c_id)
        item.save()
    response = Response()
    response.data = {
        'message': 'success'
    }
    return response



def silgle_filter(request):
    if request.data.get('str')=='buy':
        properties=Properties.objects.filter(catogary__buy = True).values()
    elif request.data.get('str')=='lease':
        properties=Properties.objects.filter(catogary__lease = True).values()
    elif request.data.get('str')=='rent':
        properties=Properties.objects.filter(catogary__rent = True).values()
    elif request.data.get('str')=='coliving':
        properties=Properties.objects.filter(catogary__coliving = True).values()
    elif request.data.get('str')=='villa':
        properties=Properties.objects.filter(catogary__villa = True).values()

    s=list(properties)
    return s

def many_filters(request):
        properties=Properties.objects.all()
        if request.data['property_type'] != "":
            if 'apartment' in request.data.get('property_type'):
                properties=properties.filter(catogary__apartment=True)
            if 'independentfloor' in request.data.get('property_type'):
                properties=properties.filter(catogary__independent_floor=True)
            if 'independenthouse' in request.data.get('property_type'):
                properties=properties.filter(catogary__independent_house=True)
            if 'villa' in request.data.get('property_type'):
                properties=properties.filter(catogary__villa=True)
            if 'duplex' in request.data.get('property_type'):
                properties=properties.filter(catogary__duplex=True)
            if 'penthouse' in request.data.get('property_type'):
                properties=properties.filter(catogary__penthouse=True)
        
        if request.data['bhk_type'] != "":
            if 'one_bhk' in request.data['bhk_type']:
                properties=properties.filter(catogary__one_bhk=True)
            if 'two_bhk' in request.data['bhk_type']:
                properties=properties.filter(catogary__two_bhk=True)
            if 'three_bhk' in request.data['bhk_type']:
                properties=properties.filter(catogary__three_bhk=True)

        if request.data['furnishing'] != "":
            if 'fully' in request.data['furnishing']:
                properties=properties.filter(catogary__full_fur=True)
            if 'partially' in request.data['furnishing']:
                properties=properties.filter(catogary__partially_fur=True)
            if 'not' in request.data['furnishing']:
                properties=properties.filter(catogary__not_fur=True)

        if request.data['aminities'] != "":
            if 'swimmingpool' in request.data['aminities']:
                properties=properties.filter(catogary__swimmingpool=True)
            if 'gatedcommunities' in request.data['aminities']:
                properties=properties.filter(catogary__gated_community=True)
            if 'gym' in request.data['aminities']:
                properties=properties.filter(catogary__gym=True)
            if 'lift' in request.data['aminities']:
                properties=properties.filter(catogary__lift=True)
            if 'parking' in request.data['aminities']:
                properties=properties.filter(catogary__parking=True)
            if 'powerbackup' in request.data['aminities']:
                properties=properties.filter(catogary__powerbackup=True)

        if request.data['residence_type'] != "":
            if 'buy' in request.data['residence_type']:
                properties=properties.filter(catogary__buy=True)
            if 'rent' in request.data['residence_type']:
                properties=properties.filter(catogary__rent=True)
            if 'lease' in request.data['residence_type']:
                properties=properties.filter(catogary__lease=True)
        
        if request.data['gender'] != "":
            if 'male' in request.data['gender']:
                properties=properties.filter(catogary__male=True)
            if 'female' in request.data['gender']:
                properties=properties.filter(catogary__female=True)

        if request.data['room_type'] != "":
            if 'single' in request.data['room_type']:
                properties=properties.filter(catogary__single=True)
            if 'married' in request.data['room_type']:
                properties=properties.filter(catogary__married=True)
            if 'coliving' in request.data['room_type']:
                properties=properties.filter(catogary__coliving=True)
        
        if request.data['distance']:
            coords_2=(request.data['lat'],request.data['long'])
            for item in properties:
                lat1=item.lat
                lon1=item.long
                coords_1=(lat1,lon1)
                if(geopy.distance.geodesic(coords_1, coords_2).km>request.data['distance']):
                    properties = properties.exclude(id=item.id)
            
        for item in properties:
            if(item.price<=request.data['min_rainge'] or item.price>=request.data['max_rainge']):
                    properties = properties.exclude(id=item.id)

        s=list(properties.values())
        return s


def register_property(request):
        item=Catogary()
        item.apartment= 'apartment' in request.data.get('property_type')
        item.independent_floor='independentfloor' in request.data.get('property_type')
        item.independent_house='independenthouse' in request.data.get('property_type')
        item.villa='villa' in request.data.get('property_type')
        item.duplex='duplex' in request.data.get('property_type')
        item.penthouse='penthouse' in request.data.get('property_type')

        item.one_bhk='one_bhk' in request.data['bhk_type']
        item.two_bhk='two_bhk' in request.data['bhk_type']
        item.three_bhk='three_bhk' in request.data['bhk_type']

        item.male='male' in request.data['gender']
        item.female='female' in request.data['gender']

        item.swimmingpool='swimmingpool' in request.data['aminities']
        item.gated_community='gatedcommunities' in request.data['aminities']
        item.gym='gym' in request.data['aminities']
        item.lift='lift' in request.data['aminities']
        item.parking='parking' in request.data['aminities']
        item.powerbackup='powerbackup' in request.data['aminities']

        item.full_fur='fully' in request.data['furnishing']
        item.partially_fur='partially' in request.data['furnishing']
        item.not_fur='not' in request.data['furnishing']

        item.single='single'in request.data['room_type']
        item.married='married'in request.data['room_type']
        item.coliving='coliving'in request.data['room_type']

        item.buy='buy' in request.data['residence_type']
        item.rent='rent' in request.data['residence_type']
        item.lease='lease' in request.data['residence_type']
        item.save()
        

        ite=Properties()
        ite.name = request.data['name']
        ite.description =request.data['description']
        ite.price = request.data['price']
        ite.long = request.data['long']
        ite.lat = request.data['lat']
        ite.image=request.data.get('image')
        ite.malik=User.objects.filter(id=request.data['id']).first()
        # ite.malik=request.data['id']
        ite.adress=request.data.get('adress')
        ite.save()
        ite.catogary.add(item)
        ite.save()

        it=Owner()
        it.owner = User.objects.filter(id=request.data['id']).first()
        it.property = ite
        it.save()

        i=NewArrivals()
        i.datetime = datetime.datetime.now(tz=timezone.utc)
        i.property = ite
        i.save()

        response = 'success'
        return response


def upload_to_cloudinary(request):
    temp=upload(request.data.get('image'))
    return temp['secure_url']

def get_my_wishlist(id):
    # use=User.objects.get(id=id)
    # temp=Liked.objects.filter(customer=use)
    temp=Liked.objects.select_related('customer').filter(customer__id=id)
    x=LikedSerializer(temp,many=True)      
    return x.data

def delete_liked_property(id,cid):
        temp=Liked.objects.filter(property=id,customer=cid)
        temp.delete()
        response = 'success'
        return response
def put_review(request):
        tem=Review()
        if request.data.get('rating') != '':
            tem.rating=request.data.get('rating')
        if request.data.get('subject') != '':
            tem.subject=request.data.get('subject')
        if request.data.get('review') != '':
            tem.review=request.data.get('review')
        temp=Properties.objects.get(id=request.data.get('property_id'))
        tem.property=temp
        temp=User.objects.get(id=request.data.get('reviewer_id'))
        tem.customer=temp
        tem.date=datetime.datetime.utcnow()
        tem.save()
        temp='success'
        return temp

def get_review(id):
        # reviews1=Review.objects.filter(property=id)
        reviews1=Review.objects.select_related('property').filter(property__id=id)
        return ReviewSerializer(reviews1,many=True).data

def get_user_prop(id):
    myprop=Properties.objects.filter(malik_id=id)
    return list(myprop.values())

def delete_property(id):
        pro=Properties.objects.filter(id=id)
        pro.delete()
        
        message= 'success'
        
        return message

def book_appointment(request):
        temp=Appointment()
        temp.date=request.data.get('date')
        temp.about=request.data.get('about')
        emp=User.objects.filter(Q(id=request.data.get('malik_id'))|Q(id=request.data.get('customer')))
        if(emp.first().id==request.data.get('malik_id')):
            temp.malik_id=emp.first()
            temp.customer=emp.last()
        else:
            temp.malik_id=emp.last()
            temp.customer=emp.first()

        # use=User.objects.get(id=request.data.get('malik_id'))
        # temp.malik_id=use
        # use=User.objects.get(id=request.data.get('customer'))
        # temp.customer=use
        temp.save()
        message= 'success'
        
        return message


def get_my_appointments(id):
        # forme=Appointment.objects.filter(malik_id=id)
        # tome=Appointment.objects.filter(customer=id)
        tome=Appointment.objects.select_related('customer','malik_id').filter(Q(customer__id=id)|Q(malik_id__id=id))
        # forme=Appointment.objects.select_related('malik_id').filter(malik_id__id=id)
        # f_data=AppointmentSerializer(forme,many=True).data
        f_data=AppointmentSerializer(tome,many=True).data
        t_data=AppointmentSerializer(tome,many=True).data
        return f_data,t_data

def accept_appointment(id):
        temp=Appointment.objects.get(id=id)
        temp.accepted=True
        temp.status=True
        temp.save()
        message= 'success' 
        return message

def reject_appointment(id):
        temp=Appointment.objects.get(id=id)
        temp.status=True
        temp.save()
        message= 'success' 
        return message

def withdraw_appointment(id):
    temp=Appointment.objects.get(id=id)
    temp.delete()
    message= 'success' 
    return message

def search_function(request):
        key=request.data.get('key')
        prop=Properties.objects.filter(adress__icontains=key)
        s=list(prop.values())
        return s

def store_images(request):
        
        if Prop_Images.objects.filter(property_id=request.data.get('id')):
            imgs=Prop_Images.objects.get(property_id=request.data.get('id'))
            if request.data.get('img1'):
                imgs.img1=request.data.get('img1')
            if request.data.get('img2'):
                imgs.img2=request.data.get('img2')
            if request.data.get('img3'):
                imgs.img3=request.data.get('img3')
            if request.data.get('img4'):
                imgs.img4=request.data.get('img4')
            if request.data.get('img5'):
                imgs.img5=request.data.get('img5')
            imgs.save()
        else:
            imgs=Prop_Images()
            imgs.property_id=Properties.objects.get(id=request.data.get('id'))
            if request.data.get('img1'):
                imgs.img1=request.data.get('img1')
            if request.data.get('img2'):
                imgs.img2=request.data.get('img2')
            if request.data.get('img3'):
                imgs.img3=request.data.get('img3')
            if request.data.get('img4'):
                imgs.img4=request.data.get('img4')
            if request.data.get('img5'):
                imgs.img5=request.data.get('img5')
            imgs.save()
        message='success'
        return message



def get_new_arrivals():
        # temp=NewArrivals.objects.all().order_by('-datetime')[:10]
        data=NewArrivals.objects.select_related('property').all().order_by('-datetime')[:10]
        serializer = newarivalserial(data,many=True)
        return serializer.data


def report(request):
        temp=Reports()
        temp.property=Properties.objects.get(id=request.data.get('property_id'))
        temp.reporter=User.objects.get(id=request.data.get('reporter_id'))
        temp.complant=request.data.get('report')
        temp.save()
        message='success'
        return message

def reports():
        reports=Reports.objects.select_related('reporter','property').all().order_by('property')
        serializer=ReportSerializer(reports,many=True)
        reports=reports.order_by('reporter')
        serializer2=ReportSerializer(reports,many=True)
        return [serializer.data,serializer2.data]



def cat_data():
    temp=Catogary.objects.all()
    apartment=0
    independent_house=0
    independent_floor=0
    duplex=0
    penthouse=0
    villa=0
    gated_community=0
    for tem in temp:
        if tem.apartment:
            apartment+=1
        if tem.independent_house:
            independent_house+=1
        if tem.independent_floor:
            independent_floor+=1
        if tem.duplex:
            duplex+=1
        if tem.penthouse:
            penthouse+=1
        if tem.villa:
            villa+=1
        if tem.gated_community:
            gated_community+=1

        buy=0
        rent=0
        lease=0
        for tem in temp:
            if tem.buy:
                buy+=1
            if tem.rent:
                rent+=1
            if tem.lease:
                lease+=1
        
    return [apartment,independent_house,independent_floor,duplex,penthouse,villa,gated_community],[buy,rent,lease]


def report_data():
    temp=Reports.objects.all()
    fake_images=0
    already_sold=0
    ltication_property=0
    no_property_in_destination=0
    facilities_mentioned_are_not_available=0
    for item in temp:
        if item.complant=='fake images':
            fake_images+=1
        if item.complant=='already sold':
            already_sold+=1
        if item.complant=='litication property':
            ltication_property+=1
        if item.complant=='no property in destination':
            no_property_in_destination+=1
        if item.complant=='facilities mentioned are not available':
            facilities_mentioned_are_not_available+=1
    return [fake_images,already_sold,ltication_property,no_property_in_destination,facilities_mentioned_are_not_available]   

def report_data_by_id(id):
    temp=Reports.objects.filter(id=id)
    lis=list(temp.values())
    return lis

def store_admin_msg(request):
    temp=Admin_messages()
    temp.receiver=User.objects.get(id=request.data.get('receiver_id'))
    temp.report=Reports.objects.get(id=request.data.get('report_id'))
    temp.message=request.data.get('msg')
    temp.save()
    message='success'
    return message

def get_msgs(id):
    msgs=Admin_messages.objects.filter(receiver_id=id).values()
    lis=list(msgs)
    return lis


    
# def reg_data():
#     temp=Catogary.objects.all()
#     buy=0
#     rent=0
#     lease=0
#     for tem in temp:
#         if tem.buy:
#             buy+=1
#         if tem.rent:
#             rent+=1
#         if tem.lease:
#             lease+=1
#     return [buy,rent,lease]


# class All_Properties(APIView):
#     @staticmethod
#     def get(request):
#         properties=Properties.objects.all().values()
#         s=list(properties)
#         return JsonResponse(s,safe=False)


# class like_func(APIView):
#     def get(self,request,p_id,c_id):
#         liked_item=Liked.objects.filter(property=p_id,customer=c_id)
#         if(liked_item):
#             liked_item.delete()
#         else:
#             item=Liked()
#             item.property=Properties.objects.get(id=p_id)
#             item.customer=User.objects.get(id=c_id)
#             item.save()
#         response = Response()
#         response.data = {
#             'message': 'success'
#         }
#         return response
       



# #home page after applying filters
# #pass filtering user coords in request

# # class one_filter(APIView):
# #     def post(self,request):
# #         if request.data.get('str')=='buy':
# #             properties=Properties.objects.filter(type__residence_type = 'buy').values()
# #         if request.data.get('str')=='lease':
# #             properties=Properties.objects.filter(type__residence_type = 'lease').values()
# #         if request.data.get('str')=='rent':
# #             properties=Properties.objects.filter(type__residence_type = 'rent').values()
# #         if request.data.get('str')=='coliving':
# #             properties=Properties.objects.filter(type__room_type = 'coliving').values()
# #         if request.data.get('str')=='villa':
# #             properties=Properties.objects.filter(type__property_type = 'villa').values()

# #         s=list(properties)
# #         return JsonResponse(s,safe=False)



# # class Filtered_Properties(APIView):
# #     def post(self,request):
# #         properties=Properties.objects.all()

# #         if request.data['property_type'] != "":
# #             properties=properties.filter(type__property_type=request.data['property_type'])
# #         if request.data['bhk_type'] != "":
# #             properties=properties.filter(type__bhk_type=request.data['bhk_type'])
# #         if request.data['furnishing'] != "":
# #             properties=properties.filter(type__furnishing=request.data['furnishing'])
# #         if request.data['aminities'] != "":
# #             properties=properties.filter(type__aminities=request.data['aminities'])
# #         if request.data['residence_type'] != "":
# #             properties=properties.filter(type__residence_type=request.data['residence_type'])
# #         if request.data['gender'] != "":
# #             properties=properties.filter(type__gender=request.data['gender'])
# #         print(properties)
# #         print(request.data['distance'])
# #         if request.data['distance']:
# #             coords_2=(request.data['lat'],request.data['long'])
# #             for item in properties:
# #                 lat1=item.lat
# #                 lon1=item.long
# #                 coords_1=(lat1,lon1)
# #                 if(geopy.distance.geodesic(coords_1, coords_2).km>request.data['distance']):
# #                     properties = properties.exclude(id=item.id)
# #             print(properties)
            
# #         for item in properties:
# #             if(item.price<=request.data['min_rainge'] or item.price>=request.data['max_rainge']):
# #                     properties = properties.exclude(id=item.id)

# #         s=list(properties.values())
# #         return JsonResponse(s,safe=False)



# # class Register_Property(APIView):
# #     def post(self,request):
# #         item=TypeTable()
# #         item.property_type = request.data['property_type']
# #         item.bhk_type = request.data['bhk_type']
# #         item.gender = request.data['gender']
# #         item.room_type = request.data['room_type']
# #         item.furnishing = request.data['furnishing']
# #         item.aminities = request.data['aminities']
# #         item.residence_type = request.data['residence_type']
# #         item.save()

# #         ite=Properties()
# #         ite.name = request.data['name']
# #         ite.description =request.data['description']
# #         ite.price = request.data['price']
# #         ite.long = request.data['long']
# #         ite.lat = request.data['lat']
# #         ite.image=request.data.get('image')
# #         ite.malik=User.objects.filter(id=request.data['id']).first()
# #         ite.adress=request.data.get('adress')
# #         ite.save()
# #         ite.type.add(item)
# #         ite.save()

# #         it=Owner()
# #         it.owner = User.objects.filter(id=request.data['id']).first()
# #         it.property = ite
# #         it.save()

# #         i=NewArrivals()
# #         i.datetime = datetime.datetime.now(tz=timezone.utc)
# #         i.property = ite
# #         i.save()

# #         response = Response()
# #         response.data = {
# #             'message': 'success'
# #         }
# #         return response

# class new_one_filter(APIView):
#     def post(self,request):
#         if request.data.get('str')=='buy':
#             properties=Properties.objects.filter(catogary__buy = True).values()
#         if request.data.get('str')=='lease':
#             properties=Properties.objects.filter(catogary__lease = True).values()
#         if request.data.get('str')=='rent':
#             properties=Properties.objects.filter(catogary__rent = True).values()
#         if request.data.get('str')=='coliving':
#             properties=Properties.objects.filter(catogary__coliving = True).values()
#         if request.data.get('str')=='villa':
#             properties=Properties.objects.filter(catogary__villa = True).values()

#         s=list(properties)
#         return JsonResponse(s,safe=False)


# class new_Filtered_Properties(APIView):
#     def post(self,request):
#         properties=Properties.objects.all()

#         if request.data['property_type'] != "":
#             if 'apartment' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__apartment=True)

#             if 'independentfloor' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__independent_floor=True)

#             if 'independenthouse' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__independent_house=True)
#             if 'villa' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__villa=True)
#             if 'duplex' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__duplex=True)
#             if 'penthouse' in request.data.get('property_type'):
#                 properties=properties.filter(catogary__penthouse=True)
        
#         if request.data['bhk_type'] != "":
#             if 'one_bhk' in request.data['bhk_type']:
#                 properties=properties.filter(catogary__one_bhk=True)
#             if 'two_bhk' in request.data['bhk_type']:
#                 properties=properties.filter(catogary__two_bhk=True)
#             if 'three_bhk' in request.data['bhk_type']:
#                 properties=properties.filter(catogary__three_bhk=True)

#         if request.data['furnishing'] != "":
#             if 'fully' in request.data['furnishing']:
#                 properties=properties.filter(catogary__full_fur=True)
#             if 'partially' in request.data['furnishing']:
#                 properties=properties.filter(catogary__partially_fur=True)
#             if 'not' in request.data['furnishing']:
#                 properties=properties.filter(catogary__not_fur=True)

#         if request.data['aminities'] != "":
#             if 'swimmingpool' in request.data['aminities']:
#                 properties=properties.filter(catogary__swimmingpool=True)
#             if 'gatedcommunities' in request.data['aminities']:
#                 properties=properties.filter(catogary__gated_community=True)
#             if 'gym' in request.data['aminities']:
#                 properties=properties.filter(catogary__gym=True)
#             if 'lift' in request.data['aminities']:
#                 properties=properties.filter(catogary__lift=True)
#             if 'parking' in request.data['aminities']:
#                 properties=properties.filter(catogary__parking=True)
#             if 'powerbackup' in request.data['aminities']:
#                 properties=properties.filter(catogary__powerbackup=True)

#         if request.data['residence_type'] != "":
#             if 'buy' in request.data['residence_type']:
#                 properties=properties.filter(catogary__buy=True)
#             if 'rent' in request.data['residence_type']:
#                 properties=properties.filter(catogary__rent=True)
#             if 'lease' in request.data['residence_type']:
#                 properties=properties.filter(catogary__lease=True)
        
#         if request.data['gender'] != "":
#             if 'male' in request.data['gender']:
#                 properties=properties.filter(catogary__male=True)
#             if 'female' in request.data['gender']:
#                 properties=properties.filter(catogary__female=True)

#         if request.data['room_type'] != "":
#             if 'single' in request.data['room_type']:
#                 properties=properties.filter(catogary__single=True)
#             if 'married' in request.data['room_type']:
#                 properties=properties.filter(catogary__married=True)
#             if 'coliving' in request.data['room_type']:
#                 properties=properties.filter(catogary__coliving=True)
        
#         if request.data['distance']:
#             coords_2=(request.data['lat'],request.data['long'])
#             for item in properties:
#                 lat1=item.lat
#                 lon1=item.long
#                 coords_1=(lat1,lon1)
#                 if(geopy.distance.geodesic(coords_1, coords_2).km>request.data['distance']):
#                     properties = properties.exclude(id=item.id)
            
#         for item in properties:
#             if(item.price<=request.data['min_rainge'] or item.price>=request.data['max_rainge']):
#                     properties = properties.exclude(id=item.id)

#         s=list(properties.values())
#         return JsonResponse(s,safe=False)



# class new_Register_Property(APIView):
#     def post(self,request):
     
#         item=Catogary()
#         item.apartment= 'apartment' in request.data.get('property_type')
#         item.independent_floor='independentfloor' in request.data.get('property_type')
#         item.independent_house='independenthouse' in request.data.get('property_type')
#         item.villa='villa' in request.data.get('property_type')
#         item.duplex='duplex' in request.data.get('property_type')
#         item.penthouse='penthouse' in request.data.get('property_type')

#         item.one_bhk='one_bhk' in request.data['bhk_type']
#         item.two_bhk='two_bhk' in request.data['bhk_type']
#         item.three_bhk='three_bhk' in request.data['bhk_type']

#         item.male='male' in request.data['gender']
#         item.female='female' in request.data['gender']

#         item.swimmingpool='swimmingpool' in request.data['aminities']
#         item.gated_community='gatedcommunities' in request.data['aminities']
#         item.gym='gym' in request.data['aminities']
#         item.lift='lift' in request.data['aminities']
#         item.parking='parking' in request.data['aminities']
#         item.powerbackup='powerbackup' in request.data['aminities']

#         item.full_fur='fully' in request.data['furnishing']
#         item.partially_fur='partially' in request.data['furnishing']
#         item.not_fur='not' in request.data['furnishing']

#         item.single='single'in request.data['room_type']
#         item.married='married'in request.data['room_type']
#         item.coliving='coliving'in request.data['room_type']

#         item.buy='buy' in request.data['residence_type']
#         item.rent='rent' in request.data['residence_type']
#         item.lease='lease' in request.data['residence_type']
#         item.save()
        

#         ite=Properties()
#         ite.name = request.data['name']
#         ite.description =request.data['description']
#         ite.price = request.data['price']
#         ite.long = request.data['long']
#         ite.lat = request.data['lat']
#         ite.image=request.data.get('image')
#         ite.malik=User.objects.filter(id=request.data['id']).first()
#         ite.adress=request.data.get('adress')
#         ite.save()
#         ite.catogary.add(item)
#         ite.save()

#         it=Owner()
#         it.owner = User.objects.filter(id=request.data['id']).first()
#         it.property = ite
#         it.save()

#         i=NewArrivals()
#         i.datetime = datetime.datetime.now(tz=timezone.utc)
#         i.property = ite
#         i.save()

#         response = Response()
#         response.data = {
#             'message': 'success'
#         }
#         return response




# class upload_file(APIView):
#     def post(self,request):
#         temp=upload(request.data.get('image'))
#         return Response(temp['secure_url'])

        
# class wishlist(APIView):
#     def get(self,request,id):
        
#         # use=User.objects.get(id=id)
#         # temp=Liked.objects.filter(customer=use).values()
#         # s=list(temp)
#         # kemp=list()
#         # for item in s:
#         #     prop=Properties.objects.filter(id=item['property_id']).values()
#         #     kemp.append(json.dumps(list(prop), cls=DjangoJSONEncoder))

#         use=User.objects.get(id=id)
#         temp=Liked.objects.filter(customer=use)
#         x=LikedSerializer(temp,many=True)
#         # print(x.data)
#         # s=list(temp)
#         # kemp=list()
#         # for item in s:
#         #     prop=Properties.objects.filter(id=item['property_id']).values()
#         #     kemp.append(json.dumps(list(prop), cls=DjangoJSONEncoder))
      
#         return JsonResponse(x.data,safe=False)



        
# class delete(APIView):
#     def delete(self,request,id,cid):
#         temp=Liked.objects.filter(property=id,customer=cid)
#         temp.delete()
#         response = Response()
#         response.data = {
#             'message': 'success'
#         }
#         return response


# class add_Review(APIView):
#     def post(self,request):
#         tem=Review()
#         if request.data.get('rating') != '':
#             tem.rating=request.data.get('rating')
#         if request.data.get('subject') != '':
#             tem.subject=request.data.get('subject')
#         if request.data.get('review') != '':
#             tem.review=request.data.get('review')
#         temp=Properties.objects.get(id=request.data.get('property_id'))
#         tem.property=temp
#         temp=User.objects.get(id=request.data.get('reviewer_id'))
#         tem.customer=temp
#         tem.date=datetime.datetime.utcnow()
#         tem.save()

#         return Response({'msg':'success'})

# class GetReview(APIView):
#     def get(self,request,id):
#         reviews1=Review.objects.filter(property=id)
#         lis=[]
#         for x in reviews1:
#             cust_id=x.customer
#             obj=User.objects.get(email_id=cust_id)
#             temp={
#                 "cust_name":obj.u_name,
#                 "rating":x.rating,
#                 "review":x.review,
#                 "subject":x.subject,
#                 "image":obj.profile,
#                 "date":x.date
#             }
#             lis.append(temp)
            
            
        
#         return JsonResponse(lis,safe=False)

# class User_properties(APIView):
#     def get(self,request,id):
#         myprop=Properties.objects.filter(malik_id=id)
#         return JsonResponse(list(myprop.values()),safe=False)
# class delete_users_product(APIView):
#      def delete(self,request,id):
#         pro=Properties.objects.filter(id=id)
#         pro.delete()
#         response = Response()
#         response.data = {
#             'message': 'success'
#         }
#         return response
    
# class bookappointment(APIView):
#     def post(self,request):
#         temp=Appointment()
#         temp.date=request.data.get('date')
#         temp.about=request.data.get('about')
#         print(request.data.get('malik_id'))
#         print(request.data.get('customer'))

#         use=User.objects.get(id=request.data.get('malik_id'))
#         temp.malik_id=use
#         use=User.objects.get(id=request.data.get('customer'))
#         temp.customer=use
#         temp.save()
#         return Response({"msg":"success"})

# class my_appointments(APIView):
#     def get(self,request,id):
#         # forme=Appointment.objects.filter(malik_id=id).values()
#         # tome=Appointment.objects.filter(customer=id).values()
#         # li=list(forme)
#         # lis2=list(tome)
#         # lis=[]
#         # lis.append(li)
#         # lis.append(lis2)
#         # return JsonResponse(lis,safe=False)
#         forme=Appointment.objects.filter(malik_id=id)
#         tome=Appointment.objects.filter(customer=id)
#         f_data=AppointmentSerializer(forme,many=True).data
#         t_data=AppointmentSerializer(tome,many=True).data
    
#         return Response({
#             'one':f_data,
#             'two':t_data
#         })


# class Accept(APIView):
#     def get(self,request,id):
#         temp=Appointment.objects.get(id=id)
#         temp.accepted=True
#         temp.status=True
#         temp.save()
#         return Response({'msg':'success'})

# class Reject(APIView):
#     def get(self,request,id):
#         temp=Appointment.objects.get(id=id)
#         temp.status=True
#         temp.save()
#         return Response({'msg':'success'})
# class Withdraw(APIView):
#     def delete(self,request,id):
#         temp=Appointment.objects.get(id=id)
#         temp.delete()
#         return Response({'msg':'success'})

# class Search(APIView):
#     def post(self,request):
#         key=request.data.get('key')
#         prop=Properties.objects.filter(adress__icontains=key)
#         s=list(prop.values())
#         return JsonResponse(s,safe=False)

# class Upload_Images(APIView):
#     def post(self,request):
#         if Prop_Images.objects.filter(property_id=request.data.get('id')):
#             imgs=Prop_Images.objects.get(property_id=request.data.get('id'))
#             if request.data.get('img1'):
#                 imgs.img1=request.data.get('img1')
#             if request.data.get('img2'):
#                 imgs.img2=request.data.get('img2')
#             if request.data.get('img3'):
#                 imgs.img3=request.data.get('img3')
#             if request.data.get('img4'):
#                 imgs.img4=request.data.get('img4')
#             if request.data.get('img5'):
#                 imgs.img5=request.data.get('img5')
#             imgs.save()
#         else:
#             imgs=Prop_Images()
#             imgs.property_id=Properties.objects.get(id=request.data.get('id'))
#             if request.data.get('img1'):
#                 imgs.img1=request.data.get('img1')
#             if request.data.get('img2'):
#                 imgs.img2=request.data.get('img2')
#             if request.data.get('img3'):
#                 imgs.img3=request.data.get('img3')
#             if request.data.get('img4'):
#                 imgs.img4=request.data.get('img4')
#             if request.data.get('img5'):
#                 imgs.img5=request.data.get('img5')
#             imgs.save()
      
#         return Response({'msg':'success'})
# class New_Arrivals(APIView):
#     def get(self,request):
#         temp=NewArrivals.objects.all().order_by('-datetime')[:10]
#         serializer = newarivalserial(temp,many=True)
#         return Response(serializer.data)



