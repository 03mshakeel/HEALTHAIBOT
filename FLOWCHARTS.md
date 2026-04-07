# HealthAI Project - Complete Page Flowcharts

## MASTER FLOWCHART - ALL PAGES INTEGRATED

```
                              ┌────────────────────────┐
                              │   HEALTHAI START       │
                              │  Application Launch    │
                              └────────────────────────┘
                                        │
                                        ▼
                              ┌────────────────────────┐
                              │ Check Session/Token    │
                              │ in Local Storage       │
                              └────────────────────────┘
                                  │            │
                            ┌─────┴────────────┴──────┐
                            ▼                         ▼
                      ┌──────────────┐         ┌──────────────┐
                      │Session Valid │         │No Session    │
                      └──────────────┘         └──────────────┘
                            │                         │
                            ▼                         ▼
                    ┌─────────────────────────────────────────────┐
                    │         LANDING PAGE (Home)                 │
                    │ • Hero Section • Services • Testimonials    │
                    │ • Statistics • How It Works • FAQ           │
                    │ • Auth Modal (Login/Register)               │
                    │ • Navigation Bar • CTA Sections • Footer    │
                    └─────────────────────────────────────────────┘
                            │                         │
                      ┌─────┴─────────────────────────┴──────┐
                      │          User Authenticates          │
                      └──────────────────────────────────────┘
                            │
                    ┌───────┴────────┐
                    ▼                ▼
            ┌──────────────┐  ┌──────────────┐
            │ Login Form   │  │ Register Form│
            │ • Email      │  │ • Name       │
            │ • Password   │  │ • Email      │
            └──────────────┘  │ • Password   │
                    │         └──────────────┘
                    │                │
                    └────────┬───────┘
                             ▼
                    ┌──────────────────┐
                    │ Auth Successful  │
                    │ Save JWT Token   │
                    └──────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
    ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │ HEALTH CHECK   │  │  CHAT INTERFACE │  │ HEALTHCARE      │
    │  PAGE (Main)   │  │  PAGE           │  │ FINDER PAGE     │
    │                │  │                 │  │                 │
    │ • Select Body  │  │ • Chatbot       │  │ • Search        │
    │   Part         │  │ • AI Assistant  │  │   Location      │
    │ • Choose       │  │ • Get Advice    │  │ • Select        │
    │   Symptoms     │  │ • Health Tips   │  │   Specialty     │
    │ • Rate Severity│  │ • Quick Actions │  │ • Filter Results│
    │ • Risk Factors │  │ • Suggestions   │  │ • View Providers│
    │ • Get Results  │  │ • Chat History  │  │ • Book Appt     │
    │ • Disease List │  │                 │  │ • Call Provider │
    └────────────────┘  └─────────────────┘  └─────────────────┘
        │                    │                    │
        │                    │                    │
        └────────┬───────────┼───────────────────┘
                 ▼           ▼
        ┌─────────────────────────────┐
        │  USER DASHBOARD PAGE        │
        │                             │
        │ • User Profile              │
        │ • Health Records            │
        │ • Assessment History        │
        │ • Saved Providers           │
        │ • Health Statistics         │
        │ • Notifications             │
        │ • Settings/Preferences      │
        └─────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
    ┌────────────┐   ┌──────────────┐
    │Edit Profile│   │Manage Records│
    │View History│   │Check Settings│
    │Saved Doctors   │View Appts    │
    └────────────┘   └──────────────┘
        │                 │
        └────────┬────────┘
                 ▼
    ┌───────────────────────────┐
    │ ADMIN PANEL PAGE          │
    │ (Admin Users Only)        │
    │                           │
    │ • Dashboard Overview      │
    │ • User Management         │
    │ • Content Management      │
    │ • Health Data Management  │
    │ • Analytics & Reports     │
    │ • System Settings         │
    │ • Security & Logs         │
    │ • Backup & Updates        │
    └───────────────────────────┘
            │
    ┌───────┴───────┐
    ▼               ▼
┌─────────┐    ┌──────────┐
│View/Edit│    │Analytics │
│Users    │    │& Reports │
└─────────┘    └──────────┘
    │               │
    └───────┬───────┘
            ▼
    ┌─────────────────┐
    │ Manage Content  │
    │ • Diseases      │
    │ • Providers     │
    │ • FAQs          │
    └─────────────────┘
            │
    ┌───────┴────────┐
    ▼                ▼
┌──────────┐    ┌──────────┐
│Database  │    │Settings  │
│Content   │    │Security  │
└──────────┘    └──────────┘
    │                │
    └────────┬───────┘
             ▼
    ┌──────────────────┐
    │ Logout / Redirect│
    │ Back to Home     │
    └──────────────────┘


═══════════════════════════════════════════════════════════════
                    INTERCONNECTION MATRIX
═══════════════════════════════════════════════════════════════

HOME/LANDING PAGE
├─ Leads to: Health Check, Chat, Healthcare Finder, Dashboard
├─ Auth Modal: Login / Register
└─ Navigation: Hero → Services → HowItWorks → FAQ → CTA

HEALTH CHECK PAGE
├─ Symptom Selection ──→ Results ──→ Disease List
├─ Navigation Options:
│  ├─ Find Specialists (Healthcare Finder)
│  ├─ Save Results (Dashboard)
│  ├─ Chat with Bot (Chat Interface)
│  └─ Share Results (Social/Email)
└─ Requires: User Authentication

HEALTHCARE FINDER PAGE
├─ Location Input ──→ Search Filters ──→ Results List
├─ Provider Details:
│  ├─ View Full Info
│  ├─ Call Provider
│  ├─ Book Appointment
│  ├─ Save Favorites (Dashboard)
│  └─ Get Directions
└─ Integration: Health Check Results → Specialist Search

CHAT INTERFACE PAGE
├─ Chat Input ──→ AI Response ──→ Suggestions
├─ Quick Actions:
│  ├─ Start Health Check
│  ├─ Find Healthcare
│  ├─ View Dashboard
│  └─ End Chat
└─ Chat History: Saved in Dashboard

USER DASHBOARD PAGE
├─ Profile Management
│  ├─ Edit Profile
│  ├─ Change Password
│  └─ Preferences
├─ Health Records
│  ├─ Add New Record
│  ├─ View History
│  └─ Export Data
├─ Assessment History
│  ├─ View Results
│  ├─ Repeat Assessment (→ Health Check)
│  ├─ Print Report
│  └─ Compare Results
├─ Saved Providers
│  ├─ View Details
│  ├─ Call / Book (→ Healthcare Finder)
│  └─ Remove Favorites
├─ Quick Navigation:
│  ├─ Health Check
│  ├─ Healthcare Finder
│  ├─ Chat Interface
│  └─ Admin Panel (if admin)
└─ Settings & Logout

ADMIN PANEL PAGE
├─ Dashboard Overview (Metrics & Analytics)
├─ User Management
│  ├─ View / Edit / Delete Users
│  ├─ Manage Roles
│  └─ Send Notifications
├─ Content Management
│  ├─ Disease Database
│  ├─ Healthcare Providers
│  ├─ FAQs
│  └─ Testimonials
├─ Health Data Management
│  ├─ Symptoms Database
│  ├─ Risk Factors
│  └─ Medical Specialties
├─ Analytics & Reports
│  ├─ User Growth
│  ├─ Assessment Analytics
│  ├─ Provider Performance
│  └─ System Metrics
├─ System Settings
│  ├─ General Settings
│  ├─ Email Configuration
│  ├─ Security Settings
│  ├─ API Management
│  └─ Backup & Restore
└─ Back to Dashboard / Logout


═══════════════════════════════════════════════════════════════
                        USER FLOWS
═══════════════════════════════════════════════════════════════

FLOW 1: Health Problem → Solution
  Landing Page 
    ↓
  Health Check Page (Enter Symptoms)
    ↓
  View Disease Predictions
    ↓
  Healthcare Finder Page (Find Specialist)
    ↓
  Book Appointment / Call Provider
    ↓
  Save to Dashboard
    ↓
  Follow-up in Chat Interface

FLOW 2: Information Seeking
  Landing Page
    ↓
  Chat Interface (Ask Questions)
    ↓
  Get AI Guidance
    ↓
  Request Health Check Info
    ↓
  Healthcare Finder (if needed)
    ↓
  Dashboard (Save Conversation)

FLOW 3: Profile Management & History
  Dashboard Page
    ↓
  View Health Records
    ↓
  View Past Assessments
    ↓
  Repeat Health Check (→ Health Check Page)
    ↓
  View Saved Providers (→ Healthcare Finder)
    ↓
  Schedule Follow-ups

FLOW 4: Provider Management
  Healthcare Finder Page
    ↓
  Search & Filter Providers
    ↓
  View Provider Details
    ↓
  Book Appointment / Call
    ↓
  Save to Favorites (→ Dashboard)
    ↓
  View Appointment History (→ Dashboard)

FLOW 5: System Administration
  Admin Panel Page
    ↓
  View System Analytics
    ↓
  Manage Users / Content / Health Data
    ↓
  Generate Reports
    ↓
  System Settings & Maintenance
    ↓
  Monitor Logs & Performance

═══════════════════════════════════════════════════════════════
```

