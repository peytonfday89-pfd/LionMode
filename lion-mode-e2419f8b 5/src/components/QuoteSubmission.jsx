import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

export default function QuoteSubmission({ isOpen, onClose, currentTheme }) {
  const [quoteText, setQuoteText] = useState('');
  const [subtext, setSubtext] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!quoteText.trim() || !subtext.trim()) {
      toast.error("Both fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await base44.auth.me();
      
      await base44.entities.UserQuote.create({
        text: quoteText.trim().toUpperCase(),
        subtext: subtext.trim(),
        status: 'pending',
        submitted_by_email: user?.email || 'anonymous'
      });

      toast.success("Quote submitted! We'll review it soon 🔥");
      setQuoteText('');
      setSubtext('');
      onClose();
    } catch (error) {
      toast.error("Failed to submit. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Submit Your Quote</h2>
                  <p className="text-sm text-white/40">Share your fire with the world</p>
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
            <div className="p-6 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-white/60">
                  💡 <strong>Tips:</strong> Make it powerful, raw, and motivating. Use ALL CAPS for the main quote. Keep it under 100 characters.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Main Quote *
                  </label>
                  <Input
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="YOUR POWERFUL QUOTE HERE"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-base uppercase"
                    maxLength={150}
                  />
                  <p className="text-xs text-white/30 mt-1">{quoteText.length}/150</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Subtext / Context *
                  </label>
                  <Textarea
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                    placeholder="Brief explanation or context"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-base resize-none"
                    rows={3}
                    maxLength={100}
                  />
                  <p className="text-xs text-white/30 mt-1">{subtext.length}/100</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-white/40 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !quoteText.trim() || !subtext.trim()}
                  className={`bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white px-6`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Quote'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}