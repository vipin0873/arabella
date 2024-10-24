'use client'

import { useState, useEffect, useRef } from 'react';
import { adminLogin, adminLogout, updateQuoteStatus, subscribeToQuotes, subscribeToMessages, getFAQs, setFAQ, deleteFAQ, subscribeToFAQs, updateMessageStatus } from '../firebase';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader, Search, Edit, Trash } from 'lucide-react';

export default function AdminPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'faqs'>('quotes');
  const [faqs, setFaqs] = useState<any[]>([]);
  const [editingFaq, setEditingFaq] = useState<{ id: string, question: string, answer: string } | null>(null);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
  const [messageFilter, setMessageFilter] = useState('all');
  const [messageSortOrder, setMessageSortOrder] = useState<'asc' | 'desc'>('desc');
  const lastQuoteIdRef = useRef<string | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    const checkStoredAuth = async () => {
      const storedAuth = localStorage.getItem('adminAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
      setIsAuthenticating(false);
    };
    checkStoredAuth();
  }, []);

  useEffect(() => {
    let unsubscribeQuotes: () => void;
    let unsubscribeMessages: () => void;
    let unsubscribeFAQs: () => void;

    if (isAuthenticated) {
      unsubscribeQuotes = subscribeToQuotes((fetchedQuotes) => {
        if (fetchedQuotes.length > 0 && fetchedQuotes[0].id !== lastQuoteIdRef.current) {
          if (lastQuoteIdRef.current !== null) {
            showNotification('New Quote Received');
          }
          lastQuoteIdRef.current = fetchedQuotes[0].id;
        }
        setQuotes(fetchedQuotes);
      });

      unsubscribeMessages = subscribeToMessages((fetchedMessages) => {
        if (fetchedMessages.length > 0 && fetchedMessages[0].id !== lastMessageIdRef.current) {
          if (lastMessageIdRef.current !== null) {
            showNotification('New Message Received');
          }
          lastMessageIdRef.current = fetchedMessages[0].id;
        }
        setMessages(fetchedMessages);
      });

      unsubscribeFAQs = subscribeToFAQs((fetchedFAQs) => {
        setFaqs(fetchedFAQs);
      });
    }

    return () => {
      if (unsubscribeQuotes) unsubscribeQuotes();
      if (unsubscribeMessages) unsubscribeMessages();
      if (unsubscribeFAQs) unsubscribeFAQs();
    };
  }, [isAuthenticated]);

  const showNotification = (message: string) => {
    if (Notification.permission === 'granted') {
      new Notification('ArabellaConsultants', { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('ArabellaConsultants', { body: message });
        }
      });
    }
  };

  const handleTabChange = (tab: 'quotes' | 'messages' | 'faqs') => {
    setActiveTab(tab);
  };

  const fetchFAQs = async () => {
    const fetchedFAQs = await getFAQs();
    setFaqs(fetchedFAQs);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const result = await adminLogin(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    const result = await adminLogout();
    if (result.success) {
      setIsAuthenticated(false);
      localStorage.removeItem('adminAuthenticated');
    } else {
      console.error('Failed to logout');
    }
  };

  const handleStatusChange = async (quoteId: string, newStatus: 'read' | 'unread') => {
    setIsLoading(true);
    await updateQuoteStatus(quoteId, newStatus);
    setIsLoading(false);
  };

  const handleMessageStatusChange = async (messageId: string, newStatus: 'read' | 'unread') => {
    setIsLoading(true);
    await updateMessageStatus(messageId, newStatus);
    setIsLoading(false);
  };

  const filteredQuotes = quotes
    .filter(quote => {
      if (filter === 'all') return true;
      return quote.status === filter;
    })
    .filter(quote =>
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return sortOrder === 'desc'
          ? b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
          : a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime();
      }
      return 0;
    });

  const filteredMessages = messages
    .filter(message => {
      if (messageFilter === 'all') return true;
      return message.status === messageFilter;
    })
    .filter(message =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return messageSortOrder === 'desc'
          ? b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
          : a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime();
      }
      return 0;
    });

  const filteredItems = activeTab === 'quotes' ? filteredQuotes : filteredMessages;

  const handleCreateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await setFAQ(null, newFAQ);
    if (result.success) {
      setNewFAQ({ question: '', answer: '' });
      console.log("New FAQ created:", result.id);
    } else {
      console.error("Failed to create FAQ:", result.error);
    }
  };

  const handleUpdateFAQ = async () => {
    if (editingFaq) {
      const result = await setFAQ(editingFaq.id, {
        question: editingFaq.question,
        answer: editingFaq.answer
      });
      if (result.success) {
        setEditingFaq(null);
        console.log("FAQ updated:", editingFaq.id);
      } else {
        console.error("Failed to update FAQ:", result.error);
      }
    }
  };

  const handleDeleteFAQ = async (faqId: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const result = await deleteFAQ(faqId);
      if (result.success) {
        console.log("FAQ deleted:", faqId);
      } else {
        console.error("Failed to delete FAQ:", result.error);
      }
    }
  };

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Admin Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.75rem] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => handleTabChange('quotes')}
                className={`px-4 py-2 rounded ${activeTab === 'quotes' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Quotes
              </button>
              <button
                onClick={() => handleTabChange('messages')}
                className={`px-4 py-2 rounded ${activeTab === 'messages' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Messages
              </button>
              <button
                onClick={() => handleTabChange('faqs')}
                className={`px-4 py-2 rounded ${activeTab === 'faqs' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Manage FAQs
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab !== 'faqs' && (
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {activeTab === 'quotes' && (
                <>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="all">All Quotes</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </>
              )}
              {activeTab === 'messages' && (
                <>
                  <select
                    value={messageFilter}
                    onChange={(e) => setMessageFilter(e.target.value)}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                  <select
                    value={messageSortOrder}
                    onChange={(e) => setMessageSortOrder(e.target.value as 'asc' | 'desc')}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </>
              )}
            </div>
            <div className="grid gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <h2 className="text-2xl font-bold text-green-600 mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-1">Email: {item.email}</p>
                  <p className="text-gray-600 mb-1">Phone: {item.phone}</p>
                  <p className="text-gray-800 mb-2">Message: {item.message}</p>
                  <p className="text-gray-500 mb-2">Date: {item.timestamp?.toDate().toLocaleString()}</p>
                  {activeTab === 'quotes' && (
                    <div className="flex justify-between items-center">
                      <p className={`font-semibold ${item.status === 'unread' ? 'text-blue-500' : 'text-green-500'}`}>
                        Status: {item.status}
                      </p>
                      <button
                        onClick={() => handleStatusChange(item.id, item.status === 'unread' ? 'read' : 'unread')}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded ${
                          item.status === 'unread'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition duration-300 flex items-center`}
                      >
                        {isLoading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
                        Mark as {item.status === 'unread' ? 'Read' : 'Unread'}
                      </button>
                    </div>
                  )}
                  {activeTab === 'messages' && (
                    <div className="flex justify-between items-center">
                      <p className={`font-semibold ${item.status === 'unread' ? 'text-blue-500' : 'text-green-500'}`}>
                        Status: {item.status}
                      </p>
                      <button
                        onClick={() => handleMessageStatusChange(item.id, item.status === 'unread' ? 'read' : 'unread')}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded ${
                          item.status === 'unread'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition duration-300 flex items-center`}
                      >
                        {isLoading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
                        Mark as {item.status === 'unread' ? 'Read' : 'Unread'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Manage FAQs</h3>
            </div>

            {/* Add new FAQ form */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h4 className="text-md leading-6 font-medium text-gray-900 mb-4">Add New FAQ</h4>
              <form onSubmit={handleCreateFAQ} className="space-y-4">
                <input
                  type="text"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  placeholder="Enter question"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <textarea
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  placeholder="Enter answer"
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Add FAQ
                </button>
              </form>
            </div>

            {/* List of existing FAQs */}
            <ul className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <li key={faq.id} className="px-4 py-4 sm:px-6">
                  {editingFaq && editingFaq.id === faq.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editingFaq.question}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                      <textarea
                        value={editingFaq.answer}
                        onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleUpdateFAQ}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingFaq(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-lg font-semibold">{faq.question}</h4>
                      <p className="mt-1 text-gray-600">{faq.answer}</p>
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => setEditingFaq(faq)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(faq.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
