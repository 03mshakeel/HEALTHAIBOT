// CNN-Based Disease Risk Prediction System
// Simulates a trained CNN model for symptom-based disease prediction

// Disease database with symptoms and risk factors
export const diseaseDatabase = {
  // Cardiovascular Diseases
  "hypertension": {
    name: "Hypertension (High Blood Pressure)",
    category: "Cardiovascular",
    symptoms: ["headache", "dizziness", "chest pain", "shortness of breath", "nosebleeds", "blurred vision"],
    riskFactors: ["age_over_45", "family_history", "obesity", "smoking", "high_salt_diet", "stress"],
    severity: "moderate",
    recommendations: [
      "Monitor blood pressure regularly",
      "Reduce salt intake",
      "Exercise regularly",
      "Consult a cardiologist",
      "Consider medication if lifestyle changes insufficient"
    ],
    urgency: "Schedule appointment within 1-2 weeks"
  },
  "coronary_artery_disease": {
    name: "Coronary Artery Disease",
    category: "Cardiovascular",
    symptoms: ["chest pain", "shortness of breath", "fatigue", "nausea", "sweating", "jaw pain", "arm pain"],
    riskFactors: ["age_over_55", "smoking", "high_cholesterol", "diabetes", "family_history", "obesity"],
    severity: "high",
    recommendations: [
      "Seek immediate medical attention for chest pain",
      "Lifestyle modifications crucial",
      "Regular cardiac checkups",
      "Medication adherence",
      "Consider cardiac rehabilitation"
    ],
    urgency: "Seek immediate care if chest pain present"
  },
  
  // Respiratory Diseases
  "asthma": {
    name: "Asthma",
    category: "Respiratory",
    symptoms: ["wheezing", "shortness of breath", "chest tightness", "coughing", "difficulty breathing"],
    riskFactors: ["family_history", "allergies", "smoking", "air_pollution", "occupational_exposure"],
    severity: "moderate",
    recommendations: [
      "Use inhaler as prescribed",
      "Identify and avoid triggers",
      "Regular follow-up with pulmonologist",
      "Peak flow monitoring",
      "Have action plan for attacks"
    ],
    urgency: "Seek care if severe attack or no relief from inhaler"
  },
  "copd": {
    name: "COPD (Chronic Obstructive Pulmonary Disease)",
    category: "Respiratory",
    symptoms: ["chronic cough", "shortness of breath", "wheezing", "chest tightness", "frequent respiratory infections"],
    riskFactors: ["smoking", "age_over_40", "exposure_to_fumes", "family_history"],
    severity: "high",
    recommendations: [
      "Smoking cessation essential",
      "Pulmonary rehabilitation",
      "Regular medications",
      "Vaccinations (flu, pneumonia)",
      "Oxygen therapy if needed"
    ],
    urgency: "Schedule appointment within 1 week"
  },
  "pneumonia": {
    name: "Pneumonia",
    category: "Respiratory",
    symptoms: ["fever", "cough", "shortness of breath", "chest pain", "fatigue", "confusion", "sweating"],
    riskFactors: ["age_over_65", "weakened_immune_system", "chronic_disease", "smoking", "recent_illness"],
    severity: "high",
    recommendations: [
      "Seek medical attention promptly",
      "Antibiotics if bacterial",
      "Rest and hydration",
      "Monitor oxygen levels",
      "Hospitalization may be needed"
    ],
    urgency: "Seek care within 24 hours"
  },
  
  // Metabolic Diseases
  "type2_diabetes": {
    name: "Type 2 Diabetes",
    category: "Metabolic",
    symptoms: ["frequent urination", "increased thirst", "fatigue", "blurred vision", "slow healing", "numbness"],
    riskFactors: ["obesity", "family_history", "age_over_45", "sedentary_lifestyle", "gestational_diabetes"],
    severity: "moderate",
    recommendations: [
      "Blood sugar monitoring",
      "Dietary modifications",
      "Regular exercise",
      "Medication if needed",
      "Regular HbA1c checks"
    ],
    urgency: "Schedule appointment within 1-2 weeks"
  },
  "hypothyroidism": {
    name: "Hypothyroidism",
    category: "Metabolic",
    symptoms: ["fatigue", "weight gain", "cold sensitivity", "dry skin", "hair loss", "depression", "constipation"],
    riskFactors: ["female", "age_over_60", "family_history", "autoimmune_disease"],
    severity: "low",
    recommendations: [
      "Thyroid function tests",
      "Thyroid hormone replacement",
      "Regular monitoring",
      "Dietary adjustments",
      "Endocrinologist consultation"
    ],
    urgency: "Schedule appointment within 2-4 weeks"
  },
  
  // Gastrointestinal Diseases
  "gastroenteritis": {
    name: "Gastroenteritis",
    category: "Gastrointestinal",
    symptoms: ["diarrhea", "nausea", "vomiting", "stomach cramps", "fever", "dehydration"],
    riskFactors: ["contaminated_food", "viral_infection", "travel", "weakened_immunity"],
    severity: "low",
    recommendations: [
      "Hydration essential",
      "BRAT diet (bananas, rice, applesauce, toast)",
      "Rest",
      "Seek care if severe dehydration",
      "Antibiotics only if bacterial"
    ],
    urgency: "Self-care; seek help if symptoms worsen"
  },
  "ibs": {
    name: "Irritable Bowel Syndrome (IBS)",
    category: "Gastrointestinal",
    symptoms: ["abdominal pain", "bloating", "diarrhea", "constipation", "gas", "mucus in stool"],
    riskFactors: ["stress", "family_history", "food_sensitivities", "hormonal_changes"],
    severity: "low",
    recommendations: [
      "Dietary modifications (low FODMAP)",
      "Stress management",
      "Regular exercise",
      "Probiotics",
      "Gastroenterologist consultation"
    ],
    urgency: "Schedule appointment within 2-4 weeks"
  },
  "gerd": {
    name: "GERD (Gastroesophageal Reflux Disease)",
    category: "Gastrointestinal",
    symptoms: ["heartburn", "chest pain", "difficulty swallowing", "regurgitation", "chronic cough"],
    riskFactors: ["obesity", "pregnancy", "smoking", "hiatal_hernia", "certain_foods"],
    severity: "low",
    recommendations: [
      "Dietary modifications",
      "Elevate head while sleeping",
      "Antacids or PPIs",
      "Weight management",
      "Avoid late meals"
    ],
    urgency: "Schedule appointment within 2-4 weeks"
  },
  
  // Neurological Diseases
  "migraine": {
    name: "Migraine",
    category: "Neurological",
    symptoms: ["severe headache", "nausea", "sensitivity to light", "sensitivity to sound", "visual aura", "dizziness"],
    riskFactors: ["family_history", "hormonal_changes", "stress", "certain_foods", "sleep_changes"],
    severity: "moderate",
    recommendations: [
      "Identify triggers",
      "Pain relievers at onset",
      "Triptans for severe attacks",
      "Preventive medications if frequent",
      "Neurologist consultation"
    ],
    urgency: "Seek care if first severe headache or different from usual"
  },
  "tension_headache": {
    name: "Tension Headache",
    category: "Neurological",
    symptoms: ["dull headache", "pressure around forehead", "tenderness in scalp", "neck pain"],
    riskFactors: ["stress", "poor_posture", "eye_strain", "dehydration", "lack_of_sleep"],
    severity: "low",
    recommendations: [
      "Over-the-counter pain relievers",
      "Stress management",
      "Regular exercise",
      "Adequate sleep",
      "Posture improvement"
    ],
    urgency: "Self-care; seek help if persistent"
  },
  
  // Mental Health
  "depression": {
    name: "Depression",
    category: "Mental Health",
    symptoms: ["persistent sadness", "loss of interest", "fatigue", "sleep_changes", "appetite_changes", "difficulty concentrating", "thoughts of self-harm"],
    riskFactors: ["family_history", "trauma", "chronic_illness", "substance_abuse", "major_life_changes"],
    severity: "high",
    recommendations: [
      "Seek professional help",
      "Psychotherapy",
      "Antidepressant medications",
      "Lifestyle changes",
      "Support groups"
    ],
    urgency: "Seek immediate help if suicidal thoughts present"
  },
  "anxiety_disorder": {
    name: "Anxiety Disorder",
    category: "Mental Health",
    symptoms: ["excessive worry", "restlessness", "fatigue", "difficulty concentrating", "irritability", "sleep_disturbance", "muscle_tension"],
    riskFactors: ["family_history", "trauma", "stress", "personality_type", "other_mental_health"],
    severity: "moderate",
    recommendations: [
      "Cognitive behavioral therapy",
      "Relaxation techniques",
      "Regular exercise",
      "Medications if needed",
      "Psychiatrist consultation"
    ],
    urgency: "Schedule appointment within 1-2 weeks"
  },
  
  // Musculoskeletal
  "osteoarthritis": {
    name: "Osteoarthritis",
    category: "Musculoskeletal",
    symptoms: ["joint pain", "stiffness", "swelling", "decreased range of motion", "grating sensation"],
    riskFactors: ["age_over_50", "obesity", "joint_injury", "family_history", "repetitive_stress"],
    severity: "moderate",
    recommendations: [
      "Exercise and physical therapy",
      "Weight management",
      "Pain relievers",
      "Joint protection",
      "Orthopedic consultation"
    ],
    urgency: "Schedule appointment within 2-4 weeks"
  },
  "lower_back_pain": {
    name: "Lower Back Pain",
    category: "Musculoskeletal",
    symptoms: ["aching back", "muscle stiffness", "limited flexibility", "pain radiating to leg"],
    riskFactors: ["poor_posture", "heavy_lifting", "sedentary_lifestyle", "obesity", "age"],
    severity: "low",
    recommendations: [
      "Rest and gentle exercise",
      "Heat or ice therapy",
      "Over-the-counter pain relievers",
      "Physical therapy",
      "Ergonomic adjustments"
    ],
    urgency: "Self-care; seek help if severe or persistent"
  },
  
  // Infections
  "common_cold": {
    name: "Common Cold",
    category: "Infectious",
    symptoms: ["runny nose", "sneezing", "sore throat", "cough", "mild fever", "congestion"],
    riskFactors: ["seasonal", "exposure_to_virus", "weakened_immunity", "stress"],
    severity: "low",
    recommendations: [
      "Rest and hydration",
      "Over-the-counter remedies",
      "Humidifier",
      "Vitamin C",
      "Usually resolves in 7-10 days"
    ],
    urgency: "Self-care"
  },
  "influenza": {
    name: "Influenza (Flu)",
    category: "Infectious",
    symptoms: ["fever", "body aches", "chills", "fatigue", "cough", "sore throat", "headache"],
    riskFactors: ["seasonal", "no_vaccination", "exposure", "weakened_immunity", "age"],
    severity: "moderate",
    recommendations: [
      "Rest and fluids",
      "Antiviral medications if early",
      "Fever reducers",
      "Isolation to prevent spread",
      "Seek care if high-risk"
    ],
    urgency: "Seek care if high-risk or severe symptoms"
  },
  "covid19": {
    name: "COVID-19",
    category: "Infectious",
    symptoms: ["fever", "dry cough", "fatigue", "loss of taste", "loss of smell", "shortness of breath", "body aches"],
    riskFactors: ["exposure", "no_vaccination", "age_over_65", "chronic_conditions", "weakened_immunity"],
    severity: "high",
    recommendations: [
      "Test immediately",
      "Self-isolate",
      "Monitor oxygen levels",
      "Rest and hydration",
      "Seek emergency care if breathing difficulty"
    ],
    urgency: "Test immediately; seek care if severe symptoms"
  },
  
  // Urinary
  "uti": {
    name: "Urinary Tract Infection",
    category: "Urinary",
    symptoms: ["burning urination", "frequent urination", "cloudy urine", "pelvic pain", "blood in urine"],
    riskFactors: ["female", "sexual_activity", "menopause", "urinary_catheter", "kidney_stones"],
    severity: "low",
    recommendations: [
      "Antibiotics prescribed by doctor",
      "Hydration",
      "Cranberry juice",
      "Avoid irritants",
      "Complete full antibiotic course"
    ],
    urgency: "Schedule appointment within 24-48 hours"
  },
  
  // Skin Conditions
  "eczema": {
    name: "Eczema (Dermatitis)",
    category: "Dermatological",
    symptoms: ["itchy skin", "dry skin", "red patches", "small bumps", "cracked skin"],
    riskFactors: ["family_history", "allergies", "asthma", "irritants", "stress"],
    severity: "low",
    recommendations: [
      "Moisturize regularly",
      "Avoid triggers",
      "Topical corticosteroids",
      "Antihistamines for itching",
      "Dermatologist consultation"
    ],
    urgency: "Schedule appointment within 1-2 weeks"
  },
  "acne": {
    name: "Acne",
    category: "Dermatological",
    symptoms: ["pimples", "blackheads", "whiteheads", "oily skin", "scarring"],
    riskFactors: ["hormonal_changes", "teenagers", "stress", "certain_medications", "diet"],
    severity: "low",
    recommendations: [
      "Gentle cleansing",
      "Over-the-counter treatments",
      "Avoid picking",
      "Prescription medications if severe",
      "Dermatologist for persistent cases"
    ],
    urgency: "Self-care; see dermatologist if severe"
  },
  
  // Eye Conditions
  "conjunctivitis": {
    name: "Conjunctivitis (Pink Eye)",
    category: "Ophthalmological",
    symptoms: ["red eye", "itching", "discharge", "tearing", "gritty sensation"],
    riskFactors: ["viral_infection", "bacterial_infection", "allergies", "contact_lenses"],
    severity: "low",
    recommendations: [
      "Warm compresses",
      "Artificial tears",
      "Antibiotic drops if bacterial",
      "Avoid contact lenses",
      "Good hygiene"
    ],
    urgency: "Schedule appointment within 2-3 days"
  },
  
  // ENT
  "sinusitis": {
    name: "Sinusitis",
    category: "ENT",
    symptoms: ["facial pain", "nasal congestion", "thick nasal discharge", "reduced smell", "headache", "fever"],
    riskFactors: ["allergies", "common_cold", "nasal_polyps", "deviated_septum", "smoking"],
    severity: "low",
    recommendations: [
      "Nasal irrigation",
      "Decongestants",
      "Pain relievers",
      "Antibiotics if bacterial",
      "ENT consultation if chronic"
    ],
    urgency: "Self-care; seek help if >10 days or severe"
  },
  
  // Blood Disorders
  "anemia": {
    name: "Anemia",
    category: "Haematological",
    symptoms: ["fatigue", "weakness", "pale skin", "shortness of breath", "dizziness", "cold extremities"],
    riskFactors: ["iron_deficiency", "vitamin_b12_deficiency", "blood_loss", "chronic_disease", "pregnancy"],
    severity: "moderate",
    recommendations: [
      "Blood tests for diagnosis",
      "Iron supplements if deficient",
      "Dietary changes",
      "Treat underlying cause",
      "Hematologist consultation"
    ],
    urgency: "Schedule appointment within 1-2 weeks"
  }
};

