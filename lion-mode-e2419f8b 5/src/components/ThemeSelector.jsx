import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const THEMES = [
  {
    id: 'fire',
    name: 'Fire Lion',
    gradient: 'from-orange-600/20 via-red-600/10 to-transparent',
    accent: 'from-orange-500 to-red-600',
    accentSolid: 'bg-orange-500',
    preview: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 'ice',
    name: 'Ice Wolf',
    gradient: 'from-blue-600/20 via-cyan-600/10 to-transparent',
    accent: 'from-blue-500 to-cyan-600',
    accentSolid: 'bg-blue-500',
    preview: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    id: 'venom',
    name: 'Venom Strike',
    gradient: 'from-green-600/20 via-emerald-600/10 to-transparent',
    accent: 'from-green-500 to-emerald-600',
    accentSolid: 'bg-green-500',
    preview: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    gradient: 'from-purple-600/20 via-violet-600/10 to-transparent',
    accent: 'from-purple-500 to-violet-600',
    accentSolid: 'bg-purple-500',
    preview: 'bg-gradient-to-br from-purple-500 to-violet-600'
  },
  {
    id: 'electric',
    name: 'Electric Storm',
    gradient: 'from-yellow-600/20 via-amber-600/10 to-transparent',
    accent: 'from-yellow-500 to-amber-600',
    accentSolid: 'bg-yellow-500',
    preview: 'bg-gradient-to-br from-yellow-500 to-amber-600'
  },
  {
    id: 'blood',
    name: 'Blood Moon',
    gradient: 'from-red-600/20 via-rose-600/10 to-transparent',
    accent: 'from-red-600 to-rose-700',
    accentSolid: 'bg-red-600',
    preview: 'bg-gradient-to-br from-red-600 to-rose-700'
  },
  {
    id: 'stealth',
    name: 'Stealth Mode',
    gradient: 'from-slate-600/20 via-gray-600/10 to-transparent',
    accent: 'from-slate-500 to-gray-600',
    accentSolid: 'bg-slate-500',
    preview: 'bg-gradient-to-br from-slate-500 to-gray-600'
  },
  {
    id: 'neon',
    name: 'Neon Nights',
    gradient: 'from-pink-600/20 via-purple-600/10 to-transparent',
    accent: 'from-pink-500 to-purple-600',
    accentSolid: 'bg-pink-500',
    preview: 'bg-gradient-to-br from-pink-500 to-purple-600'
  }
];

const BACKGROUNDS = [
  {
    id: 'gradient',
    name: 'Pure Gradient',
    type: 'gradient',
    preview: 'bg-gradient-to-br from-slate-900 to-black'
  },
  {
    id: 'grid',
    name: 'Grid Matrix',
    type: 'pattern',
    pattern: 'grid',
    preview: 'bg-black'
  },
  {
    id: 'dots',
    name: 'Dot Pattern',
    type: 'pattern',
    pattern: 'dots',
    preview: 'bg-black'
  },
  {
    id: 'waves',
    name: 'Wave Flow',
    type: 'pattern',
    pattern: 'waves',
    preview: 'bg-gradient-to-b from-slate-900 to-black'
  },
  {
    id: 'urban',
    name: 'Urban Night',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
    preview: 'bg-slate-800'
  },
  {
    id: 'mountain',
    name: 'Mountain Peak',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    preview: 'bg-slate-700'
  },
  {
    id: 'storm',
    name: 'Storm Clouds',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&q=80',
    preview: 'bg-slate-600'
  },
  {
    id: 'forest',
    name: 'Dark Forest',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&q=80',
    preview: 'bg-green-950'
  }
];

export default function ThemeSelector({ isOpen, onClose, currentTheme, currentBackground, onThemeChange, onBackgroundChange }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Customize Your Vibe</h2>
                  <p className="text-sm text-white/40">Make it yours</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white/40 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-8">
              {/* Color Themes */}
              <div>
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Color Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(theme)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        currentTheme.id === theme.id
                          ? 'border-white/40 bg-white/5'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <div className={`w-full h-16 rounded-lg ${theme.preview} mb-3`} />
                      <p className="text-sm font-medium text-white">{theme.name}</p>
                      {currentTheme.id === theme.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backgrounds */}
              <div>
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Background Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {BACKGROUNDS.map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => onBackgroundChange(bg)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        currentBackground.id === bg.id
                          ? 'border-white/40 bg-white/5'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <div className={`w-full h-16 rounded-lg ${bg.preview} mb-3 relative overflow-hidden`}>
                        {bg.type === 'pattern' && bg.pattern === 'grid' && (
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                              backgroundSize: '20px 20px'
                            }}
                          />
                        )}
                        {bg.type === 'pattern' && bg.pattern === 'dots' && (
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                              backgroundSize: '20px 20px'
                            }}
                          />
                        )}
                        {bg.type === 'image' && (
                          <img src={bg.url} alt={bg.name} className="w-full h-full object-cover opacity-40" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-white">{bg.name}</p>
                      {currentBackground.id === bg.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/[0.02]">
              <p className="text-center text-white/30 text-xs">
                Changes are saved automatically
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { THEMES, BACKGROUNDS };