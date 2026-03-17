import { useState } from 'react';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Calendar, 
  Clock, Heart, MessageSquare, MapPinned, Edit2, 
  Save, Lock, Bell, Shield
} from 'lucide-react';

export default function UserDashboard({ user, onBack, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+44 7700 900123',
    address: '123 Health Street, London',
    dateOfBirth: '1990-05-15',
    emergencyContact: '+44 7700 900456',
    medicalConditions: ['Asthma'],
    allergies: ['Penicillin'],
  });

  const [activityHistory] = useState([
    { id: 1, type: 'chat', title: 'Asked about headache symptoms', date: '2025-01-15 14:30', icon: MessageSquare },
    { id: 2, type: 'search', title: 'Searched for pharmacies near Westminster', date: '2025-01-14 09:15', icon: MapPinned },
    { id: 3, type: 'chat', title: 'Inquired about COVID-19 symptoms', date: '2025-01-10 16:45', icon: MessageSquare },
    { id: 4, type: 'search', title: 'Found St Thomas Hospital', date: '2025-01-08 11:20', icon: MapPinned },
    { id: 5, type: 'chat', title: 'Asked about medication interactions', date: '2025-01-05 20:00', icon: MessageSquare },
  ]);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-[#1f2937]">My Dashboard</h1>
            </div>
            <button onClick={onLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1a6fc4] to-[#114b83] rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-lg font-bold text-[#1f2937]">{user?.name}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Active Member
                </div>
              </div>
            </div>

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

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#1f2937]">Personal Information</h3>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isEditing ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-[#1f2937] mb-6">Health Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.medicalConditions.map((condition, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{condition}</span>
                        ))}
                        {isEditing && (
                          <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-[#1a6fc4] hover:text-[#1a6fc4]">+ Add</button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.allergies.map((allergy, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{allergy}</span>
                        ))}
                        {isEditing && (
                          <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-[#1a6fc4] hover:text-[#1a6fc4]">+ Add</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-[#1f2937] mb-6">Activity History</h3>
                <div className="space-y-4">
                  {activityHistory.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-[#1a6fc4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-5 h-5 text-[#1a6fc4]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1f2937]">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-[#1f2937] mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive health tips and reminders</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a6fc4]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">Health Tips</p>
                        <p className="text-sm text-gray-500">Weekly health tips and advice</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a6fc4]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add extra security to your account</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#1a6fc4] text-white rounded-lg text-sm font-medium hover:bg-[#114b83] transition-colors">
                      Enable
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-medium text-[#1f2937] mb-4">Danger Zone</h4>
                    <button className="w-full p-4 border border-red-200 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-left">
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-red-400">This action cannot be undone</p>
                    </button>
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
