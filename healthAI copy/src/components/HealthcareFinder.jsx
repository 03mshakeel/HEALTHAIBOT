import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, Search, MapPin, Phone, Clock, Star, 
  Stethoscope, Building2, Siren, Pill, Filter,
  ChevronDown, Navigation, ExternalLink, Heart
} from 'lucide-react';
import { allHealthcareProviders, boroughs, specialties, healthcareStats } from '../data/healthcareData';

const typeIcons = {
  doctor: Stethoscope,
  clinic: Building2,
  hospital: Siren,
  pharmacy: Pill,
};

const typeColors = {
  doctor: '#1a6fc4',
  clinic: '#28b463',
  hospital: '#e74c3c',
  pharmacy: '#f39c12',
};

export default function HealthcareFinder({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBorough, setSelectedBorough] = useState('All Boroughs');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProviders, setFilteredProviders] = useState(allHealthcareProviders);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    let filtered = allHealthcareProviders;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.borough.toLowerCase().includes(query) ||
          p.postcode.toLowerCase().includes(query) ||
          (p.specialty && p.specialty.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    if (selectedBorough !== 'All Boroughs') {
      filtered = filtered.filter((p) => p.borough === selectedBorough);
    }

    if (selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter((p) => p.specialty === selectedSpecialty);
    }

    setFilteredProviders(filtered);

    if (resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.querySelectorAll('.provider-card'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }
      );
    }
  }, [searchQuery, selectedType, selectedBorough, selectedSpecialty]);

  const typeCounts = {
    all: healthcareStats.total,
    doctor: healthcareStats.doctors,
    clinic: healthcareStats.clinics,
    hospital: healthcareStats.hospitals,
    pharmacy: healthcareStats.pharmacies,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-[#1f2937]">Find Healthcare in London</h1>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, clinics, hospitals, pharmacies..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a6fc4] transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all ${
                showFilters ? 'bg-[#1a6fc4] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'all', label: 'All', icon: null },
                  { id: 'doctor', label: 'Doctors', icon: Stethoscope },
                  { id: 'clinic', label: 'Clinics', icon: Building2 },
                  { id: 'hospital', label: 'Hospitals', icon: Siren },
                  { id: 'pharmacy', label: 'Pharmacies', icon: Pill },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                      selectedType === type.id ? 'bg-[#1a6fc4] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.icon && <type.icon className="w-4 h-4" />}
                    {type.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${selectedType === type.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                      {typeCounts[type.id].toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={selectedBorough}
                  onChange={(e) => setSelectedBorough(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                >
                  {boroughs.map((borough) => (
                    <option key={borough} value={borough}>{borough}</option>
                  ))}
                </select>

                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold text-[#1f2937]">{filteredProviders.length.toLocaleString()}</span> healthcare providers
          </p>
          <div className="flex gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{healthcareStats.doctors.toLocaleString()} Doctors</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">{healthcareStats.clinics.toLocaleString()} Clinics</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">{healthcareStats.hospitals.toLocaleString()} Hospitals</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">{healthcareStats.pharmacies.toLocaleString()} Pharmacies</span>
          </div>
        </div>

        <div ref={resultsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.slice(0, 100).map((provider) => {
            const Icon = typeIcons[provider.type];
            const color = typeColors[provider.type];

            return (
              <div
                key={provider.id}
                onClick={() => setSelectedProvider(provider)}
                className="provider-card bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1f2937] mb-1 group-hover:text-[#1a6fc4] transition-colors truncate">
                      {provider.name}
                    </h3>
                    {provider.specialty && (
                      <p className="text-sm text-gray-500 mb-1">{provider.specialty}</p>
                    )}
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{provider.address}, {provider.postcode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-sm text-gray-400">({provider.reviews})</span>
                      </div>
                      {provider.hours === '24/7' || provider.hours === '24/7 A&E' ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          24/7
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {filteredProviders.length > 100 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Showing 100 of {filteredProviders.length.toLocaleString()} results. Refine your search to see more.
            </p>
          </div>
        )}
      </div>

      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProvider(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6" style={{ backgroundColor: `${typeColors[selectedProvider.type]}15` }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: typeColors[selectedProvider.type] }}
                >
                  {(() => {
                    const Icon = typeIcons[selectedProvider.type];
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#1f2937]">{selectedProvider.name}</h2>
                  {selectedProvider.specialty && <p className="text-gray-600">{selectedProvider.specialty}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{selectedProvider.rating}</span>
                    <span className="text-gray-400">({selectedProvider.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1f2937]">{selectedProvider.address}</p>
                  <p className="text-gray-500">{selectedProvider.borough}, {selectedProvider.postcode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href={`tel:${selectedProvider.phone}`} className="text-[#1a6fc4] hover:underline">
                  {selectedProvider.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div className="flex items-center gap-2">
                  <span>{selectedProvider.hours}</span>
                  {(selectedProvider.hours === '24/7' || selectedProvider.hours === '24/7 A&E') && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Open Now
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedProvider.address + ' ' + selectedProvider.postcode
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
                <a href={`tel:${selectedProvider.phone}`} className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>

            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
