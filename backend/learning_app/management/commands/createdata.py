from django.core.management.base import BaseCommand
from faker import Faker
from authentication_app.models import Student
from learning_app.models import Category, Question, Choice


class Command(BaseCommand):
    help = "Command Information"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(0, 20):
            # Student.objects.create(
            #     is_superuser=True,
            #     email=fake.email(),
            #     first_name=fake.first_name(),
            #     last_name=fake.last_name(),
            #     password=fake.password(),
            # )
            Category.objects.create(title=fake.word(), description=fake.sentence())
