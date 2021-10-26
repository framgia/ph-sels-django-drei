from django.core.management.base import BaseCommand
from faker import Faker
from authentication_app.models import Student
from learning_app.models import Category,Question,Choice


class Command(BaseCommand):
    help = "Command Information"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(0, 10):
           obj=Category.objects.create(title=fake.word(), description=fake.sentence())
           for i in range(0,3):
               question = Question.objects.create(category=obj,description=fake.sentence())
               for i in range(0,3):
                   Choice.objects.create(question=question,value=fake.word())
        