// Symptom categories for the CNN model
export const symptomCategories = {
  general: [
    "fever", "fatigue", "weakness", "chills", "sweating", "weight loss", "weight gain"
  ],
  pain: [
    "headache", "chest pain", "abdominal pain", "joint pain", "muscle pain", "back pain", 
    "neck pain", "jaw pain", "arm pain", "leg pain", "pelvic pain", "facial pain"
  ],
  respiratory: [
    "cough", "shortness of breath", "wheezing", "sore throat", "runny nose", "congestion",
    "difficulty breathing", "chest tightness"
  ],
  gastrointestinal: [
    "nausea", "vomiting", "diarrhea", "constipation", "bloating", "heartburn", 
    "loss of appetite", "stomach cramps"
  ],
  neurological: [
    "dizziness", "confusion", "blurred vision", "numbness", "tingling", "seizures",
    "difficulty speaking", "memory problems"
  ],
  psychological: [
    "anxiety", "depression", "mood changes", "sleep disturbance", "irritability"
  ],
  skin: [
    "rash", "itching", "dry skin", "bruising", "discoloration"
  ],
  urinary: [
    "frequent urination", "painful urination", "blood in urine", "urgency"
  ],
  cardiovascular: [
    "palpitations", "irregular heartbeat", "swelling in legs", "high blood pressure"
  ]
};