---

## 1. HOME/LANDING PAGE FLOW

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (Home)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      ┌──────────────────┐
                      │   Navigation Bar │
                      │  [Logo | Menu]   │
                      └──────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
         ┌──────────┐  ┌──────────┐  ┌──────────────┐
         │ Login    │  │ Signup   │  │ Menu Links   │
         │ Button   │  │ Button   │  │ (Nav Items)  │
         └──────────┘  └──────────┘  └──────────────┘
                │             │              │
                └─────────────┼──────────────┘
                              ▼
                   ┌────────────────────┐
                   │  Auth Modal Opens  │
                   │  (Login/Register)  │
                   └────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
        ┌────────────────┐        ┌────────────────┐
        │  Login Form    │        │  Register Form │
        │ • Email        │        │ • First Name   │
        │ • Password     │        │ • Email        │
        │ • Remember Me  │        │ • Password     │
        └────────────────┘        │ • Confirm Pass │
                │                 └────────────────┘
                │                         │
        ┌───────┴─────────────────────────┴───────┐
        ▼                                         ▼
┌─────────────────────┐              ┌─────────────────────┐
│ Validate            │              │ Validate            │
│ Credentials         │              │ Input Fields        │
└─────────────────────┘              └─────────────────────┘
        │                                         │
    ┌───┴────┐                              ┌────┴───┐
    ▼        ▼                              ▼        ▼
 [Pass] [Fail]                         [Valid] [Invalid]
    │        │                              │        │
    │        ▼                              │        ▼
    │   Error Message                       │    Error Alert
    │   (Retry)                             │    (Retry)
    │        │                              │        │
    │        └──────────────┬───────────────┘        │
    │                       │                         │
    ▼                       ▼                         ▼
┌──────────────────┐   ┌──────────────┐    ┌─────────────────┐
│ Auth Successful  │   │ Create User  │    │ Show Landing   │
│ Save to Local    │   │ in Database  │    │ Page Sections  │
│ Storage          │   │              │    │                │
└──────────────────┘   └──────────────┘    └─────────────────┘
         │                   │                       │
         └───────┬───────────┘                       │
                 ▼                                   ▼
        ┌─────────────────┐         ┌────────────────────────┐
        │ Go to Dashboard │         │  HERO SECTION          │
        │ or Home         │         │  • Title & Description │
        └─────────────────┘         │  • CTA Buttons         │
                                    │  • Hero Image/Video    │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ STATISTICS SECTION     │
                                    │ • User Count           │
                                    │ • Assessments Done     │
                                    │ • Healthcare Providers │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ SERVICES SECTION       │
                                    │ • Disease Prediction   │
                                    │ • Healthcare Finder    │
                                    │ • Health Chat          │
                                    │ • User Dashboard       │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ HOW IT WORKS SECTION   │
                                    │ • Step 1: Enter        │
                                    │ • Step 2: Analyze      │
                                    │ • Step 3: Get Results  │
                                    │ • Step 4: Find Help    │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ CHATBOT SECTION        │
                                    │ • Chat Widget          │
                                    │ • Quick Help           │
                                    │ • FAQ Integration      │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ FIND HEALTHCARE        │
                                    │ • Map View             │
                                    │ • Search Providers     │
                                    │ • Filter by Specialty  │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ TESTIMONIALS SECTION   │
                                    │ • User Reviews         │
                                    │ • Success Stories      │
                                    │ • Ratings              │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ FAQ SECTION            │
                                    │ • Common Questions     │
                                    │ • Expandable Answers   │
                                    │ • Search FAQ           │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ CTA SECTION            │
                                    │ • Get Started Button   │
                                    │ • Download App         │
                                    │ • Contact Us           │
                                    └────────────────────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ FOOTER                 │
                                    │ • Links                │
                                    │ • Social Media         │
                                    │ • Copyright            │
                                    │ • Privacy Policy       │
                                    └────────────────────────┘
