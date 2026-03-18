import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, MessageSquare, Database, BarChart3, 
  Search, Trash2, Edit2, Plus, Save, X, Check,
  TrendingUp, Activity, UserPlus, MessageCircle
} from 'lucide-react';

export default function AdminPanel({ onBack, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [qaItems, setQaItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQA, setEditingQA] = useState(null);
  const [isAddingQA, setIsAddingQA] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('healthbot_users') || '[]');
    const formattedUsers = storedUsers.map((u, index) => ({
      id: u.id || `user-${index}`,
      name: u.name,
      email: u.email,
      registeredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      chatCount: Math.floor(Math.random() * 50) + 1,
    }));
    setUsers(formattedUsers);

    const initialQA = [
      {
        id: 'qa-1',
        question: 'What are the symptoms of flu?',
        answer: 'Flu symptoms include fever, cough, sore throat, runny nose, body aches, headache, chills, and fatigue.',
        category: 'Symptoms',
        isActive: true,
      },
      {
        id: 'qa-2',
        question: 'How can I book an appointment?',
        answer: 'You can book appointments through our Find Healthcare feature. Search for providers and click "Book Appointment" on their profile.',
        category: 'Appointments',
        isActive: true,
      },
      {
        id: 'qa-3',
        question: 'Is my health data secure?',
        answer: 'Yes, we use end-to-end encryption and are fully GDPR compliant. Your data is never shared without consent.',
        category: 'Privacy',
        isActive: true,
      },
      {
        id: 'qa-4',
        question: 'What should I do in a medical emergency?',
        answer: 'For life-threatening emergencies, call 999 immediately. For urgent but non-life-threatening issues, call NHS 111.',
        category: 'Emergency',
        isActive: true,
      },
      {
        id: 'qa-5',
        question: 'How accurate is the AI chatbot?',
        answer: 'Our AI achieves 98% accuracy on general health queries. However, it is not a replacement for professional medical advice.',
        category: 'General',
        isActive: true,
      },
    ];
    setQaItems(initialQA);
  }, []);

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('healthbot_users', JSON.stringify(updatedUsers));
    }
  };

  const handleSaveQA = () => {
    if (editingQA) {
      if (isAddingQA) {
        setQaItems([...qaItems, { ...editingQA, id: `qa-${Date.now()}` }]);
      } else {
        setQaItems(qaItems.map((qa) => (qa.id === editingQA.id ? editingQA : qa)));
      }
      setEditingQA(null);
      setIsAddingQA(false);
    }
  };

  const handleDeleteQA = (qaId) => {
    if (confirm('Are you sure you want to delete this Q&A?')) {
      setQaItems(qaItems.filter((qa) => qa.id !== qaId));
    }
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQA = qaItems.filter(
    (qa) =>
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => new Date(u.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    totalChats: users.reduce((acc, u) => acc + u.chatCount, 0),
    totalQA: qaItems.length,
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'qa', label: 'Q&A Management', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#1f2937]">Admin Panel</h1>
                <p className="text-sm text-gray-500">Manage HealthBot system</p>
              </div>
            </div>
            <button onClick={onLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                    activeTab === tab.id ? 'bg-[#1a6fc4] text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> +12%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#1f2937]">{stats.totalUsers}</p>
                    <p className="text-gray-500 text-sm">Total Users</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> +8%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#1f2937]">{stats.activeUsers}</p>
                    <p className="text-gray-500 text-sm">Active Users (7d)</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> +24%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#1f2937]">{stats.totalChats}</p>
                    <p className="text-gray-500 text-sm">Total Chats</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-gray-500 text-sm font-medium">Static</span>
                    </div>
                    <p className="text-2xl font-bold text-[#1f2937]">{stats.totalQA}</p>
                    <p className="text-gray-500 text-sm">Q&A Pairs</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#1f2937] mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#1a6fc4] to-[#114b83] rounded-full flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[#1f2937]">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Registered</p>
                          <p className="text-sm font-medium">{user.registeredAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#1f2937]">Registered Users</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Registered</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Active</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Chats</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#1a6fc4] to-[#114b83] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-[#1f2937]">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.registeredAt}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.lastActive}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{user.chatCount}</td>
                          <td className="py-3 px-4 text-right">
                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#1f2937]">Q&A Management</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search Q&A..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingQA(true);
                        setEditingQA({ id: '', question: '', answer: '', category: 'General', isActive: true });
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a6fc4] text-white rounded-lg text-sm font-medium hover:bg-[#114b83] transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Q&A
                    </button>
                  </div>
                </div>

                {editingQA && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-[#1f2937]">{isAddingQA ? 'Add New Q&A' : 'Edit Q&A'}</h4>
                      <button onClick={() => { setEditingQA(null); setIsAddingQA(false); }} className="p-1 hover:bg-gray-200 rounded">
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                        <input
                          type="text"
                          value={editingQA.question}
                          onChange={(e) => setEditingQA({ ...editingQA, question: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                        <textarea
                          value={editingQA.answer}
                          onChange={(e) => setEditingQA({ ...editingQA, answer: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={editingQA.category}
                            onChange={(e) => setEditingQA({ ...editingQA, category: e.target.value })}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                          >
                            <option>General</option>
                            <option>Symptoms</option>
                            <option>Appointments</option>
                            <option>Privacy</option>
                            <option>Emergency</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                          <input
                            type="checkbox"
                            checked={editingQA.isActive}
                            onChange={(e) => setEditingQA({ ...editingQA, isActive: e.target.checked })}
                            className="w-4 h-4 text-[#1a6fc4] rounded"
                          />
                          <label className="text-sm text-gray-700">Active</label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button onClick={() => { setEditingQA(null); setIsAddingQA(false); }} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                          Cancel
                        </button>
                        <button onClick={handleSaveQA} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          <Save className="w-4 h-4" /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {filteredQA.map((qa) => (
                    <div key={qa.id} className="p-4 border border-gray-100 rounded-lg hover:border-[#1a6fc4] transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{qa.category}</span>
                            {qa.isActive ? (
                              <span className="flex items-center gap-1 text-green-600 text-xs">
                                <Check className="w-3 h-3" /> Active
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">Inactive</span>
                            )}
                          </div>
                          <p className="font-medium text-[#1f2937] mb-1">{qa.question}</p>
                          <p className="text-sm text-gray-600">{qa.answer}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button onClick={() => { setEditingQA(qa); setIsAddingQA(false); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteQA(qa.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#1f2937] mb-4">Usage Analytics</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Analytics dashboard coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="font-medium text-[#1f2937] mb-4">Top Queries</h4>
                    <div className="space-y-3">
                      {['Headache symptoms', 'COVID-19 vaccine', 'Find GP near me', 'Emergency services'].map((query, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{query}</span>
                          <span className="text-sm font-medium text-[#1a6fc4]">{100 - index * 20} searches</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="font-medium text-[#1f2937] mb-4">Popular Locations</h4>
                    <div className="space-y-3">
                      {['Westminster', 'Camden', 'Kensington', 'Lambeth'].map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{location}</span>
                          <span className="text-sm font-medium text-[#1a6fc4]">{80 - index * 15} searches</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
