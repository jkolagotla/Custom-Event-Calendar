// src/pages/Auth.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!isLogin && !formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!isLogin && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(`${isLogin ? 'Logging in' : 'Registering'} with:`, formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-[#FFDCEF] hover:text-[#FF69B4] hover:bg-[#1A1A1A]/20 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-[#1A1A1A]/60 backdrop-blur-md border border-[#555555]/30 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] p-3 rounded-xl">
                <Calendar className="h-8 w-8 text-[#0A0A0A]" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-[#FFDCEF]">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription className="text-[#AAAAAA]">{isLogin ? 'Sign in to access your calendar' : 'Join EventFlow today'}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#FFDCEF]">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-[#0A0A0A] text-[#FFDCEF] border-2 ${errors.name ? 'border-red-500' : 'border-[#555555]'} focus:border-[#FF69B4]`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#FFDCEF]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-[#0A0A0A] text-[#FFDCEF] border-2 ${errors.email ? 'border-red-500' : 'border-[#555555]'} focus:border-[#FF69B4]`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#FFDCEF]">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`bg-[#0A0A0A] text-[#FFDCEF] border-2 ${errors.phone ? 'border-red-500' : 'border-[#555555]'} focus:border-[#FF69B4]`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#FFDCEF]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`bg-[#0A0A0A] text-[#FFDCEF] pr-10 border-2 ${errors.password ? 'border-red-500' : 'border-[#555555]'} focus:border-[#FF69B4]`}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-[#555555]" /> : <Eye className="h-4 w-4 text-[#555555]" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF] text-[#0A0A0A] font-semibold py-2 rounded-lg transition-all"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-[#AAAAAA]">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#FFDCEF] hover:text-[#FF69B4] font-semibold ml-1"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
