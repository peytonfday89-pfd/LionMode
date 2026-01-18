import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Zap, PlayCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VoiceSettings({ isOpen, onClose, currentTheme, onSettingsChange }) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    // Load saved settings
    try {
      const saved = localStorage.getItem('voiceSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        setSelectedVoice(settings.voiceURI || '');
        setRate([settings.rate || 1.0]);
        setPitch([settings.pitch || 1.0]);
        setAutoPlay(settings.autoPlay || false);
      }
    } catch (e) {
      // Continue with defaults
    }

    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set default voice if none selected
      if (!selectedVoice && availableVoices.length > 0) {
        const defaultVoice = availableVoices.find(v => v.default) || availableVoices[0];
        setSelectedVoice(defaultVoice.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const saveSettings = () => {
    const settings = {
      voiceURI: selectedVoice,
      rate: rate[0],
      pitch: pitch[0],
      autoPlay
    };

    try {
      localStorage.setItem('voiceSettings', JSON.stringify(settings));
    } catch (e) {
      // Continue anyway
    }

    onSettingsChange(settings);
    onClose();
  };

  const testVoice = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("This is how I sound. Let's crush your goals together!");
    
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];

    window.speechSynthesis.speak(utterance);
  };

  const getVoiceLabel = (voice) => {
    const parts = [voice.name];
    if (voice.lang) parts.push(`(${voice.lang})`);
    return parts.join(' ');
  };

  // Group voices by language
  const groupedVoices = voices.reduce((acc, voice) => {
    const lang = voice.lang.split('-')[0].toUpperCase();
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(voice);
    return acc;
  }, {});

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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.accent} flex items-center justify-center`}>
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Voice Settings</h2>
                  <p className="text-sm text-white/40">Customize your audio experience</p>
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
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Voice Selection */}
              <div>
                <Label className="text-white/70 mb-3 block">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-white/10">
                    {Object.entries(groupedVoices).map(([lang, voiceList]) => (
                      <div key={lang}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-white/40">
                          {lang}
                        </div>
                        {voiceList.map((voice) => (
                          <SelectItem 
                            key={voice.voiceURI} 
                            value={voice.voiceURI}
                            className="text-white hover:bg-white/10"
                          >
                            {getVoiceLabel(voice)}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Speech Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-white/70">Speech Rate</Label>
                  <span className="text-sm text-white/40">{rate[0].toFixed(1)}x</span>
                </div>
                <Slider
                  value={rate}
                  onValueChange={setRate}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-white"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Pitch */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-white/70">Pitch</Label>
                  <span className="text-sm text-white/40">{pitch[0].toFixed(1)}</span>
                </div>
                <Slider
                  value={pitch}
                  onValueChange={setPitch}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="[&_[role=slider]]:bg-white"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Auto-play on new quote */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentTheme.accent} flex items-center justify-center`}>
                      <PlayCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Label className="text-white font-medium">Auto-play Quotes</Label>
                      <p className="text-xs text-white/40 mt-0.5">
                        Automatically speak each new hourly quote
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                  />
                </div>
              </div>

              {/* Test Voice */}
              <Button
                onClick={testVoice}
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/5"
              >
                <Zap className="w-4 h-4 mr-2" />
                Test Voice
              </Button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-white/40 hover:text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={saveSettings}
                className={`bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white`}
              >
                Save Settings
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}