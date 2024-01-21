from django.urls import path
from .views import *

urlpatterns = [
    path('', All_Properties.as_view()),
    path('<int:id>/', Property.as_view()),
    path('like_func/<int:p_id>/<int:c_id>',like_func.as_view()),
    # path('Register_Property',Register_Property.as_view()),
    path('upload/',upload_file.as_view()),
    path('wishlist/<int:id>',wishlist.as_view()),
    path('delete/<int:id>/<int:cid>',delete.as_view()),
    path('onefilter',new_one_filter.as_view()),
    path('filter',new_Filtered_Properties.as_view()),
    path('review',add_Review.as_view()),
    path('getreview/<int:id>',GetReview.as_view()),
    path('User_properties/<int:id>',User_properties.as_view()),
    path('delete_product/<int:id>',delete_users_product.as_view()),
    path('bookappointment',bookappointment.as_view()),
    path('my_appointments/<int:id>',my_appointments.as_view()),
    path('accept/<int:id>',Accept.as_view()),
    path('reject/<int:id>',Reject.as_view()),
    path('withdraw/<int:id>',Withdraw.as_view()),
    path('search',Search.as_view()),
    path('imges/<int:id>',My_imgs.as_view()),
    path('uploadimages',Upload_Images.as_view()),
    path('newarrivals',New_Arrivals.as_view()),
    path('new_Register_Property',new_Register_Property.as_view()),
    path('report',File_Report.as_view()),
    path('getreports',Get_reports.as_view()),
    path('catagorygraph',Graph_data.as_view()),
    path('reportgraph',Graph_report.as_view()),
    path('reports/<int:id>',My_reports.as_view()),
    path('message_from_admin',srore_msg.as_view()),
    path('get_msg_from_admin/<int:id>',get_admin_msg.as_view()),

    # path('cattypdata',reg_type.as_view()),


]
