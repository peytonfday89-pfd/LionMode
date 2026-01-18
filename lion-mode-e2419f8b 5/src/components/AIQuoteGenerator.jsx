import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RefreshCw, Send, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

export default function AIQuoteGenerator({ isOpen, onClose, currentTheme }) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateQuote = async () => {
    if (!topic.trim()) {
      toast.error("Enter a topic or mood");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a powerful, hardcore motivational quote about: ${topic}
        
Rules:
- Main quote: ALL CAPS, under 100 characters, raw and intense
- Subtext: Brief context/explanation, under 80 characters
- Style: Direct, no-nonsense, like David Goggins or Jocko Willink
- No generic platitudes, make it hit hard
- Use strong, actionable language

Return ONLY valid JSON in this exact format:
{
  "text": "THE MAIN QUOTE IN ALL CAPS",
  "subtext": "Brief powerful context"
}`,
        response_json_schema: {
          type: "object",
          properties: {
            text: { type: "string" },
            subtext: { type: "string" }
          },
          required: ["text", "subtext"]
        }
      });

      setGeneratedQuote({
        text: response.text.toUpperCase(),
        subtext: response.subtext
      });
      toast.success("Quote generated! 🔥");
    } catch (error) {
      toast.error("Failed to generate quote");
    } finally {
      setIsGenerating(false);
    }
  };

  const submitQuote = async () => {
    if (!generatedQuote) return;

    setIsSubmitting(true);

    try {
      const user = await base44.auth.me();
      
      await base44.entities.UserQuote.create({
        text: generatedQuote.text,
        subtext: generatedQuote.subtext,
        status: 'pending',
        submitted_by_email: user?.email || 'anonymous'
      });

      toast.success("Quote submitted for review! 🎯");
      setGeneratedQuote(null);
      setTopic('');
      onClose();
    } catch (error) {
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isGenerating) {
      generateQuote();
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
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Quote Generator</h2>
                  <p className="text-sm text-white/40">Custom motivation on demand</p>
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
              {!generatedQuote ? (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-white/60">
                      💡 <strong>Examples:</strong> "overcoming fear", "pushing through pain", "building discipline", "early morning grind"
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Topic or Mood
                    </label>
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="What do you need motivation for?"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-base"
                      maxLength={100}
                      disabled={isGenerating}
                      autoFocus
                    />
                  </div>

                  <Button
                    onClick={generateQuote}
                    disabled={isGenerating || !topic.trim()}
                    className={`w-full bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white py-6 text-base font-bold`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Generate Quote
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${currentTheme.accent} mb-4`}>
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium text-white uppercase tracking-wider">AI Generated</span>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        {generatedQuote.text}
                      </h3>
                      <p className="text-base text-white/60">
                        {generatedQuote.subtext}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setGeneratedQuote(null);
                        setTopic('');
                      }}
                      variant="outline"
                      className="flex-1 border-white/10 text-white hover:bg-white/5"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate New
                    </Button>
                    <Button
                      onClick={submitQuote}
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                    </Button>
                  </div>

                  <p className="text-center text-white/20 text-xs">
                    Submitted quotes are reviewed by admins before being added to rotation
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}