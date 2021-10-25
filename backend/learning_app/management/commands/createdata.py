from django.core.management.base import BaseCommand
from faker import Faker
from authentication_app.models import Student
from learning_app.models import Category


class Command(BaseCommand):
    help = "Command Information"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(0, 30):
            Category.objects.create(title=fake.word(), description=fake.sentence())