```

---

## 2. HEALTH CHECK PAGE FLOW

```
┌──────────────────────────────────────────┐
│      HEALTH CHECK COMPONENT               │
│    (Disease Prediction Module)            │
└──────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Is User Logged In?  │
    └─────────────────────┘
         │           │
       YES          NO
         │           │
         │           ▼
         │      ┌─────────────────┐
         │      │ Show Auth Modal │
         │      │ (Login/Register)│
         │      └─────────────────┘
         │              │
         └──────┬───────┘
                ▼
    ┌──────────────────────────┐
    │ SYMPTOM SELECTION SCREEN │
    │ • Select Body Part       │
    │ • Choose Symptoms        │
    │ • Rate Symptom Duration  │
    │ • Frequency (Daily/etc)  │
    └──────────────────────────┘
              │
              ▼
    ┌──────────────────────────┐
    │ BODY PART SELECTION      │
    │ • Head & Neck            │
    │ • Chest & Heart          │
    │ • Respiratory System     │
    │ • Digestive System       │
    │ • Musculoskeletal        │
    │ • Neurological           │
    │ • Skin & Dermatology     │
    │ • Mental/Emotional       │
    └──────────────────────────┘
              │
    ┌─────────┼─────────┬──────────┬──────────────┐
    ▼         ▼         ▼          ▼              ▼
 ┌─────┐ ┌──────┐ ┌──────┐   ┌──────────┐   ┌──────┐
 │Head │ │Chest │ │Stomach│  │Muscles & │   │Skin │
 └─────┘ └──────┘ └──────┘   │Bones    │   └──────┘
    │         │        │      └──────────┘      │
    │         │        │           │            │
    ▼         ▼        ▼           ▼            ▼
┌────────┐┌──────────┐┌───────┐┌───────────┐┌────────┐
│Headache││Chest Pain││Nausea ││Pain/Aches ││Rashes │
│Dizziness│Shortness ││Diarrhea│Stiffness  │Itching │
│Migraines│of Breath ││Bloating│Weakness   │Burning │
│Numbness ││Palpitat.││Cramps ││Swelling   │Redness │
└────────┘└──────────┘└───────┘└───────────┘└────────┘
    │         │        │           │            │
    └─────────┼────────┼───────────┼────────────┘
              ▼
    ┌──────────────────────────┐
    │ SYMPTOM DETAILS FORM     │
    │ • Symptom Duration       │
    │ • Frequency              │
    │ • Severity (1-10)        │
    │ • Associated Symptoms    │
    │ • Timeline               │
    └──────────────────────────┘
              │
              ▼
    ┌──────────────────────────┐
    │ RISK FACTOR ASSESSMENT   │
    │ • Age                    │
    │ • Gender                 │
    │ • Family History         │
    │ • Smoking Status         │
    │ • Alcohol Consumption    │
    │ • Lifestyle              │
    │ • Exercise Level         │
    │ • Diet Type              │
    │ • BMI/Weight             │
    │ • Stress Level           │
    │ • Sleep Quality          │
    │ • Chronic Conditions     │
    │ • Current Medications    │
    │ • Allergies              │
    └──────────────────────────┘
              │
              ▼
    ┌──────────────────────────┐
    │ PROCESS ASSESSMENT       │
    │ • Vectorize Symptoms     │
    │ • Weight Risk Factors    │
    │ • Extract Features       │
    │ • Run CNN Model          │
    │ • Calculate Risk Scores  │
    │ • Generate Predictions   │
    └──────────────────────────┘
              │
              ▼
    ┌──────────────────────────┐
    │ DISEASE RESULTS SCREEN   │
    │ • Top Predicted Diseases │
    │ • Risk Scores (0-100)    │
    │ • Severity Level         │
    │ • Confidence Percentage  │
    └──────────────────────────┘
              │
    ┌─────────┴─────────────────┐
    ▼                           ▼
┌──────────────────┐  ┌──────────────────────┐
│ DISEASE DETAILS  │  │ RECOMMENDED SPECIALTY│
│ • Description    │  │ Cardiologist         │
│ • Symptoms List  │  │ Neurologist          │
│ • Risk Factors   │  │ Pulmonologist        │
│ • Urgency Level  │  │ Dermatologist        │
│ • Recommend.     │  │ Gastroenterologist   │
│   Actions        │  │ Psychiatrist         │
│ • When to Seek   │  │ General Practitioner │
│   Care           │  └──────────────────────┘
└──────────────────┘            │
              │                 │
              └────────┬────────┘
                       ▼
            ┌────────────────────┐
            │ ACTION BUTTONS     │
            │ • Find Specialists │
            │ • Save Results     │
            │ • Print Report     │
            │ • Chat with Bot    │
            │ • Share Results    │
            │ • Schedule Follow  │
            └────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │Go to   │  │Save to   │  │Navigate  │
    │Health  │  │Health    │  │to Health │
    │care    │  │History   │  │care      │
    │Finder  │  │Dashboard │  │Finder    │
    └────────┘  └──────────┘  └──────────┘
