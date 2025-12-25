import {Link, useLocation} from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-gray-200 py-4 px-4 md:px-[8%] flex justify-between items-center bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="SIMS PPOB Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-gray-900">SIMS PPOB</span>
      </Link>

      <div className="flex items-center gap-8 md:gap-12 text-gray-700 font-medium">
        <Link
          to="/topup"
          className={`${
            isActive('/topup') ? 'text-[#F13B2F]' : 'hover:text-[#F13B2F]'
          } transition-colors`}
        >
          Top Up
        </Link>
        <Link
          to="/transaction"
          className={`${
            isActive('/transaction') ? 'text-[#F13B2F]' : 'hover:text-[#F13B2F]'
          } transition-colors`}
        >
          Transaction
        </Link>
        <Link
          to="/account"
          className={`${
            isActive('/account') ? 'text-[#F13B2F]' : 'hover:text-[#F13B2F]'
          } transition-colors`}
        >
          Akun
        </Link>
      </div>
    </nav>
  );
}
