# Generated by Django 4.1.1 on 2022-10-12 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0009_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='date',
            field=models.DateField(null=True),
        ),
    ]