```

---

## 3. HEALTHCARE FINDER PAGE FLOW

```
┌──────────────────────────────────────────┐
│     HEALTHCARE FINDER COMPONENT           │
│    (Provider Discovery Module)            │
└──────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────┐
    │ GET USER LOCATION       │
    │ • GPS/Geolocation       │
    │ • IP Location           │
    │ • Manual Input          │
    │ • Use Last Search       │
    └─────────────────────────┘
              │
              ▼
    ┌─────────────────────────┐
    │ SEARCH FILTERS PANEL    │
    │ • Specialty Selection   │
    │ • Distance Radius       │
    │ • Provider Type         │
    │ • Available Hours       │
    │ • Insurance Accepted    │
    │ • Ratings Filter        │
    │ • Telemedicine Option   │
    └─────────────────────────┘
              │
    ┌─────────┴──────────────────────┐
    ▼                                ▼
┌──────────────┐        ┌──────────────────────┐
│ SPECIALTIES  │        │ DISTANCE RADIUS      │
│ • Cardiology │        │ • 1 km               │
│ • Neurology  │        │ • 5 km               │
│ • Pulmonary  │        │ • 10 km              │
│ • Orthopedic │        │ • 25 km              │
│ • Psychiatry │        │ • 50 km              │
│ • Dermatolog │        │ • Custom             │
│ • Pediatrics │        └──────────────────────┘
│ • Gen. Pract.│
└──────────────┘
    │                                │
    └────────────┬───────────────────┘
                 ▼
    ┌─────────────────────────┐
    │ PROVIDER TYPE FILTER    │
    │ • Hospitals             │
    │ • Clinics               │
    │ • Private Practice      │
    │ • Group Practice        │
    │ • Urgent Care           │
    │ • Telehealth Only       │
    └─────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │ DATABASE QUERY          │
    │ • Filter by Specialty   │
    │ • Calculate Distances   │
    │ • Apply Filters         │
    │ • Get Ratings/Reviews   │
    │ • Check Availability    │
    └─────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────┐
    │ RESULTS SORTING                 │
    │ • By Distance (Closest)         │
    │ • By Rating (Highest)           │
    │ • By Availability               │
    │ • By Insurance Match            │
    │ • Combined Relevance Score      │
    └─────────────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────┐
    │ SEARCH RESULTS DISPLAY          │
    │ • List View / Map View Toggle   │
    │ • Show Results Count            │
    │ • Pagination / Infinite Scroll  │
    └─────────────────────────────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    ┌──────┐┌──────┐┌─────────┐
    │List  ││Map   ││Cards    │
    │View  ││View  ││View     │
    └──────┘└──────┘└─────────┘
        │        │        │
        └────────┼────────┘
                 ▼
    ┌──────────────────────────┐
    │ PROVIDER CARD            │
    │ • Name & Image           │
    │ • Specialty              │
    │ • Address & Distance     │
    │ • Phone & Website        │
    │ • Hours of Operation     │
    │ • Rating & Reviews Count │
    │ • Insurance Accepted     │
    │ • Availability Indicator │
    │ • Quick Action Buttons   │
    └──────────────────────────┘
                 │
        ┌────────┼────────┬──────────┐
        ▼        ▼        ▼          ▼
    ┌────┐  ┌────┐   ┌────┐    ┌────────┐
    │Call│  │View││  │Book│    │Directions
    │    │  │Info│  │Appt│    │        │
    └────┘  └────┘   └────┘    └────────┘
        │        │        │          │
        │        │        │          │
        ▼        ▼        ▼          ▼
    ┌──────┐┌──────┐┌──────┐  ┌──────────┐
    │Dial  ││Show  ││Open  │  │Navigate  │
    │Phone ││Full  ││Book  │  │on Maps   │
    │      ││Info  ││Appt  │  │          │
    └──────┘└──────┘└──────┘  └──────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ PROVIDER DETAIL PAGE     │
    │ • Full Contact Info      │
    │ • Full Address           │
    │ • Complete Hours         │
    │ • All Reviews/Ratings    │
    │ • Services Offered       │
    │ • Insurance Details      │
    │ • Medical Staff Profiles │
    │ • Facilities Info        │
    │ • Directions/Map         │
    │ • Book Appointment       │
    │ • Call Provider          │
    │ • Save Favorites         │
    └──────────────────────────┘
                 │
        ┌────────┼────────┬──────────┐
        ▼        ▼        ▼          ▼
    ┌────┐  ┌──────┐  ┌────┐    ┌────────┐
    │Call││  │Save  │  │Book│    │Share   │
    │    │  │      │  │Appt│    │Profile │
    └────┘  └──────┘  └────┘    └────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ APPOINTMENT BOOKING      │
    │ • Date Selection         │
    │ • Time Selection         │
    │ • Reason for Visit       │
    │ • Insurance Info Entry   │
    │ • Confirm Booking        │
    └──────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ BOOKING CONFIRMATION     │
    │ • Confirmation Number    │
    │ • Appointment Details    │
    │ • Reminder Settings      │
    │ • Add to Calendar        │
    │ • Send Confirmation      │
    └──────────────────────────┘
```

---

## 4. CHAT INTERFACE PAGE FLOW

```
┌──────────────────────────────────────────┐
│      CHAT INTERFACE COMPONENT             │
│    (AI Chatbot Health Guidance)           │
└──────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────┐
    │ IS USER LOGGED IN?      │
    └─────────────────────────┘
         │               │
        YES             NO
         │               │
         │               ▼
         │         ┌──────────────┐
         │         │ Show Auth    │
         │         │ Modal        │
         │         └──────────────┘
         │               │
         └───────┬───────┘
                 ▼
    ┌─────────────────────────┐
    │ LOAD CHAT HISTORY       │
    │ • Fetch Previous Msgs   │
    │ • Load Context          │
    │ • Initialize State      │
    └─────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │ CHAT INTERFACE DISPLAY  │
    │ • Message List Area     │
    │ • Input Box             │
    │ • Send Button           │
    │ • Quick Suggestion Btns │
    │ • Suggested Topics      │
    └─────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │ USER INPUT AREA         │
    │ • Type Health Question  │
    │ • Attach Files/Images   │
    │ • Emoji Support         │
    │ • Auto-suggestions      │
    └─────────────────────────┘
                 │
    ┌───────────┴──────────────────────┐
    ▼                                  ▼
