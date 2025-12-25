import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {getBanner, getServices} from '../lib/api/InformationApi';
import ProfileBanner from '../components/ProfileBanner';
import {useDispatch} from 'react-redux';
import {fetchBalance, fetchProfile} from '../features/user/userSlice';
import type {AppDispatch} from '../app/store';
import {useNavigate} from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const [services, setServices] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    const fetchAdditionalData = async () => {
      try {
        const [servicesResponse, bannersResponse] = await Promise.all([
          getServices(),
          getBanner(),
        ]);
        setServices(servicesResponse.data.data);
        setBanners(bannersResponse.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAdditionalData();
  }, [dispatch]);

  const handleServiceClick = (serviceCode: string) => {
    navigate(`/purchase/${serviceCode}`);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="px-4 md:px-[8%] mt-8">
        <ProfileBanner />
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-8 gap-x-4 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.service_code)}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src={service.service_icon}
                  alt={service.service_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[10px] md:text-xs text-center font-medium text-gray-900 leading-tight max-w-[70px]">
                {service.service_name}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Temukan promo menarik
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner.banner_image}
                alt={banner.banner_name}
                className="h-32 md:h-40 lg:h-[160px] w-auto min-w-[270px] rounded-xl object-contain cursor-pointer hover:opacity-95 transition-opacity"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
