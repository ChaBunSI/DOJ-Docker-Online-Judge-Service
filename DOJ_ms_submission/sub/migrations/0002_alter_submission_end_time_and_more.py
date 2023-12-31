# Generated by Django 4.2.7 on 2023-11-12 07:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("sub", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="submission",
            name="end_time",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="submission",
            name="start_time",
            field=models.DateTimeField(
                blank=True, default=django.utils.timezone.localtime, null=True
            ),
        ),
    ]
