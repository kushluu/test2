# Generated by Django 4.1.1 on 2022-10-31 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0025_remove_catogary_full_fury_catogary_full_fur'),
    ]

    operations = [
        migrations.AddField(
            model_name='properties',
            name='catogary',
            field=models.ManyToManyField(to='apiapp.catogary'),
        ),
    ]
