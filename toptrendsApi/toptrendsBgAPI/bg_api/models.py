from django.db import models

"""

    INFO: 
    these models define the structure of two related tables in the database. 
    The Query model represents queries related to Google Trends data, and 
    the UsersCom model represents user commentary associated with those queries. 
    The ForeignKey in the UsersCom model establishes a link between the two tables.

"""


class Query(models.Model):
    country_name = models.TextField(max_length=255)
    query_name = models.TextField(max_length=255)
    query_comentary = models.TextField(max_length=255)
    is_top_term = models.BooleanField()
    is_top_rising = models.BooleanField()
    is_orderRank = models.BooleanField()
    is_orderScore = models.BooleanField()
    is_today = models.BooleanField()
    es_date = models.DateField()
    user_name = models.TextField(max_length=255)


class UsersCom(models.Model):
    query = models.ForeignKey(Query, on_delete=models.CASCADE, related_name='userscom')
    user_com = models.TextField(max_length=255)
    user_name = models.TextField(max_length=255)

    def __str__(self):
        return self.name
