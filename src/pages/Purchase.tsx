import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Wallet} from 'lucide-react';
import Navbar from '../components/Navbar';
import ProfileBanner from '../components/ProfileBanner';
import Modal from '../components/Modal';
import {getServices} from '../lib/api/InformationApi';
import {purchase} from '../lib/api/TransactionApi';
import {fetchBalance, fetchProfile} from '../features/user/userSlice';
import type {AppDispatch} from '../app/store';

export default function PurchasePage() {
  const {serviceCode} = useParams<{serviceCode: string}>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [service, setService] = useState<any>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());

    const fetchServiceData = async () => {
      try {
        const response = await getServices();
        const services = response.data.data;
        const found = services.find((s: any) => s.service_code === serviceCode);
        if (found) {
          setService(found);
        } else {
          console.error('Service not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServiceData();
  }, [serviceCode, dispatch, navigate]);

  const handlePurchase = async () => {
    if (!serviceCode) return;
    setIsConfirmModalOpen(false);
    setIsLoading(true);
    try {
      await purchase(serviceCode);
      setIsSuccessModalOpen(true);
      dispatch(fetchBalance());
    } catch (error) {
      console.error('Purchase failed:', error);
      setIsFailedModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-8 text-center text-gray-500">
          Memuat data layanan...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />
      <main className="px-4 md:px-[8%] mt-8">
        <ProfileBanner />

        <div className="mt-8">
          <p className="text-gray-900 mb-2">PemBayaran</p>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {service.service_name}
            </h2>
          </div>

          <div className="max-w-full">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Wallet className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                readOnly
                value={service.service_tariff.toLocaleString('id-ID')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none bg-white font-medium text-gray-700"
              />
            </div>

            <button
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isLoading}
              className={`w-full py-3 rounded-md font-bold text-white transition-colors ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#F13B2F] hover:bg-[#d93429]'
              }`}
            >
              {isLoading ? 'Memproses...' : 'Bayar'}
            </button>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        type="confirm"
        amount={service.service_tariff}
        serviceName={service.service_name}
        onConfirm={handlePurchase}
      />

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate('/');
        }}
        type="success"
        amount={service.service_tariff}
        serviceName={service.service_name}
      />

      <Modal
        isOpen={isFailedModalOpen}
        onClose={() => {
          setIsFailedModalOpen(false);
          navigate('/');
        }}
        type="failed"
        amount={service.service_tariff}
        serviceName={service.service_name}
      />
    </div>
  );
}
