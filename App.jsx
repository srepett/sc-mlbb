import React, { useState } from 'react';
import { Sword, Shield, Zap, Crosshair, Heart, Skull, ChevronLeft, ArrowRight, User, X } from 'lucide-react';

// --- DATA KONFIGURASI ---
const THEME_COLOR = "#00ddff"; // Warna utama sesuai request

// Data Hero dan Role
const gameData = {
  Assassin: {
    icon: <Skull size={32} />,
    heroes: ['Lancelot', 'Fanny', 'Hayabusa', 'Gusion', 'Ling', 'Benedetta']
  },
  Fighter: {
    icon: <Sword size={32} />,
    heroes: ['Alucard', 'Lapu-Lapu', 'Zilong', 'Chou', 'Yu Zhong', 'Dyroth']
  },
  Mage: {
    icon: <Zap size={32} />,
    heroes: ['Nana', 'Novaria', 'Pharsa', 'Kagura', 'Lunox', 'Valentina']
  },
  Tank: {
    icon: <Shield size={32} />,
    heroes: ['Franco', 'Tigreal', 'Atlas', 'Khufra', 'Johnson', 'Grock']
  },
  Support: {
    icon: <Heart size={32} />,
    heroes: ['Floryn', 'Mathilda', 'Angela', 'Estes', 'Rafaela', 'Diggie']
  },
  Marksman: {
    icon: <Crosshair size={32} />,
    heroes: ['Miya', 'Granger', 'Brody', 'Layla', 'Beatrix', 'Claude']
  }
};

// --- KOMPONEN UTAMA ---
export default function App() {
  // State untuk Routing Sederhana
  const [currentPath, setCurrentPath] = useState('/'); // '/', '/Role', '/Role/[Name]/Hero'
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);

  // Fungsi Navigasi
  const navigateToHome = () => {
    setCurrentPath('/');
    setSelectedRole(null);
    setSelectedHero(null);
  };

  const navigateToRoles = () => {
    setCurrentPath('/Role');
    setSelectedRole(null);
  };

  const navigateToHeroes = (roleKey) => {
    setSelectedRole(roleKey);
    setCurrentPath(`/Role/${roleKey}/Hero`);
  };

  // Fungsi untuk mendapatkan tampilan URL saat ini (Kosmetik)
  const getDisplayURL = () => {
    return `domain.com${currentPath}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-[#00ddff] selection:text-black overflow-hidden relative">
      
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ddff] blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-700 blur-[150px]"></div>
      </div>

      {/* --- HEADER / FAKE BROWSER BAR --- */}
      <div className="relative z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-3 flex items-center gap-3 sticky top-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-slate-800 rounded-full px-4 py-1.5 text-xs text-slate-400 font-mono truncate flex items-center justify-between">
          <span>{getDisplayURL()}</span>
          {currentPath !== '/' && (
            <button onClick={navigateToHome} className="hover:text-[#00ddff] transition-colors">
              <User size={12} />
            </button>
          )}
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md md:max-w-4xl min-h-[85vh] flex flex-col">
        
        {/* TINGKAT 1: HOMEPAGE */}
        {currentPath === '/' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,221,255,0.5)]">
              LEGENDS <span className="text-[#00ddff]">ROSTER</span>
            </h1>
            <p className="text-slate-400 mb-12 max-w-md text-lg">
              Temukan Hero terbaik untuk setiap Role dan kuasai Land of Dawn.
            </p>
            
            <button 
              onClick={navigateToRoles}
              className="group relative px-10 py-4 font-bold text-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-[#00ddff] rounded-sm skew-x-[-10deg] group-hover:skew-x-[-5deg] transition-transform duration-300 shadow-[0_0_20px_#00ddff]"></div>
              <span className="relative flex items-center gap-2">
                Download / Mulai <ArrowRight size={20} />
              </span>
            </button>
          </div>
        )}

        {/* TINGKAT 2: ROLE PAGE */}
        {currentPath === '/Role' && (
          <div className="animate-fadeInUp">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold border-l-4 border-[#00ddff] pl-4">
                Pilih <span className="text-[#00ddff]">Role</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(gameData).map((role) => (
                <button
                  key={role}
                  onClick={() => navigateToHeroes(role)}
                  className="relative group overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-[#00ddff] p-6 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_15px_rgba(0,221,255,0.3)]"
                >
                  <div className="text-slate-400 group-hover:text-[#00ddff] transition-colors duration-300 transform group-hover:scale-110">
                    {gameData[role].icon}
                  </div>
                  <span className="text-xl font-bold tracking-wide uppercase">{role}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00ddff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TINGKAT 3: HERO PAGE */}
        {currentPath.includes('/Hero') && selectedRole && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={navigateToRoles}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-[#00ddff] transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Role Category</p>
                <h2 className="text-3xl font-bold text-[#00ddff] flex items-center gap-2">
                  {gameData[selectedRole].icon} {selectedRole}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {gameData[selectedRole].heroes.map((hero) => (
                <button
                  key={hero}
                  onClick={() => setSelectedHero(hero)}
                  className="relative bg-slate-800 hover:bg-slate-700 border-l-2 border-transparent hover:border-[#00ddff] p-4 rounded-r-lg transition-all duration-200 text-left group overflow-hidden"
                >
                   {/* Decorative ID number styling */}
                   <span className="absolute right-2 top-1 text-[40px] font-bold text-white/5 pointer-events-none group-hover:text-[#00ddff]/10">
                    {hero.substring(0,2).toUpperCase()}
                  </span>
                  
                  <h3 className="text-lg font-semibold z-10 relative group-hover:translate-x-1 transition-transform">
                    {hero}
                  </h3>
                  <p className="text-xs text-slate-400 z-10 relative">Tap untuk detail</p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL HERO DETAIL (Pilihan A: Aksi Klik) */}
      {selectedHero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-[#00ddff] w-full max-w-sm rounded-2xl p-6 relative shadow-[0_0_50px_rgba(0,221,255,0.2)] transform scale-100 animate-popIn">
            <button 
              onClick={() => setSelectedHero(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mt-4">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full mx-auto flex items-center justify-center border-2 border-[#00ddff] mb-4 shadow-[0_0_15px_#00ddff]">
                <User size={40} className="text-[#00ddff]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{selectedHero}</h2>
              <span className="px-3 py-1 rounded-full bg-[#00ddff]/20 text-[#00ddff] text-xs font-bold uppercase tracking-wider">
                {selectedRole}
              </span>
              
              <div className="mt-6 space-y-3">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-red-500 w-[80%]"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Attack</span>
                  <span>80%</span>
                </div>
                
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-[60%]"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Defense</span>
                  <span>60%</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedHero(null)} // Hanya tutup modal
                className="mt-8 w-full py-3 rounded-lg bg-[#00ddff] text-black font-bold hover:bg-[#6eefff] transition-colors"
              >
                Pilih Hero Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animasi Tambahan */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out; }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      `}</style>
    </div>
  );
}
