# Generated by Django 4.1.1 on 2022-10-28 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0023_alter_properties_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catogary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('apartment', models.BooleanField(default=False)),
                ('independent_house', models.BooleanField(default=False)),
                ('independent_floor', models.BooleanField(default=False)),
                ('duplex', models.BooleanField(default=False)),
                ('penthouse', models.BooleanField(default=False)),
                ('villa', models.BooleanField(default=False)),
                ('one_bhk', models.BooleanField(default=False)),
                ('two_bhk', models.BooleanField(default=False)),
                ('three_bhk', models.BooleanField(default=False)),
                ('swimmingpool', models.BooleanField(default=False)),
                ('gated_community', models.BooleanField(default=False)),
                ('gym', models.BooleanField(default=False)),
                ('lift', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('powerbackup', models.BooleanField(default=False)),
                ('male', models.BooleanField(default=False)),
                ('female', models.BooleanField(default=False)),
                ('full_fury', models.BooleanField(default=False)),
                ('partially_fur', models.BooleanField(default=False)),
                ('not_fur', models.BooleanField(default=False)),
                ('single', models.BooleanField(default=False)),
                ('married', models.BooleanField(default=False)),
                ('coliving', models.BooleanField(default=False)),
                ('buy', models.BooleanField(default=False)),
                ('rent', models.BooleanField(default=False)),
                ('lease', models.BooleanField(default=False)),
            ],
        ),
    ]