import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Activity, Brain, AlertCircle, CheckCircle, 
  ChevronRight, ChevronDown, RefreshCw, Info, Shield,
  Heart, Thermometer, Wind, Droplets, Eye, Ear, 
  Headphones, Stethoscope, Bone, Armchair, PersonStanding,
  MapPin, Phone, Star, Clock
} from 'lucide-react';
import { DiseasePredictionModel, symptomCategories, riskFactors, bodyParts } from '../data/diseasePrediction';
import { healthcareProviders } from '../data/healthcareData';

const model = new DiseasePredictionModel();

// Mapping of diseases/conditions to medical specialties
const diseaseToSpecialtyMap = {
  'Hypertension': ['Cardiology', 'General Practitioner'],
  'Diabetes': ['Endocrinology', 'General Practitioner'],
  'Asthma': ['Respiratory/Pulmonology', 'General Practitioner'],
  'COPD': ['Respiratory/Pulmonology', 'General Practitioner'],
  'Heart Disease': ['Cardiology', 'General Practitioner'],
  'Stroke': ['Neurology', 'Cardiology'],
  'Migraine': ['Neurology', 'General Practitioner'],
  'Tension Headache': ['Neurology', 'General Practitioner'],
  'Depression': ['Psychiatry', 'General Practitioner'],
  'Anxiety': ['Psychiatry', 'General Practitioner'],
  'PTSD': ['Psychiatry', 'General Practitioner'],
  'Arthritis': ['Orthopaedics', 'General Practitioner'],
  'Back Pain': ['Orthopaedics', 'General Practitioner'],
  'Acne': ['Dermatology', 'General Practitioner'],
  'Eczema': ['Dermatology', 'General Practitioner'],
  'Psoriasis': ['Dermatology', 'General Practitioner'],
  'Gastritis': ['Gastroenterology', 'General Practitioner'],
  'IBS': ['Gastroenterology', 'General Practitioner'],
  'Cancer': ['Oncology', 'General Practitioner'],
  'Thyroid Disease': ['Endocrinology', 'General Practitioner'],
};

const severityColors = {
  low: 'bg-green-100 text-green-700 border-green-300',
  moderate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  high: 'bg-red-100 text-red-700 border-red-300'
};

const riskLevelColors = {
  low: 'text-green-600',
  moderate: 'text-yellow-600',
  high: 'text-red-600',
  unknown: 'text-gray-500'
};

