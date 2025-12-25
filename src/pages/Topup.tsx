import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ProfileBanner from '../components/ProfileBanner';
import {Wallet} from 'lucide-react';
import {topUp} from '../lib/api/TransactionApi';
import Modal from '../components/Modal';
import {fetchBalance} from '../features/user/userSlice';
import Navbar from '../components/Navbar';

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopupPage() {
  const [amount, setAmount] = useState<number | ''>('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'success' | 'failed'>(
    'confirm',
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = Number(value);
    setAmount(value === '' ? '' : numValue);
    setIsValid(numValue >= 10000 && numValue <= 1000000);
  };

  const handlePresetClick = (preset: number) => {
    setAmount(preset);
    setIsValid(true);
  };

  const handleTopUpClick = () => {
    if (isValid && amount) {
      setModalType('confirm');
      setModalOpen(true);
    }
  };

  const handleConfirmTopUp = async () => {
    if (!amount || typeof amount !== 'number') return;

    try {
      await topUp(amount);
      setModalType('success');

      dispatch(fetchBalance() as any);
    } catch (error) {
      console.error('TopUp Failed', error);
      setModalType('failed');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (modalType === 'success') {
      navigate('/');
      setAmount('');
      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />
      <div className="px-4 md:px-[8%] mt-8">
        <ProfileBanner />

        <div className="mb-2">
          <h2 className="text-xl text-gray-800">Silahkan masukan</h2>
          <h1 className="text-3xl font-bold text-gray-900">Nominal Top Up</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2 space-y-4">
            <div className="relative">
              <Wallet
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="masukkan nominal Top Up"
                value={amount ? amount.toLocaleString('id-ID') : ''}
                onChange={handleAmountChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              />
            </div>

            <button
              disabled={!isValid}
              onClick={handleTopUpClick}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors
                        ${
                          isValid
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-300 cursor-not-allowed'
                        }
                    `}
            >
              Top Up
            </button>
          </div>

          <div className="md:col-span-1 grid grid-cols-3 gap-4">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`py-3 px-2 border rounded-lg text-sm transition-colors
                             ${
                               amount === preset
                                 ? 'border-red-500 text-red-500 bg-red-50 font-medium'
                                 : 'border-gray-300 text-gray-600 hover:border-gray-400'
                             }
                        `}
              >
                Rp{preset.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          type={modalType}
          amount={Number(amount)}
          onConfirm={handleConfirmTopUp}
        />
      </div>
    </div>
  );
}
