import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import { recruiterService, publicService } from '../../services/api';
import {
  User,
  MapPin,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';
import { toast } from 'sonner';

const RecruiterRegisterVoter = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [wardsList, setWardsList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    occupation: '',
    phoneNumber: '',
    localGovernment: 'Badagry',
    ward: '',
    pollingUnit: '',
    address: '',
    vin: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await publicService.getWards();
        setWardsList(res.wards || []);
        if (res.wards?.length > 0 && !formData.ward) {
          setFormData((prev) => ({ ...prev, ward: res.wards[0] }));
        }
      } catch (err) {
        console.warn('Wards load error:', err.message);
      }
    };
    fetchWards();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const errs = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
      if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 120) {
        errs.age = 'Voter must be at least 18 years old.';
      }
      if (!formData.occupation.trim()) errs.occupation = 'Occupation is required.';
      if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required.';
    } else if (currentStep === 2) {
      if (!formData.ward) errs.ward = 'Please select a Badagry ward.';
      if (!formData.pollingUnit.trim()) errs.pollingUnit = 'Polling unit is required.';
      if (!formData.address.trim()) errs.address = 'Residential address is required.';
    } else if (currentStep === 3) {
      if (!formData.vin.trim()) errs.vin = 'Voter Identification Number (VIN) is required.';
      else if (formData.vin.trim().length < 8) errs.vin = 'VIN must be a valid code.';
    } else if (currentStep === 4) {
      if (!formData.consent) errs.consent = 'You must confirm voter consent before submitting.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo(0, 0);
    } else {
      toast.error('Please fix errors before proceeding.');
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    try {
      setSubmitting(true);
      const res = await recruiterService.registerVoter(formData);
      setSuccessData(res.registration);
      toast.success('Voter registered successfully!');
    } catch (err) {
      if (err.message.includes('already exists') || err.message.includes('VIN')) {
        toast.error('A voter record with this VIN already exists.');
        setErrors({ vin: 'A voter record with this VIN already exists.' });
        setStep(3);
      } else {
        toast.error(err.message || 'Registration failed. Check inputs.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSuccessData(null);
    setStep(1);
    setFormData({
      fullName: '',
      age: '',
      occupation: '',
      phoneNumber: '',
      localGovernment: 'Badagry',
      ward: wardsList[0] || '',
      pollingUnit: '',
      address: '',
      vin: '',
      consent: false,
    });
    setErrors({});
  };

  // SUCCESS SCREEN
  if (successData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
        <Header title="Voter Registered Successfully" onMobileMenuToggle={onMobileMenuToggle} />

        <main style={{ padding: '2rem 1.25rem', flex: 1, maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <div className="card" style={{ padding: '2.5rem 1.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e6f3ed', color: '#007043', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#007043' }}>
              Registration Verified & Saved
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
              Voter information has been securely stored under your recruiter code.
            </p>

            <div
              style={{
                backgroundColor: '#F5F8F6',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.9rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Reference Code:</span>
                <strong style={{ color: '#007043', fontFamily: 'monospace', fontSize: '1.05rem' }}>
                  {successData.referenceCode}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Voter Name:</span>
                <strong>{successData.fullName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Ward:</span>
                <strong style={{ color: '#F15A24' }}>{successData.ward}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Polling Unit:</span>
                <strong>{successData.pollingUnit}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Recruiter Code:</span>
                <strong>{successData.recruiterCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Registration Date:</span>
                <strong>{new Date(successData.date).toLocaleDateString()}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={handleResetForm} className="btn btn-accent btn-lg">
                <PlusCircle size={18} /> Register Another Voter
              </button>
              <Link to="/recruiter/my-voters" className="btn btn-outline btn-lg">
                View My Registered Voters
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Field Voter Registration"
        subtitle="Step-by-step voter digitization wizard"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem 1.25rem', flex: 1, maxWidth: '650px', margin: '0 auto', width: '100%' }}>
        {/* Progress Step Header */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#007043', marginBottom: '0.5rem' }}>
            <span>STEP {step} OF 4</span>
            <span>
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Location & Ward'}
              {step === 3 && 'Voter VIN Record'}
              {step === 4 && 'Confirmation & Consent'}
            </span>
          </div>

          <div style={{ height: '8px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(step / 4) * 100}%`,
                backgroundColor: '#007043',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <div className="card" style={{ padding: '2rem 1.5rem', borderRadius: '16px' }}>
          {/* STEP 1: BASIC INFORMATION */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <User size={20} color="#007043" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111111' }}>Step 1: Basic Information</h3>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name (As on Voters Card) *</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="e.g. Babatunde Mawuyon Senu"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Age (Years) *</label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="e.g. 34"
                    value={formData.age}
                    onChange={handleChange}
                    min={18}
                    max={120}
                    required
                  />
                  {errors.age && <span className="form-error">{errors.age}</span>}
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Occupation *</label>
                  <input
                    type="text"
                    name="occupation"
                    className="form-input"
                    placeholder="e.g. Trader, Fisherman, Teacher"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                  />
                  {errors.occupation && <span className="form-error">{errors.occupation}</span>}
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-input"
                  placeholder="e.g. +2348031234567"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION INFORMATION */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <MapPin size={20} color="#F15A24" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111111' }}>Step 2: Location Information</h3>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Local Government Area</label>
                <input
                  type="text"
                  className="form-input"
                  value="Badagry Local Government"
                  disabled
                  style={{ backgroundColor: '#F1F5F9', fontWeight: 700, color: '#007043' }}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Official Ward *</label>
                <select
                  name="ward"
                  className="form-select"
                  value={formData.ward}
                  onChange={handleChange}
                  required
                >
                  {wardsList.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                {errors.ward && <span className="form-error">{errors.ward}</span>}
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Polling Unit *</label>
                <input
                  type="text"
                  name="pollingUnit"
                  className="form-input"
                  placeholder="e.g. PU 001 - Jegba Primary School"
                  value={formData.pollingUnit}
                  onChange={handleChange}
                  required
                />
                {errors.pollingUnit && <span className="form-error">{errors.pollingUnit}</span>}
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Residential Address *</label>
                <textarea
                  name="address"
                  className="form-input"
                  rows={2}
                  placeholder="e.g. 15 Marina Road, Jegba, Badagry"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>
            </div>
          )}

          {/* STEP 3: VOTER VIN INFORMATION */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <FileCheck size={20} color="#00A9E0" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111111' }}>Step 3: Voter Identification (VIN)</h3>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Voter Identification Number (VIN) *</label>
                <input
                  type="text"
                  name="vin"
                  className="form-input"
                  placeholder="e.g. 90F9B123456789"
                  value={formData.vin}
                  onChange={handleChange}
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}
                  required
                />
                {errors.vin && (
                  <div style={{ backgroundColor: '#FFF1F2', color: '#E11D48', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 600 }}>
                    <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                    {errors.vin}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#e6f7fc', padding: '1rem', borderRadius: '10px', border: '1px solid #00A9E0', fontSize: '0.85rem', color: '#00779e' }}>
                <strong>Sensitive Information Guard:</strong> VIN numbers are stored with strict index uniqueness to prevent accidental duplicate registration.
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & CONSENT */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                <ShieldCheck size={20} color="#007043" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111111' }}>Step 4: Confirmation & Consent</h3>
              </div>

              <div style={{ backgroundColor: '#F5F8F6', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div><strong>Voter:</strong> {formData.fullName} ({formData.age} yrs, {formData.occupation})</div>
                <div><strong>Ward:</strong> {formData.ward}</div>
                <div><strong>Polling Unit:</strong> {formData.pollingUnit}</div>
                <div><strong>Phone:</strong> {formData.phoneNumber}</div>
              </div>

              <div
                style={{
                  backgroundColor: '#fff0eb',
                  border: '1px solid #F15A24',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                }}
              >
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', marginTop: '0.2rem', accentColor: '#007043', cursor: 'pointer' }}
                />
                <label htmlFor="consentCheckbox" style={{ fontSize: '0.9rem', color: '#111111', fontWeight: 600, cursor: 'pointer', lineHeight: 1.5 }}>
                  "By submitting this information, I confirm that I consent to the responsible collection and digital storage of my information for the purposes of this initiative."
                </label>
              </div>
              {errors.consent && <span className="form-error">{errors.consent}</span>}
            </div>
          )}

          {/* Form Wizard Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="btn btn-outline" disabled={submitting}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Next Step <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="btn btn-accent btn-lg" disabled={submitting || !formData.consent}>
                {submitting ? 'Submitting Registration...' : 'Submit & Save Record'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterRegisterVoter;