┌──────────────────┐      ┌─────────────────────┐
│ TYPE QUESTION    │      │ SELECT QUICK OPTION │
│ (Free Input)     │      │ • Symptom Checker   │
│                  │      │ • Find Doctor       │
│                  │      │ • Health Tips       │
│                  │      │ • Medication Info   │
│                  │      │ • Emergency Help    │
│                  │      │ • FAQ               │
└──────────────────┘      └─────────────────────┘
         │                         │
         └────────────┬────────────┘
                      ▼
         ┌──────────────────────┐
         │ VALIDATE INPUT       │
         │ • Check Length       │
         │ • Check Content      │
         │ • Detect Language    │
         │ • Extract Keywords   │
         └──────────────────────┘
                      │
                      ▼
         ┌──────────────────────┐
         │ DISPLAY USER MESSAGE │
         │ • Show in Chat Box   │
         │ • Add Timestamp      │
         │ • Show Avatar/Icon   │
         │ • Scroll to Latest   │
         └──────────────────────┘
                      │
                      ▼
         ┌──────────────────────┐
         │ SHOW TYPING INDICATOR│
         │ (Bot is responding)  │
         └──────────────────────┘
                      │
                      ▼
    ┌─────────────────────────────────┐
    │ PROCESS USER MESSAGE            │
    │ • Analyze Intent                │
    │ • Extract Entities              │
    │ • Check Context History         │
    │ • Identify Symptoms             │
    │ • Get Relevant Info             │
    └─────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │Symptom ││   │Doctor  │   │General │
    │Query   │   │Query   │   │Health  │
    └────────┘   └────────┘   └────────┘
        │             │             │
        ▼             ▼             ▼
    ┌────────┐   ┌────────┐   ┌────────┐
    │Match   │   │Find    │   │Search  │
    │with    │   │Nearby  │   │Health  │
    │Disease ││   │Doctors │   │Info    │
    └────────┘   └────────┘   └────────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
    ┌─────────────────────────────────┐
    │ GENERATE BOT RESPONSE           │
    │ • Select Response Template      │
    │ • Personalize with User Data    │
    │ • Add Relevant Links            │
    │ • Include Action Buttons        │
    │ • Format with Markdown          │
    └─────────────────────────────────┘
                      │
                      ▼
    ┌─────────────────────────────────┐
    │ DISPLAY BOT RESPONSE            │
    │ • Remove Typing Indicator       │
    │ • Show Full Message             │
    │ • Display Action Buttons        │
    │ • Add Reaction Buttons          │
    │ • Highlight Important Text      │
    │ • Add Related Articles Links    │
    └─────────────────────────────────┘
                      │
        ┌─────────────┼──────────┬─────────┐
        ▼             ▼          ▼         ▼
    ┌──────┐    ┌────────┐  ┌──────┐  ┌──────┐
    │Ask   │    │Schedule││  │Find │  │Save │
    │More  │    │Doctor  │  │Info │  │Chat │
    └──────┘    └────────┘  └──────┘  └──────┘
        │             │          │         │
        └─────────────┼──────────┼─────────┘
                      ▼
    ┌─────────────────────────────────┐
    │ SAVE MESSAGE TO HISTORY         │
    │ • Store User Message            │
    │ • Store Bot Response            │
    │ • Track Timestamp               │
    │ • Update Context                │
    │ • Update User Health Profile    │
    └─────────────────────────────────┘
                      │
                      ▼
    ┌─────────────────────────────────┐
    │ WAIT FOR NEXT USER INPUT        │
    │ • Ready for Next Message        │
    │ • Show Suggestions              │
    │ • Display Related Topics        │
    │ • Option to Start Over          │
    └─────────────────────────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │ QUICK ACTION OPTIONS     │
         │ • Start Health Check     │
         │ • Find Healthcare        │
         │ • View My Dashboard      │
         │ • Save This Conversation │
         │ • End Chat               │
         └──────────────────────────┘
```

---

## 5. USER DASHBOARD PAGE FLOW

```
┌──────────────────────────────────────────┐
│      USER DASHBOARD COMPONENT             │
│    (Health Profile & History)             │
└──────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────┐
    │ IS USER LOGGED IN?      │
    └─────────────────────────┘
         │               │
        YES             NO
         │               │
         │               ▼
         │         ┌──────────────┐
         │         │ Redirect to  │
         │         │ Login        │
         │         └──────────────┘
         │
         ▼
    ┌──────────────────────────┐
    │ FETCH USER DATA          │
    │ • Profile Info           │
    │ • Assessment History     │
    │ • Saved Providers        │
    │ • Health Records         │
    │ • Preferences            │
    │ • Notifications          │
    └──────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────────┐
    │ DASHBOARD MAIN LAYOUT        │
    │ • Header                     │
    │ • Sidebar Navigation         │
    │ • Main Content Area          │
    │ • Quick Access Cards         │
    └──────────────────────────────┘
                 │
        ┌────────┼────────┬──────────┬──────────┐
        ▼        ▼        ▼          ▼          ▼
    ┌────┐  ┌────┐   ┌────┐    ┌────────┐  ┌────┐
    │Head││  │Prof││  │His ││   │Health  │  │Sett│
    │    │  │ile │  │tory│   │  │Records │  │    │
    └────┘  └────┘   └────┘    └────────┘  └────┘

┌────────────────────────────────────────────────┐
│           PROFILE SECTION                      │
├────────────────────────────────────────────────┤
│ • User Avatar                                  │
│ • Display Name & Email                         │
│ • Date of Birth & Age                          │
│ • Gender & Blood Type                          │
│ • Emergency Contact                            │
│ • Insurance Information                        │
│ • Edit Profile Button                          │
│ • Upload Photo Option                          │
└────────────────────────────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ EDIT PROFILE MODAL       │
    │ • Name Fields            │
    │ • Contact Info           │
    │ • Address                │
    │ • Phone Number           │
    │ • Emergency Contact      │
    │ • Medical Info           │
    │ • Save/Cancel Buttons    │
    └──────────────────────────┘

