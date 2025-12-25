import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {type AppDispatch} from '../app/store';
import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import {userLogin} from '../lib/api/UserApi';
import {setToken} from '../features/auth/authSlice';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosError} from 'axios';
import Logo from '../assets/Logo.png';
import IllustrasiLogin from '../assets/Illustrasi Login.png';
import {
  LucideAtSign,
  LucideEye,
  LucideEyeOff,
  LucideLockKeyhole,
} from 'lucide-react';
import Button from '../components/Button';

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  password: yup
    .string()
    .required('Password wajib diisi')
    .min(8, 'Password minimal 8 karakter'),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError(null);

      const res = await userLogin({
        email: data.email,
        password: data.password,
      });

      const token = res.data.data.token;

      dispatch(setToken(token));
      navigate('/');
    } catch (err) {
      const message =
        (err as AxiosError<{message: string}>)?.response?.data?.message ||
        'Login gagal, silakan coba lagi';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center items-center bg-white p-8 lg:w-1/2 lg:px-24">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2 text-xl font-bold">
              <img src={Logo} alt="SIMS PPOB" className="h-8 w-8" />
              <span>SIMS PPOB</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
              Masuk atau buat akun
              <br />
              untuk memulai
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideAtSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="masukan email anda"
                  className={`block w-full rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-right text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}

              {/* Password Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideLockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="masukan password anda"
                  className={`block w-full rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <LucideEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <LucideEyeOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-right text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Button loading={loading} text="Masuk" />
            </div>

            <div className="text-center text-sm text-gray-500">
              belum punya akun? registrasi{' '}
              <Link
                to="/register"
                className="font-bold text-[#f42619] hover:text-red-700"
              >
                di sini
              </Link>
            </div>
          </form>
        </div>
        {/* Error Notification */}
        {error && (
          <div className="absolute bottom-8 w-full max-w-md px-4 lg:px-0">
            <div className="flex items-center justify-between rounded bg-red-50 px-4 py-3 text-sm text-red-500">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-2">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Image */}
      <div className="hidden h-screen w-1/2 bg-[#fff1f0] lg:flex items-center justify-center">
        <img
          src={IllustrasiLogin}
          alt="Illustration"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