// CNN Model Simulation
export class DiseasePredictionModel {
  constructor() {
    this.confidenceThreshold = 0.6;
  }

  // Simulate CNN feature extraction
  extractFeatures(selectedSymptoms, userProfile) {
    const features = {};
    
    // Count symptoms per category
    Object.keys(symptomCategories).forEach(category => {
      const count = selectedSymptoms.filter(s => 
        symptomCategories[category].includes(s.toLowerCase())
      ).length;
      features[category] = count;
    });
    
    // Add demographic features
    features.age = userProfile.age || 35;
    features.bmi = userProfile.bmi || 25;
    features.gender = userProfile.gender || 'unknown';
    
    return features;
  }

  // Simulate CNN prediction
  predict(selectedSymptoms, userProfile = {}) {
    if (!selectedSymptoms || selectedSymptoms.length === 0) {
      return { predictions: [], message: "Please select symptoms for analysis" };
    }

    const features = this.extractFeatures(selectedSymptoms, userProfile);
    const predictions = [];

    // Calculate match score for each disease
    Object.entries(diseaseDatabase).forEach(([diseaseId, disease]) => {
      let matchScore = 0;
      let matchedSymptoms = [];
      let matchedRiskFactors = [];

      // Check symptom matches
      selectedSymptoms.forEach(symptom => {
        const normalizedSymptom = symptom.toLowerCase().trim();
        disease.symptoms.forEach(ds => {
          if (ds.includes(normalizedSymptom) || normalizedSymptom.includes(ds)) {
            matchScore += 0.15;
            if (!matchedSymptoms.includes(ds)) {
              matchedSymptoms.push(ds);
            }
          }
        });
      });

      // Check risk factor matches
      if (userProfile.riskFactors) {
        userProfile.riskFactors.forEach(rf => {
          if (disease.riskFactors.includes(rf)) {
            matchScore += 0.1;
            matchedRiskFactors.push(rf);
          }
        });
      }

      // Age-based adjustments
      if (userProfile.age) {
        if (userProfile.age > 45 && disease.riskFactors.includes("age_over_45")) {
          matchScore += 0.05;
        }
        if (userProfile.age > 55 && disease.riskFactors.includes("age_over_55")) {
          matchScore += 0.05;
        }
        if (userProfile.age > 65 && disease.riskFactors.includes("age_over_65")) {
          matchScore += 0.05;
        }
      }

      // Normalize score
      matchScore = Math.min(matchScore, 0.99);

      if (matchScore > 0.2) {
        predictions.push({
          diseaseId,
          disease: disease.name,
          category: disease.category,
          confidence: matchScore,
          severity: disease.severity,
          matchedSymptoms,
          matchedRiskFactors,
          recommendations: disease.recommendations,
          urgency: disease.urgency
        });
      }
    });

    // Sort by confidence
    predictions.sort((a, b) => b.confidence - a.confidence);

    // Calculate overall risk level
    const overallRisk = this.calculateOverallRisk(predictions);

    return {
      predictions: predictions.slice(0, 5),
      overallRisk,
      totalSymptoms: selectedSymptoms.length,
      features,
      message: predictions.length > 0 
        ? `Analysis complete. Found ${predictions.length} potential conditions.` 
        : "No strong matches found. Please consult a healthcare provider."
    };
  }

