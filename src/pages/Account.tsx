import {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AtSign, User, Pencil} from 'lucide-react';
import Navbar from '../components/Navbar';
import {logout} from '../features/auth/authSlice';
import {
  getProfile,
  updateProfile,
  updateImageProfile,
} from '../lib/api/UserApi';
import ProfilePhoto from '../assets/Profile Photo.png';

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    profileImage: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const defaultProfileImage = ProfilePhoto;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const data = response.data.data;
      setProfile({
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profileImage: data.profile_image,
      });
      setFormData({
        firstName: data.first_name,
        lastName: data.last_name,
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      setProfile((prev) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }));

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024) {
        alert('File size exceeds 100KB');
        return;
      }

      try {
        await updateImageProfile(file);

        fetchProfile();
      } catch (error) {
        console.error('Failed to update profile image:', error);
        alert('Failed to update profile image.');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="px-4 md:px-[20%] mt-8 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border border-gray-200 p-1">
            <img
              src={
                profile.profileImage
                  ? profile.profileImage
                  : defaultProfileImage
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = defaultProfileImage;
              }}
            />
          </div>
          <button
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Pencil size={16} className="text-gray-900" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept=".png,.jpeg,.jpg"
            />
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {profile.firstName} {profile.lastName}
        </h1>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nama Depan
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={isEditing ? formData.firstName : profile.firstName}
                onChange={(e) =>
                  setFormData({...formData, firstName: e.target.value})
                }
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 ${
                  isEditing
                    ? 'border-gray-300 bg-white text-gray-900'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nama Belakang
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={isEditing ? formData.lastName : profile.lastName}
                onChange={(e) =>
                  setFormData({...formData, lastName: e.target.value})
                }
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 ${
                  isEditing
                    ? 'border-gray-300 bg-white text-gray-900'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-[#F13B2F] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Simpan
              </button>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="w-full bg-[#F13B2F] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  Edit Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-white border border-[#F13B2F] text-[#F13B2F] py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
