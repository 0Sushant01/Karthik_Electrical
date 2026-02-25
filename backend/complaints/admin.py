from django.contrib import admin
from .models import Complaint

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'phone', 'issue_category', 'status', 'created_at')
    list_filter = ('status', 'issue_category', 'created_at')
    search_fields = ('customer_name', 'phone', 'issue_description', 'address')
    readonly_fields = ('created_at', 'updated_at')
