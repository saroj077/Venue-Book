# Generated by Django 5.1.7 on 2025-04-01 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_venue_venueownerid'),
    ]

    operations = [
        migrations.AddField(
            model_name='venue',
            name='max_capacity',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='venue',
            name='max_price',
            field=models.DecimalField(decimal_places=2, default=500, max_digits=10),
        ),
        migrations.AddField(
            model_name='venue',
            name='min_price',
            field=models.DecimalField(decimal_places=2, default=100, max_digits=10),
        ),
    ]