export default function HealthCheck({ user, onBack, onFindHealthcare }) {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);
  const [userProfile, setUserProfile] = useState({
    age: user?.age || 35,
    gender: user?.gender || 'not_specified',
    bmi: user?.bmi || 25
  });
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const resultRef = useRef(null);

  const allSymptoms = model.getAllSymptoms();

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const toggleRiskFactor = (riskId) => {
    setSelectedRiskFactors(prev => 
      prev.includes(riskId)
        ? prev.filter(r => r !== riskId)
        : [...prev, riskId]
    );
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate CNN processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = model.predict(selectedSymptoms, {
      ...userProfile,
      riskFactors: selectedRiskFactors
    });
    
    setPrediction(result);
    setIsAnalyzing(false);
    setStep(4);
    
    // Scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetAssessment = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setSelectedRiskFactors([]);
    setPrediction(null);
    setExpandedCategory(null);
    setSelectedBodyPart(null);
  };

  const getBodyPartIcon = (partId) => {
    const iconMap = {
      head: Headphones,
      eyes: Eye,
      ears: Ear,
      nose: Wind,
      throat: Activity,
      chest: Heart,
      abdomen: Droplets,
      back: Armchair,
      arms: Activity,
      legs: PersonStanding,
      skin: Shield,
      general: Stethoscope
    };
    return iconMap[partId] || Activity;
  };

  // Get relevant healthcare providers based on predicted conditions
  const getRelevantProviders = () => {
    if (!prediction || prediction.predictions.length === 0) {
      // If no specific predictions, return general practitioners
      return healthcareProviders
        .filter(provider => provider.specialty === 'General Practitioner')
        .slice(0, 6)
        .sort((a, b) => b.rating - a.rating);
    }

    const requiredSpecialties = new Set();
    prediction.predictions.forEach(pred => {
      const specialties = diseaseToSpecialtyMap[pred.disease] || ['General Practitioner'];
      specialties.forEach(spec => requiredSpecialties.add(spec));
    });

    // Get providers matching required specialties
    const relevantProviders = healthcareProviders.filter(provider =>
      requiredSpecialties.has(provider.specialty) || provider.specialty === 'General Practitioner'
    );

    // Sort by rating and return top 6
    return relevantProviders
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e8f4fc] pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#28b463] to-[#1e8449] rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1f2937]">Health Check</h1>
                  <p className="text-sm text-gray-500">CNN-Based Disease Risk Assessment</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step >= s 
                  ? 'bg-[#1a6fc4] text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-16 h-1 mx-2 transition-colors ${
                  step > s ? 'bg-[#1a6fc4]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Symptoms */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1f2937] mb-2">Select Your Symptoms</h2>
              <p className="text-gray-600">Choose the symptoms you're experiencing from the categories below</p>
            </div>

            {/* Body Part Selection */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
              {bodyParts.map((part) => {
                const Icon = getBodyPartIcon(part.id);
                const isSelected = selectedBodyPart === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setSelectedBodyPart(isSelected ? null : part.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-[#1a6fc4] bg-[#1a6fc4]/10' 
                        : 'border-gray-200 hover:border-[#1a6fc4]/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-[#1a6fc4]' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${isSelected ? 'text-[#1a6fc4]' : 'text-gray-600'}`}>
                      {part.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Symptom Categories */}
            <div className="space-y-3">
              {Object.entries(symptomCategories).map(([category, symptoms]) => (
                <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-[#1a6fc4]" />
                      <span className="font-semibold text-[#1f2937] capitalize">{category} Symptoms</span>
                      <span className="text-sm text-gray-500">({symptoms.length})</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedCategory === category ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {expandedCategory === category && (
                    <div className="p-4 pt-0 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {symptoms.map((symptom) => {
                          const isSelected = selectedSymptoms.includes(symptom);
                          return (
                            <button
                              key={symptom}
                              onClick={() => toggleSymptom(symptom)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? 'bg-[#1a6fc4] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {symptom}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Symptoms Summary */}
            {selectedSymptoms.length > 0 && (
              <div className="bg-[#1a6fc4]/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-[#1f2937]">Selected Symptoms ({selectedSymptoms.length})</span>
                  <button 
                    onClick={() => setSelectedSymptoms([])}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptom => (
                    <span 
                      key={symptom} 
                      className="px-3 py-1 bg-white rounded-full text-sm text-[#1a6fc4] border border-[#1a6fc4]/30"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={selectedSymptoms.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Risk Factors */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1f2937] mb-2">Risk Factors</h2>
              <p className="text-gray-600">Select any risk factors that apply to you for more accurate assessment</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {['demographic', 'lifestyle', 'medical', 'genetic', 'environmental'].map(category => (
                <div key={category} className="bg-white rounded-xl shadow-sm p-4">
                  <h3 className="font-semibold text-[#1f2937] capitalize mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#1a6fc4]" />
                    {category} Factors
                  </h3>
                  <div className="space-y-2">
                    {riskFactors
                      .filter(rf => rf.category === category)
                      .map(rf => (
                        <label 
                          key={rf.id} 
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRiskFactors.includes(rf.id)}
                            onChange={() => toggleRiskFactor(rf.id)}
                            className="w-4 h-4 text-[#1a6fc4] rounded focus:ring-[#1a6fc4]"
                          />
                          <span className="text-gray-700">{rf.label}</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Profile & Analysis */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1f2937] mb-2">Your Profile</h2>
              <p className="text-gray-600">Review your information before analysis</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={userProfile.gender}
                    onChange={(e) => setUserProfile({...userProfile, gender: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                  >
                    <option value="not_specified">Not Specified</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                  <input
                    type="number"
                    value={userProfile.bmi}
                    onChange={(e) => setUserProfile({...userProfile, bmi: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-[#1f2937] mb-2">Summary</h4>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-blue-600 font-medium">{selectedSymptoms.length}</span>
                    <span className="text-gray-600 ml-1">symptoms selected</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <span className="text-green-600 font-medium">{selectedRiskFactors.length}</span>
                    <span className="text-gray-600 ml-1">risk factors</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <span className="text-purple-600 font-medium">{userProfile.age}</span>
                    <span className="text-gray-600 ml-1">years old</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Important Disclaimer</p>
                <p className="text-sm text-yellow-700 mt-1">
                  This assessment uses AI to analyze your symptoms but is not a substitute for professional medical advice. 
                  Always consult a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze Symptoms
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && prediction && (
          <div ref={resultRef} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1f2937] mb-2">Assessment Results</h2>
              <p className="text-gray-600">Based on your symptoms and profile</p>
            </div>

            {/* Overall Risk */}
            <div className={`rounded-xl p-6 border-2 ${severityColors[prediction.overallRisk.level]}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">Overall Risk Level</p>
                  <p className={`text-3xl font-bold capitalize ${riskLevelColors[prediction.overallRisk.level]}`}>
                    {prediction.overallRisk.level}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium opacity-80">Risk Score</p>
                  <p className="text-3xl font-bold">
                    {prediction.overallRisk.score.toFixed(1)}/3.0
                  </p>
                </div>
              </div>
            </div>

            {/* Predictions */}
            {prediction.predictions.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-[#1f2937] flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#1a6fc4]" />
                  Potential Conditions ({prediction.predictions.length})
                </h3>
                
                {prediction.predictions.map((pred, index) => (
                  <div 
                    key={pred.diseaseId} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-[#1f2937]">{pred.disease}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColors[pred.severity]}`}>
                              {pred.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{pred.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#1a6fc4]">
                            {(pred.confidence * 100).toFixed(0)}%
                          </div>
                          <p className="text-xs text-gray-500">Match Confidence</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-[#1a6fc4] to-[#28b463] h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${pred.confidence * 100}%` }}
                        />
                      </div>

                      {/* Matched Symptoms */}
                      {pred.matchedSymptoms.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Matched Symptoms:</p>
                          <div className="flex flex-wrap gap-1">
                            {pred.matchedSymptoms.map(s => (
                              <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Recommendations:</p>
                        <ul className="space-y-1">
                          {pred.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Urgency */}
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600 font-medium">{pred.urgency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Strong Matches Found</h3>
                <p className="text-gray-600">
                  Your symptoms don't strongly match any conditions in our database. 
                  Please consult a healthcare provider for proper evaluation.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800 font-medium">Medical Disclaimer</p>
                  <p className="text-sm text-red-700 mt-1">
                    This AI-powered assessment is for informational purposes only and does not constitute medical advice. 
                    The predictions are based on pattern matching and should not replace professional medical diagnosis. 
                    If you have serious symptoms or concerns, please consult a healthcare provider immediately or call NHS 111.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Healthcare Providers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1f2937] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#1a6fc4]" />
                Recommended Healthcare Providers
              </h3>
              <p className="text-sm text-gray-600">Based on your assessment results, here are suitable healthcare providers to consult:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {getRelevantProviders().map((provider) => (
                  <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1f2937] text-sm">{provider.name}</h4>
                        <p className="text-xs text-[#1a6fc4] font-medium mt-1">{provider.specialty}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{provider.practice}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1">{provider.address}, {provider.postcode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{provider.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex gap-2 flex-wrap">
                        {provider.nhs && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">NHS</span>
                        )}
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">{provider.borough}</span>
                      </div>
                      <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">💡 Tip:</span> You can also click "Find Healthcare Provider" to search for more options in your area with different filtering criteria.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={resetAssessment}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Start New Assessment
              </button>
              <button
                onClick={onFindHealthcare}
                className="btn-primary flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Find Healthcare Provider
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