┌────────────────────────────────────────────────┐
│         HEALTH RECORDS SECTION                 │
├────────────────────────────────────────────────┤
│ • Medical Conditions                           │
│ • Current Medications                          │
│ • Allergies & Intolerances                     │
│ • Past Surgeries                               │
│ • Vaccinations                                 │
│ • Add New Record Button                        │
│ • Edit Existing Records                        │
│ • Delete Records                               │
└────────────────────────────────────────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ ADD HEALTH RECORD MODAL  │
    │ • Record Type Selector   │
    │ • Description/Details    │
    │ • Date of Occurrence     │
    │ • Doctor Name            │
    │ • Hospital/Clinic        │
    │ • Attach Documents       │
    │ • Save/Cancel Buttons    │
    └──────────────────────────┘

┌────────────────────────────────────────────────┐
│      ASSESSMENT HISTORY SECTION                │
├────────────────────────────────────────────────┤
│ • List of Past Assessments                     │
│ • Date & Time Completed                        │
│ • Primary Findings                             │
│ • Results Summary                              │
│ • View Full Report Button                      │
│ • Repeat Assessment Option                     │
│ • Delete Assessment Option                     │
│ • Export/Print Button                          │
└────────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
    ┌──────────┐     ┌──────────────────┐
    │View      │     │Repeat Assessment │
    │Full      │     │ • Pre-fill Data  │
    │Report    │     │ • Same Symptoms  │
    └──────────┘     │ • Compare Results│
        │             └──────────────────┘
        │
        ▼
    ┌──────────────────────────┐
    │ ASSESSMENT REPORT        │
    │ • Date & Time            │
    │ • Symptoms Entered       │
    │ • Risk Factors           │
    │ • Top Diseases Found     │
    │ • Risk Scores            │
    │ • Recommendations        │
    │ • Suggested Specialists  │
    │ • Export/Print Options   │
    └──────────────────────────┘

┌────────────────────────────────────────────────┐
│       SAVED PROVIDERS SECTION                  │
├────────────────────────────────────────────────┤
│ • List of Bookmarked Doctors/Clinics           │
│ • Provider Name & Specialty                    │
│ • Distance & Location                          │
│ • Rating & Contact Info                        │
│ • Call/Visit/Book Actions                      │
│ • Remove from Favorites Option                 │
│ • Appointment History with Provider            │
└────────────────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    ┌──────┐┌──────┐  ┌────────┐
    │Call  ││Visit ││  │Book    │
    │      ││Site  │  │Appt    │
    └──────┘└──────┘  └────────┘

┌────────────────────────────────────────────────┐
│      HEALTH STATISTICS SECTION                 │
├────────────────────────────────────────────────┤
│ • Assessment Count (Total)                     │
│ • Last Assessment Date                         │
│ • Most Visited Specialties                     │
│ • Health Score Trends                          │
│ • Risk Factors Tracking                        │
│ • Charts & Graphs                              │
│ • Download Health Report                       │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│         NOTIFICATIONS SECTION                  │
├────────────────────────────────────────────────┤
│ • Appointment Reminders                        │
│ • Health Tips & Articles                       │
│ • New Features Announcements                   │
│ • System Messages                              │
│ • Notification Settings                        │
│ • Clear Notifications Button                   │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│         SETTINGS SECTION                       │
├────────────────────────────────────────────────┤
│ • Privacy Settings                             │
│ • Notification Preferences                     │
│ • Theme (Dark/Light)                           │
│ • Language Selection                           │
│ • Two-Factor Authentication                    │
│ • Change Password                              │
│ • Data Export                                  │
│ • Account Deletion Option                      │
│ • Logout Button                                │
└────────────────────────────────────────────────┘
```

---

## 6. ADMIN PANEL PAGE FLOW

```
┌──────────────────────────────────────────┐
│      ADMIN PANEL COMPONENT                │
│    (System Administration & Control)      │
└──────────────────────────────────────────┘
              │
              ▼
    ┌─────────────────────────┐
    │ IS ADMIN USER?          │
    └─────────────────────────┘
         │               │
       YES              NO
         │               │
         │               ▼
         │         ┌──────────────┐
         │         │ Access       │
         │         │ Denied Page  │
         │         └──────────────┘
         │
         ▼
    ┌──────────────────────────┐
    │ ADMIN DASHBOARD LAYOUT   │
    │ • Sidebar Navigation     │
    │ • Top Statistics Bar     │
    │ • Main Content Area      │
    │ • Quick Actions          │
    └──────────────────────────┘
                 │
    ┌────────────┼───────────┬────────────┬─────────┬────────┐
    ▼            ▼           ▼            ▼         ▼        ▼
┌─────────┐ ┌──────┐   ┌────────┐   ┌──────┐  ┌───────┐ ┌──────┐
│Dashboard││ │Users ││   │Content ││   │Health││ │Reports│ │System│
│Overview │ │Mgmt  │   │Mgmt    │   │Data  │ │& Analyt│ │Sett │
└─────────┘ └──────┘   └────────┘   └──────┘  └───────┘ └──────┘

┌─────────────────────────────────────────────┐
│        ADMIN DASHBOARD OVERVIEW             │
├─────────────────────────────────────────────┤
│ • Total Users Count                         │
│ • Active Users (Today/Week/Month)           │
│ • New Registrations                         │
│ • Total Assessments Completed               │
│ • Healthcare Providers Listed                │
│ • System Health Status                      │
│ • Server Uptime & Performance               │
│ • Recent Activities Feed                    │
│ • Alerts & Issues                           │
│ • Key Metrics Charts                        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         USER MANAGEMENT SECTION             │
├─────────────────────────────────────────────┤
│ • View All Users List                       │
│ • User Search & Filter                      │
│   - By Name/Email                           │
│   - By Registration Date                    │
│   - By Activity Level                       │
│   - By Role/Status                          │
│ • User Information Display                  │
│   - Name, Email, Phone                      │
│   - Registration Date                       │
│   - Last Login                              │
│   - Account Status                          │
│ • User Actions                              │
│   - View User Profile                       │
│   - Edit User Info                          │
│   - Reset Password                          │
│   - Change User Role                        │
│   - Suspend/Ban User                        │
│   - Delete User Account                     │
│ • Bulk User Actions                         │
│   - Export User List                        │
│   - Bulk Status Update                      │
│   - Send Notification                       │
└─────────────────────────────────────────────┘
                 │
        ┌────────┼──────────┐
        ▼        ▼          ▼
    ┌────────┐┌────────┐┌─────────┐
    │View    ││Edit    ││Delete   │
    │Profile ││Details ││Account  │
    └────────┘└────────┘└─────────┘

