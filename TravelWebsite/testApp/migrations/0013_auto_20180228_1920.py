# Generated by Django 2.0 on 2018-02-28 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testApp', '0012_auto_20180228_1917'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='location',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='location'),
        ),
    ]
