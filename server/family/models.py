from django.db import models


class FamilyMember(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    name_kk = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200, blank=True, default='')
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='male')
    birth_year = models.IntegerField(null=True, blank=True)
    death_year = models.IntegerField(null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    description = models.TextField(blank=True, default='')
    description_ru = models.TextField(blank=True, default='')
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children',
    )
    generation = models.IntegerField(default=1)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name_kk} (gen {self.generation})"
