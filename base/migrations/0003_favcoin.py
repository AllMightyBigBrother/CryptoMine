# Generated by Django 3.2.6 on 2021-09-23 08:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0002_alter_crypto_csv_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavCoin',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('coin', models.CharField(blank=True, max_length=75, null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
