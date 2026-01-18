import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Check, Edit2, Trash2, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function DailyGoal({ currentTheme }) {
  const [goal, setGoal] = useState(() => {
    try {
      const today = new Date().toDateString();
      const stored = localStorage.getItem('dailyGoal');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reset if it's a new day
        if (parsed.date === today) {
          return parsed;
        }
      }
    } catch (e) {
      // Continue
    }
    return { text: '', completed: false, date: new Date().toDateString() };
  });

  const [isEditing, setIsEditing] = useState(!goal.text);
  const [inputValue, setInputValue] = useState(goal.text);

  const saveGoal = () => {
    if (!inputValue.trim()) {
      toast.error("Goal can't be empty");
      return;
    }

    const newGoal = {
      text: inputValue.trim(),
      completed: false,
      date: new Date().toDateString()
    };

    setGoal(newGoal);
    setIsEditing(false);
    
    try {
      localStorage.setItem('dailyGoal', JSON.stringify(newGoal));
      toast.success("Goal locked in! 🎯");
    } catch (e) {
      // Continue anyway
    }
  };

  const completeGoal = () => {
    const updatedGoal = { ...goal, completed: true };
    setGoal(updatedGoal);
    
    try {
      localStorage.setItem('dailyGoal', JSON.stringify(updatedGoal));
      toast.success("BEAST MODE ACTIVATED! 🏆 Goal crushed!");
    } catch (e) {
      // Continue anyway
    }
  };

  const editGoal = () => {
    setInputValue(goal.text);
    setIsEditing(true);
  };

  const deleteGoal = () => {
    const emptyGoal = { text: '', completed: false, date: new Date().toDateString() };
    setGoal(emptyGoal);
    setInputValue('');
    setIsEditing(true);
    
    try {
      localStorage.removeItem('dailyGoal');
      toast.success("Goal cleared");
    } catch (e) {
      // Continue anyway
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveGoal();
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.accent} flex items-center justify-center`}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Today's Mission</h3>
              <p className="text-sm text-white/40">One goal. Maximum focus.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What are you conquering today?"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-lg py-6 focus:border-white/30"
              autoFocus
              maxLength={100}
            />
            
            <div className="flex gap-3 justify-end">
              {goal.text && (
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-white/40 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={saveGoal}
                disabled={!inputValue.trim()}
                className={`bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white px-6`}
              >
                Lock It In
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (goal.completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Celebration effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-400">CRUSHED IT! 🔥</h3>
                  <p className="text-sm text-white/60">Beast mode activated</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={deleteGoal}
                className="text-white/30 hover:text-white/60 hover:bg-white/5"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <p className="text-lg font-medium line-through text-white/60">{goal.text}</p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-green-400 font-medium">
                You're not average. You're a fucking legend. 👑
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.accent} flex items-center justify-center`}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Today's Mission</h3>
              <p className="text-sm text-white/40">Locked and loaded</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={editGoal}
              className="text-white/40 hover:text-white hover:bg-white/5"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={deleteGoal}
              className="text-white/40 hover:text-white hover:bg-white/5"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
          <p className="text-xl font-bold">{goal.text}</p>
        </div>

        <Button
          onClick={completeGoal}
          className={`w-full bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white py-6 text-base font-bold rounded-xl`}
        >
          <Check className="w-5 h-5 mr-2" />
          MARK AS COMPLETE
        </Button>

        <p className="text-center text-white/20 text-xs mt-3">
          Don't mark it unless you crushed it 💪
        </p>
      </div>
    </motion.div>
  );
}