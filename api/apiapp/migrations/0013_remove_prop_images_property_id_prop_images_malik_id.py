# Generated by Django 4.1.1 on 2022-10-14 06:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('apiapp', '0012_prop_images_property_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prop_images',
            name='property_id',
        ),
        migrations.AddField(
            model_name='prop_images',
            name='malik_id',
            field=models.ForeignKey(default=1000, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