  calculateOverallRisk(predictions) {
    if (predictions.length === 0) return { level: "unknown", score: 0 };

    const topPrediction = predictions[0];
    const severityScores = { low: 1, moderate: 2, high: 3 };
    
    let riskScore = topPrediction.confidence * severityScores[topPrediction.severity];
    
    // Adjust for multiple conditions
    if (predictions.length > 1) {
      riskScore += (predictions.length - 1) * 0.1;
    }

    let level;
    if (riskScore < 0.5) level = "low";
    else if (riskScore < 1.0) level = "moderate";
    else level = "high";

    return { level, score: Math.min(riskScore, 3) };
  }

  // Get all available symptoms
  getAllSymptoms() {
    const allSymptoms = new Set();
    Object.values(diseaseDatabase).forEach(disease => {
      disease.symptoms.forEach(s => allSymptoms.add(s));
    });
    return Array.from(allSymptoms).sort();
  }

  // Get symptoms by category
  getSymptomsByCategory() {
    return symptomCategories;
  }
}

// Risk factor options
export const riskFactors = [
  { id: "age_over_45", label: "Age over 45", category: "demographic" },
  { id: "age_over_55", label: "Age over 55", category: "demographic" },
  { id: "age_over_65", label: "Age over 65", category: "demographic" },
  { id: "family_history", label: "Family history of disease", category: "genetic" },
  { id: "smoking", label: "Smoking", category: "lifestyle" },
  { id: "obesity", label: "Obesity (BMI > 30)", category: "lifestyle" },
  { id: "sedentary_lifestyle", label: "Sedentary lifestyle", category: "lifestyle" },
  { id: "high_salt_diet", label: "High salt diet", category: "diet" },
  { id: "stress", label: "High stress levels", category: "lifestyle" },
  { id: "diabetes", label: "Diabetes", category: "medical" },
  { id: "high_cholesterol", label: "High cholesterol", category: "medical" },
  { id: "weakened_immunity", label: "Weakened immune system", category: "medical" },
  { id: "autoimmune_disease", label: "Autoimmune disease", category: "medical" },
  { id: "chronic_disease", label: "Chronic disease", category: "medical" },
  { id: "hormonal_changes", label: "Hormonal changes", category: "medical" },
  { id: "pregnancy", label: "Pregnancy", category: "medical" },
  { id: "recent_illness", label: "Recent illness", category: "medical" },
  { id: "no_vaccination", label: "Not vaccinated", category: "medical" },
  { id: "occupational_exposure", label: "Occupational exposure", category: "environmental" },
  { id: "air_pollution", label: "Air pollution exposure", category: "environmental" }
];

