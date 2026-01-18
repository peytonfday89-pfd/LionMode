import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Check, X, Edit2, Filter, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminQuotes() {
  const [filter, setFilter] = useState('pending');
  const [editingQuote, setEditingQuote] = useState(null);
  const [editText, setEditText] = useState('');
  const [editSubtext, setEditSubtext] = useState('');
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['quotes', filter],
    queryFn: async () => {
      const allQuotes = await base44.entities.UserQuote.list('-created_date');
      return filter === 'all' ? allQuotes : allQuotes.filter(q => q.status === filter);
    },
  });

  const updateQuoteMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.UserQuote.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      setEditingQuote(null);
      toast.success("Quote updated!");
    },
  });

  const approveQuote = (quote) => {
    updateQuoteMutation.mutate({
      id: quote.id,
      data: { status: 'approved' }
    });
  };

  const rejectQuote = (quote) => {
    updateQuoteMutation.mutate({
      id: quote.id,
      data: { status: 'rejected' }
    });
  };

  const startEdit = (quote) => {
    setEditingQuote(quote);
    setEditText(quote.text);
    setEditSubtext(quote.subtext);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editSubtext.trim()) {
      toast.error("Both fields are required");
      return;
    }

    updateQuoteMutation.mutate({
      id: editingQuote.id,
      data: {
        text: editText.trim(),
        subtext: editSubtext.trim(),
      }
    });
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access Required</h1>
          <p className="text-slate-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' },
    approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Rejected' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Quote Management</h1>
                <p className="text-slate-600">Review and approve user submissions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {quotes?.filter(q => q.status === 'pending').length || 0}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Approved</p>
                  <p className="text-2xl font-bold text-green-900">
                    {quotes?.filter(q => q.status === 'approved').length || 0}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">
                    {quotes?.filter(q => q.status === 'rejected').length || 0}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading quotes...</p>
          </div>
        ) : quotes?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600">No quotes found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes?.map((quote) => {
              const config = statusConfig[quote.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={`${config.color} border flex items-center gap-1.5`}>
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          Submitted by: {quote.submitted_by_email}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(quote.created_date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 mb-3">
                        <p className="text-lg font-bold text-slate-900 mb-2">{quote.text}</p>
                        <p className="text-slate-600">{quote.subtext}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => startEdit(quote)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1.5"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>

                        {quote.status !== 'approved' && (
                          <Button
                            onClick={() => approveQuote(quote)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1.5" />
                            Approve
                          </Button>
                        )}

                        {quote.status !== 'rejected' && (
                          <Button
                            onClick={() => rejectQuote(quote)}
                            size="sm"
                            variant="destructive"
                          >
                            <X className="w-4 h-4 mr-1.5" />
                            Reject
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingQuote} onOpenChange={() => setEditingQuote(null)}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Quote</DialogTitle>
              <DialogDescription>
                Make changes to the quote before approving
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quote Text
                </label>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Main quote text"
                  className="text-base uppercase"
                  maxLength={150}
                />
                <p className="text-xs text-slate-500 mt-1">{editText.length}/150</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subtext
                </label>
                <Textarea
                  value={editSubtext}
                  onChange={(e) => setEditSubtext(e.target.value)}
                  placeholder="Supporting text"
                  className="resize-none"
                  rows={3}
                  maxLength={100}
                />
                <p className="text-xs text-slate-500 mt-1">{editSubtext.length}/100</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingQuote(null)}>
                Cancel
              </Button>
              <Button 
                onClick={saveEdit}
                disabled={!editText.trim() || !editSubtext.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}