┌─────────────────────────────────────────────┐
│      CONTENT MANAGEMENT SECTION             │
├─────────────────────────────────────────────┤
│ • Disease Database Management               │
│   - Add New Disease                         │
│   - Edit Disease Info                       │
│   - Update Symptoms List                    │
│   - Modify Risk Factors                     │
│   - Update Recommendations                  │
│   - Delete Disease Entry                    │
│ • Healthcare Provider Management            │
│   - Add New Provider                        │
│   - Edit Provider Details                   │
│   - Update Location/Hours                   │
│   - Verify Provider License                 │
│   - Approve New Providers                   │
│   - Remove Provider                         │
│ • FAQ Management                            │
│   - Create New FAQ                          │
│   - Edit Questions/Answers                  │
│   - Categorize FAQs                         │
│   - Delete Outdated FAQs                    │
│ • Testimonial Management                    │
│   - View User Testimonials                  │
│   - Approve/Reject Testimonials             │
│   - Feature Best Testimonials               │
│   - Manage Display Settings                 │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│       HEALTH DATA MANAGEMENT SECTION        │
├─────────────────────────────────────────────┤
│ • Disease Database                          │
│   - 20+ Disease Categories                  │
│   - Symptom & Risk Factor Data              │
│   - Treatment Recommendations               │
│ • Symptom Classification                    │
│   - Body System Organization                │
│   - Severity Levels                         │
│   - Associated Risk Factors                 │
│ • Risk Factors Database                     │
│   - Demographic Factors                     │
│   - Lifestyle Factors                       │
│   - Family History Factors                  │
│   - Environmental Factors                   │
│ • Medical Specialties                       │
│   - Add/Edit Specialties                    │
│   - Assign to Providers                     │
│   - Update Descriptions                     │
│ • Data Validation & Quality Control         │
│   - Data Consistency Checks                 │
│   - Missing Data Reports                    │
│   - Duplicate Detection                     │
│   - Data Import/Export                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│       ANALYTICS & REPORTING SECTION        │
├─────────────────────────────────────────────┤
│ • User Analytics                            │
│   - User Growth Chart                       │
│   - Active Users Trend                      │
│   - User Retention Rate                     │
│   - Geographic Distribution                 │
│ • Assessment Analytics                      │
│   - Total Assessments Done                  │
│   - Assessments by Disease Type             │
│   - Most Predicted Diseases                 │
│   - Assessment Trends                       │
│ • Healthcare Provider Analytics             │
│   - Most Visited Providers                  │
│   - Top Specialties Searched                │
│   - Provider Performance Metrics            │
│   - Booking Success Rate                    │
│ • System Performance Metrics                │
│   - Page Load Times                         │
│   - API Response Times                      │
│   - Server Uptime %                         │
│   - Error Rates                             │
│ • Custom Report Generator                   │
│   - Select Date Range                       │
│   - Choose Metrics                          │
│   - Filter by Category                      │
│   - Generate PDF/CSV Report                 │
│ • Export Options                            │
│   - PDF Download                            │
│   - CSV/Excel Export                        │
│   - Email Report                            │
│   - Schedule Regular Reports                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        SYSTEM SETTINGS SECTION              │
├─────────────────────────────────────────────┤
│ • General Settings                          │
│   - Site Name & Logo                        │
│   - Main URL                                │
│   - Contact Email                           │
│   - Support Phone                           │
│ • Email Configuration                       │
│   - SMTP Server Settings                    │
│   - Email Templates                         │
│   - Notification Settings                   │
│   - Bulk Email Tools                        │
│ • Security Settings                         │
│   - Password Policy                         │
│   - Two-Factor Authentication               │
│   - IP Whitelist                            │
│   - API Key Management                      │
│   - Session Timeout                         │
│ • API & Integration Settings                │
│   - API Endpoint Configuration              │
│   - Third-party Integrations                │
│   - API Key Generation                      │
│   - Rate Limiting Settings                  │
│ • Backup & Data Management                  │
│   - Automated Backups Schedule              │
│   - Manual Backup Option                    │
│   - Restore from Backup                     │
│   - Data Export Tools                       │
│ • Logs & Monitoring                         │
│   - System Logs Viewer                      │
│   - Error Logs                              │
│   - User Activity Logs                      │
│   - API Request Logs                        │
│   - Server Status Monitoring                │
│ • Software Updates                          │
│   - Check for Updates                       │
│   - Update Scheduling                       │
│   - Rollback Option                         │
│   - Changelog View                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│       ADMIN QUICK ACTIONS                   │
├─────────────────────────────────────────────┤
│ • Create New User                           │
│ • Send Announcement                         │
│ • Clear Cache                               │
│ • Run Maintenance                           │
│ • View System Logs                          │
│ • Check Server Status                       │
│ • Manage API Keys                           │
│ • Export Data                               │
│ • Create Backup                             │
│ • Admin Settings                            │
└─────────────────────────────────────────────┘
```

---

## 7. AUTHENTICATION FLOW DIAGRAM

```
┌────────────────────────────────┐
│    APPLICATION START           │
└────────────────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Check Local Storage  │
    │ for Existing Session │
    └──────────────────────┘
              │
         ┌────┴────┐
         ▼         ▼
    [Found]    [Not Found]
         │         │
         ▼         ▼
    ┌────────┐  ┌──────────────────┐
    │Restore ││  │Show Landing Page │
    │Session │  │with Auth Modal    │
    └────────┘  └──────────────────┘
         │         │
         └────┬────┘
              ▼
    ┌──────────────────────┐
    │ SHOW AUTH MODAL      │
    │ • Login Tab          │
    │ • Register Tab       │
    └──────────────────────┘
              │
        ┌─────┴─────┐
        ▼           ▼
    ┌────────┐  ┌──────────┐
    │ LOGIN  │  │ REGISTER │
    └────────┘  └──────────┘
        │           │
        ▼           ▼
    ┌────────────────────────┐
    │ LOGIN FORM             │
    │ • Email Input          │
    │ • Password Input       │
    │ • Remember Me Checkbox │
    │ • Submit Button        │
    └────────────────────────┘
        │
        ▼
    ┌────────────────────────┐
    │ REGISTER FORM          │
    │ • First Name           │
    │ • Last Name            │
    │ • Email Input          │
    │ • Password             │
    │ • Confirm Password     │
    │ • Terms & Conditions   │
    │ • Submit Button        │
    └────────────────────────┘
        │           │
        ▼           ▼
    ┌──────────────────────────┐
    │ CLIENT-SIDE VALIDATION   │
    │ • Check Email Format     │
    │ • Check Password Length  │
    │ • Check Fields Not Empty │
    │ • Check Passwords Match  │
    └──────────────────────────┘
         │           │
     ┌───┴───┐   ┌────┴────┐
     ▼       ▼   ▼         ▼
  [Pass] [Fail][Pass]   [Fail]
     │       │   │         │
     │       ▼   │         ▼
     │    Error  │      Error
     │    Alert  │      Alert
     │       │   │         │
     │       └───┴─────────┘
     │               │
     ▼               ▼
  ┌────────────────────────┐
  │ SEND TO BACKEND        │
  │ • Hash Password        │
  │ • Send HTTPS Request   │
  │ • Show Loading State   │
  └────────────────────────┘
              │
              ▼
  ┌────────────────────────┐
  │ BACKEND PROCESSING     │
  │ • Verify Credentials   │
  │ • Check Database       │
  │ • Validate Email       │
  │ • Verify Password      │
  │ • Check Account Status │
  └────────────────────────┘
              │
         ┌────┴─────┐
         ▼          ▼
    [Success]   [Failed]
         │          │
         ▼          ▼
    ┌────────┐  ┌──────────────┐
    │Generate││  │Return Error  │
    │JWT     │  │Message       │
    │Token   │  │• Invalid Cred│
    └────────┘  │• User Not Fnd│
         │      │• Account Ban │
         │      └──────────────┘
         │          │
         ▼          ▼
    ┌────────────────────┐
    │ Return Token to    │
    │ Frontend           │
    │ & User Data        │
    └────────────────────┘
         │          │
         │          ▼
         │      ┌──────────────┐
         │      │Show Error    │
         │      │Message       │
         │      │& Clear Form  │
         │      └──────────────┘
         │          │
         │          ▼
         │      ┌──────────────┐
         │      │Stay in Modal │
         │      │Allow Retry   │
         │      └──────────────┘
         │
         ▼
    ┌──────────────────────┐
    │ SAVE TOKEN           │
    │ • Local Storage      │
    │ • Session Context    │
    │ • Set Auth Header    │
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ FETCH USER DATA      │
    │ • User Profile       │
    │ • Preferences        │
    │ • Health Records     │
    │ • Saved Providers    │
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ UPDATE APP STATE     │
    │ • Set User Object    │
    │ • Set Auth Flag      │
    │ • Load Dashboard     │
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ CLOSE AUTH MODAL     │
    │ • Redirect to Home   │
    │ • Show Welcome Msg   │
    │ • Navigate to View   │
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ USER LOGGED IN       │
    │ • Access Granted     │
    │ • Show Personalized  │
    │   Content            │
    └──────────────────────┘
