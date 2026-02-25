from django.contrib import admin
from .models import User, OTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'full_name', 'is_staff', 'is_active', 'date_joined')
    search_fields = ('phone_number', 'full_name')
    list_filter = ('is_staff', 'is_active')

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'code', 'created_at', 'is_verified')
    search_fields = ('phone_number', 'code')
    list_filter = ('is_verified', 'created_at')
