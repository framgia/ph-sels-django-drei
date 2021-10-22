from django.core.management.base import BaseCommand
from faker import Faker
from authentication_app.models import Student


class Command(BaseCommand):
    help = "Command Information"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(0, 30):
            Student.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                avatar=fake.image_url(),
            )