```

---

## 8. APPLICATION STATE & NAVIGATION FLOW

```
┌─────────────────────────────────────────────┐
│    HEALTHAI APPLICATION ROUTING             │
└─────────────────────────────────────────────┘
              │
        ┌─────┴─────────────────────────┐
        ▼                               ▼
    ┌──────────┐                  ┌──────────────┐
    │ Logged   │                  │ Not Logged   │
    │ In User  │                  │ In User      │
    └──────────┘                  └──────────────┘
        │                               │
        │                  ┌────────────┘
        │                  │
        ▼                  ▼
┌────────────────┐  ┌──────────────────┐
│ HOME PAGE      │  │ LANDING PAGE     │
│ (Logged In)    │  │ (Public View)    │
│                │  │                  │
│ • Full Menu    │  │ • Hero Section   │
│ • User Options │  │ • Services Info  │
│ • Dashboard    │  │ • Testimonials   │
│   Link         │  │ • Auth Modal     │
└────────────────┘  └──────────────────┘
        │                  │
    ┌───┼──────┬──────┬────┼──────┬────────────┐
    ▼   ▼      ▼      ▼    ▼      ▼            ▼
┌──────┐┌────┐┌────┐┌───┐┌──────┐┌────────┐┌────────┐
│Health││Chat││Find││Adm││Dashb││ FAQs  ││More...││
│Check ││    ││Doc││ In││oard ││       ││       │
└──────┘└────┘└────┘└───┘└──────┘└────────┘└────────┘
    │    │     │     │      │       │         │
    │    │     │     │      │       │         │
    ▼    ▼     ▼     ▼      ▼       ▼         ▼
┌──────────────────────────────────────────────┐
│ HEALTH CHECK      CHAT          FIND DOCTOR │
│ • Enter Symptoms  • Ask Questions • Search   │
│ • Risk Factors    • Get Advice    • Filter   │
│ • Get Results     • Chat History  • Map View │
│ • Save Report     • Suggestions   • Book     │
│ • Find Doctor     • Resources     • Call     │
│                                             │
│ USER DASHBOARD    ADMIN PANEL    FAQ/CONTACT│
│ • Profile         • Users Mgmt   • Questions│
│ • Health History  • Analytics    • Answers  │
│ • Assessments     • Settings     • Support  │
│ • Saved Doctors   • Content Mgmt • Feedback │
│ • Settings        • System Logs  • Contact  │
└──────────────────────────────────────────────┘
```

---

**Document Generated**: March 21, 2026  
**Project**: HealthAI - Complete Page Flowcharts  
**Total Pages Diagrammed**: 8 (Landing, Health Check, Healthcare Finder, Chat, Dashboard, Admin, Auth, Navigation)
