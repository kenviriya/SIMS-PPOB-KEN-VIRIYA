import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import IllustrasiLogin from '../assets/Illustrasi Login.png';
import Logo from '../assets/Logo.png';
import {
  LucideAtSign,
  LucideEye,
  LucideEyeOff,
  LucideLockKeyhole,
  LucideUser,
} from 'lucide-react';
import {userRegister} from '../lib/api/UserApi';
import Button from '../components/Button';

type RegisterForm = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
};

const registerSchema = yup.object({
  email: yup
    .string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  first_name: yup.string().required('Nama depan wajib diisi'),
  last_name: yup.string().required('Nama belakang wajib diisi'),
  password: yup
    .string()
    .required('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
  confirm_password: yup
    .string()
    .required('Konfirmasi password wajib diisi')
    .oneOf([yup.ref('password')], 'Password tidak sama'),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      setError(null);

      await userRegister(data);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      <div className="flex w-full flex-col justify-center items-center bg-white p-8 lg:w-1/2 lg:px-24">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2 text-xl font-bold">
              <img src={Logo} alt="SIMS PPOB" className="h-8 w-8" />
              <span>SIMS PPOB</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
              Lengkapi data untuk
              <br />
              membuat akun
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
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

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="masukan nama depan"
                  className={`block w-full rounded-md border ${
                    errors.first_name ? 'border-red-500' : 'border-gray-300'
                  } py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm`}
                  {...register('first_name')}
                />
              </div>
              {errors.first_name && (
                <p className="text-right text-xs text-red-500">
                  {errors.first_name.message}
                </p>
              )}

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="masukan nama belakang"
                  className={`block w-full rounded-md border ${
                    errors.last_name ? 'border-red-500' : 'border-gray-300'
                  } py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm`}
                  {...register('last_name')}
                />
              </div>
              {errors.last_name && (
                <p className="text-right text-xs text-red-500">
                  {errors.last_name.message}
                </p>
              )}

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideLockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="buat password"
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

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LucideLockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="konfirmasi password"
                  className={`block w-full rounded-md border ${
                    errors.confirm_password
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm`}
                  {...register('confirm_password')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <LucideEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <LucideEyeOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-right text-xs text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <div>
              <Button loading={loading} text="Registrasi" />
            </div>

            <div className="text-center text-sm text-gray-500">
              sudah punya akun?{' '}
              <Link
                to="/login"
                className="font-bold text-[#f42619] hover:text-red-700"
              >
                di sini
              </Link>
            </div>
          </form>
        </div>
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
