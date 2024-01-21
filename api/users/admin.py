from django.contrib import admin
from .models import *
from apiapp.models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Properties)
admin.site.register(Appointment)
admin.site.register(Liked)
admin.site.register(TypeTable)
admin.site.register(NewArrivals)
admin.site.register(Owner)
admin.site.register(Review)
admin.site.register(Prop_Images)