// Body parts for symptom selection
export const bodyParts = [
  { id: "head", label: "Head", icon: "brain", symptoms: ["headache", "migraine", "dizziness", "confusion"] },
  { id: "eyes", label: "Eyes", icon: "eye", symptoms: ["blurred vision", "eye pain", "red eye", "itchy eyes"] },
  { id: "ears", label: "Ears", icon: "ear", symptoms: ["earache", "hearing loss", "ringing in ears"] },
  { id: "nose", label: "Nose", icon: "nose", symptoms: ["runny nose", "congestion", "nosebleeds", "loss of smell"] },
  { id: "throat", label: "Throat", icon: "throat", symptoms: ["sore throat", "difficulty swallowing", "hoarseness"] },
  { id: "chest", label: "Chest", icon: "heart", symptoms: ["chest pain", "shortness of breath", "palpitations", "cough"] },
  { id: "abdomen", label: "Abdomen", icon: "stomach", symptoms: ["abdominal pain", "nausea", "bloating", "heartburn"] },
  { id: "back", label: "Back", icon: "back", symptoms: ["back pain", "stiffness", "muscle spasms"] },
  { id: "arms", label: "Arms", icon: "arm", symptoms: ["arm pain", "numbness", "weakness"] },
  { id: "legs", label: "Legs", icon: "leg", symptoms: ["leg pain", "swelling", "cramps"] },
  { id: "skin", label: "Skin", icon: "skin", symptoms: ["rash", "itching", "bruising", "dry skin"] },
  { id: "general", label: "General", icon: "body", symptoms: ["fever", "fatigue", "weight loss", "weakness"] }
];

export default DiseasePredictionModel;
