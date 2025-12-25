import ProfilePhoto from '../assets/Profile Photo.png';
import BackgroundSaldo from '../assets/Background Saldo.png';
import {Eye, EyeOff} from 'lucide-react';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../app/store';
import {setShowBalance} from '../features/user/userSlice';

export default function ProfileBanner() {
  const dispatch = useDispatch();
  const {profile, balance, showBalance} = useSelector(
    (state: RootState) => state.user,
  );
  const defaultProfileImage = ProfilePhoto;

  const displayImage =
    profile.profileImage &&
    profile.profileImage !== 'null' &&
    profile.profileImage !== ''
      ? profile.profileImage
      : defaultProfileImage;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
      <div className="w-full md:w-[40%] text-center md:text-left">
        <img
          src={displayImage}
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4 mx-auto md:mx-0 object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultProfileImage;
          }}
        />
        <p className="text-gray-500 text-lg">Selamat datang,</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          {profile.firstName && profile.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : 'Nama User'}
        </h1>
      </div>

      <div className="w-full md:w-[60%] relative rounded-2xl overflow-hidden shadow-lg bg-[#F13B2F] text-white p-6 h-48 flex flex-col justify-center">
        <img
          src={BackgroundSaldo}
          alt=""
          className="absolute right-0 top-0 h-full w-auto object-cover opacity-80"
        />

        <div className="relative z-10">
          <p className="text-white/80 mb-2">Saldo anda</p>
          <div className="text-3xl font-bold mb-4 tracking-wider min-h-[40px]">
            {showBalance ? (
              <span>Rp {balance}</span>
            ) : (
              <span className="text-4xl translate-y-2 inline-block">
                •••••••
              </span>
            )}
          </div>
          <p className="text-sm font-medium flex items-center gap-2">
            Lihat Saldo
            <button
              onClick={() => dispatch(setShowBalance(!showBalance))}
              className="hover:opacity-80 transition-opacity focus:outline-none"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
