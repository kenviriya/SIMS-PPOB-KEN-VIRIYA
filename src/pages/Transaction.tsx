import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {transactionHistory} from '../lib/api/TransactionApi';
import ProfileBanner from '../components/ProfileBanner';
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../app/store';
import {fetchProfile, fetchBalance} from '../features/user/userSlice';

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const fetchTransactions = async (currentOffset: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await transactionHistory(currentOffset, limit);
      const newTransactions = response.data.data.records;

      if (newTransactions.length < limit) {
        setHasMore(false);
      }

      setTransactions((prev) =>
        currentOffset === 0 ? newTransactions : [...prev, ...newTransactions],
      );
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    fetchTransactions(0);
  }, []);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchTransactions(newOffset);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
      .format(date)
      .replace('pukul ', '');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="px-4 md:px-[8%] mt-8">
        <ProfileBanner />
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Semua Transaksi
          </h2>

          <div className="space-y-4 mb-8">
            {transactions.map((transaction, index) => (
              <div
                key={`${transaction.invoice_number}-${index}`}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <div
                    className={`text-xl font-bold mb-1 ${
                      transaction.transaction_type === 'TOPUP'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {transaction.transaction_type === 'TOPUP' ? '+ ' : '- '}
                    Rp {transaction.total_amount.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(transaction.created_on)}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {transaction.description}
                </div>
              </div>
            ))}

            {transactions.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-8">
                Maaf tidak ada histori transaksi saat ini
              </div>
            )}
          </div>

          {hasMore && (
            <div className="text-center">
              <button
                onClick={handleShowMore}
                disabled={loading}
                className="text-red-500 font-medium hover:text-red-600 disabled:opacity-50"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
