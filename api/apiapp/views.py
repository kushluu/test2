
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from users.models import *
# from .serializers import *

from django.http import JsonResponse
from .managers import *

# Create your views here.

#initial home page

class My_imgs(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=get_images_ofproperty(id)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)

       

        
class Property(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=get_property(id)
            return Response(ret)
        except Exception as e:
            return JsonResponse(e)
        
   
class All_Properties(APIView):
    @staticmethod
    def get(request):
        try:
            ret=get_all_properties()
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)

        


class like_func(APIView):
    @staticmethod
    def get(request,p_id,c_id):
        try:
            ret=like_dislike_property(p_id,c_id)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)

        
       


class new_one_filter(APIView):
    @staticmethod
    def post(request):
        try:
            ret=silgle_filter(request)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)
        


class new_Filtered_Properties(APIView):
    @staticmethod
    def post(request):
        try:
            ret=many_filters(request)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)


        



class new_Register_Property(APIView):
    @staticmethod
    def post(request): 
        try:
            ret=register_property(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)    
       
class upload_file(APIView):
    @staticmethod
    def post(request):
        try:
            ret=upload_to_cloudinary(request)
            return Response(ret)
        except Exception as e:
            return JsonResponse(e)

        

        
class wishlist(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=get_my_wishlist(id)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)
        



        
class delete(APIView):
    @staticmethod

    def delete(request,id,cid):
        try:
            ret=delete_liked_property(id,cid)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)

        


class add_Review(APIView):
    @staticmethod

    def post(request):
        try:
            ret=put_review(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        


class GetReview(APIView):  
  @staticmethod

  def get(request,id):
    try:
        ret=get_review(id)
        return JsonResponse(ret,safe=False)
    except Exception as e:
        return JsonResponse(e)
        

class User_properties(APIView):
 @staticmethod
 def get(request,id):
    try:
        ret=get_user_prop(id)
        return JsonResponse(ret,safe=False)
    except Exception as e:
        return JsonResponse(e)
        



class delete_users_product(APIView):
     @staticmethod
     def delete(request,id):
        try:
            ret=delete_property(id)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        
    
class bookappointment(APIView):
    @staticmethod
    def post(request):
        try:
            ret=book_appointment(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        
class my_appointments(APIView):
    @staticmethod
    def get(request,id):
        try:
            f_data,t_data=get_my_appointments(id)
            return Response({
            'one':f_data,
            'two':t_data
            })
        except Exception as e:
            return JsonResponse(e)
        
    
        


class Accept(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=accept_appointment(id)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)


class Reject(APIView):
    @staticmethod

    def get(request,id):
        try:
            ret=reject_appointment(id)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        
class Withdraw(APIView):
    @staticmethod

    def delete(request,id):
        try:
            ret=withdraw_appointment(id)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        

class Search(APIView):
    @staticmethod

    def post(request):
        try:
            ret=search_function(request)
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)
        

class Upload_Images(APIView):
    @staticmethod

    def post(request):
        try:
            ret=store_images(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
        

class New_Arrivals(APIView):
    @staticmethod
    
    def get(request):
        try:
            ret=get_new_arrivals()
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)
        

class File_Report(APIView):
    @staticmethod

    def post(request):
        try:
            ret=report(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
    
class Get_reports(APIView):
    @staticmethod
    
    def get(request):
        try:
            ret=reports()
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)
        
           
class Graph_data(APIView):
    @staticmethod
    def get(request):
        try:
            ret=cat_data()
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)
# class reg_type(APIView):
#     @staticmethod
#     def get(request):
#         try:
#             ret=reg_data()
#             return JsonResponse(ret,safe=False)     
#         except Exception as e:
#             return JsonResponse(e)

class Graph_report(APIView):
    @staticmethod
    def get(request):
        try:
            ret=report_data()
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)

class My_reports(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=report_data_by_id(id)
            return JsonResponse(ret,safe=False)     
        except Exception as e:
            return JsonResponse(e)


class srore_msg(APIView):
    @staticmethod
    def post(request):
        try:
            ret=store_admin_msg(request)
            return Response({'msg':ret})
        except Exception as e:
            return JsonResponse(e)
class get_admin_msg(APIView):
    @staticmethod
    def get(request,id):
        try:
            ret=get_msgs(id)
            return JsonResponse(ret,safe=False)
        except Exception as e:
            return JsonResponse(e)