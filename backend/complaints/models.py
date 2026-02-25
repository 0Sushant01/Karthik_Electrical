from django.db import models

class Complaint(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    customer_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    issue_category = models.CharField(max_length=255, blank=True, null=True)
    issue_description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __clstr__(self):
        return f"{self.customer_name} - {self.status}"
