from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import User, OTP
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer

class RegisterView(views.APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp_obj = OTP.objects.create(phone_number=user.phone_number)
            otp_obj.generate_code()
            return Response({
                "message": "OTP sent to your phone (check terminal)",
                "phone_number": user.phone_number
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(views.APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        code = request.data.get('code')
        
        try:
            otp_obj = OTP.objects.filter(phone_number=phone_number, code=code).latest('created_at')
            user = User.objects.get(phone_number=phone_number)
            user.is_active = True
            user.save()
            
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": UserSerializer(user).data,
                "message": "Verification successful"
            })
        except (OTP.DoesNotExist, User.DoesNotExist):
            return Response({"error": "Invalid OTP or Phone Number"}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        
        user = authenticate(username=phone_number, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid credentialsTags"}, status=status.HTTP_401_UNAUTHORIZED)
