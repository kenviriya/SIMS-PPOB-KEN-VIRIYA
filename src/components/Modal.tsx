import {CheckCircle, XCircle} from 'lucide-react';
import Logo from '../assets/logo.png';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirm' | 'success' | 'failed';
  amount?: number;
  onConfirm?: () => void;
  message?: string;
  serviceName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  type,
  amount,
  onConfirm,
  serviceName,
  message,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center animate-fade-in relative">
        <div className="mb-6 flex justify-center">
          {type === 'confirm' && (
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 object-contain brightness-0 invert"
              />
            </div>
          )}
          {type === 'success' && (
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          )}
          {type === 'failed' && (
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          )}
        </div>

        {type === 'confirm' && (
          <>
            <p className="text-gray-600 mb-2">
              {serviceName
                ? `Beli ${serviceName} senilai`
                : 'Anda yakin untuk Top Up sebesar'}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Rp{amount?.toLocaleString('id-ID')} ?
            </h3>

            <button
              onClick={onConfirm}
              className="w-full text-red-500 font-bold mb-4 py-2 hover:bg-gray-50 rounded"
            >
              {serviceName ? 'Ya, lanjutkan Bayar' : 'Ya, lanjutkan Top Up'}
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-400 font-semibold py-2 hover:bg-gray-50 rounded"
            >
              Batalkan
            </button>
          </>
        )}

        {(type === 'success' || type === 'failed') && (
          <>
            <p className="text-gray-900 text-lg mb-2">
              {serviceName
                ? `Pembayaran ${serviceName} sebesar`
                : 'Top Up sebesar'}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Rp{amount?.toLocaleString('id-ID')}
            </h3>
            <p className="text-gray-600 mb-6">
              {message || (type === 'success' ? 'berhasil!' : 'gagal')}
            </p>

            <button
              onClick={onClose}
              className="text-red-500 font-bold hover:underline"
            >
              Kembali ke Beranda
            </button>
          </>
        )}
      </div>
    </div>
  );
}
