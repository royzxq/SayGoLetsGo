from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

#
#
# class RegisterForm(forms.ModelForm):
#     password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
#     password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)
#
#     class Meta:
#         model = AbstractUser
#         fields = ('username', 'firstname', 'lastname', 'email', 'birth', 'gender', 'password')
#
#
#     def clean_user(self):
#         username = self.cleaned_data.get('username')
#         qs = AbstractUser.objects.filter(username=username)
#         if qs.exists():
#             raise forms.ValidationError('username is taken')
#         return username
#
#     def clean_email(self):
#         email = self.cleaned_data.get('email')
#         qs = AbstractUser.objects.filter(email=email)
#         if qs.exists():
#             raise forms.ValidationError("email is taken")
#         return email
#
#     def clean_password(self):
#         # Check that the two password entries match
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         if password1 and password2 and password1 != password2:
#             raise forms.ValidationError("Passwords don't match")
#         return password2


