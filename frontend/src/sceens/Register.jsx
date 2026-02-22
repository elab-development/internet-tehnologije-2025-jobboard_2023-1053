import React, { useState } from 'react';
import { Briefcase, Mail, Lock, User as UserIcon, AlertCircle, Phone, MapPin, FileText, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from "../axiosClient.js";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');

    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Lozinke se ne podudaraju");
            return;
        }

        setLoading(true);

        const payload = {
            name,
            email,
            password,
            role
        };

        if (role === 'company') {
            payload.company_name = companyName;
            payload.phone = phone;
            payload.address = address;
            payload.description = description;
        }

        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
                navigate("/autenticate");
            })
            .catch((err) => {
                const backendError = err.response?.data?.message || "Greška prilikom registracije";
                setError(backendError);
            })
            .finally(() => setLoading(false));
    };

    // Pomoćni stil za sve inpute (da ne ponavljamo kod)
    const inputStyle = {
        width: '100%',
        boxSizing: "border-box",
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem 1rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', marginBottom: '1rem' }}>
                        <Briefcase size={40} />
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>JobBoard</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Kreirajte nalog</h2>
                    <p style={{ color: '#6b7280' }}>Pridružite se JobBoard platformi</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* --- OSNOVNA POLJA --- */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>Ime i prezime</label>
                        <div style={{ position: 'relative' }}>
                            <UserIcon size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} placeholder="Vaše ime" />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>Email adresa</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="vas@email.com" />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>Tip korisnika</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            style={{ ...inputStyle, paddingLeft: '0.75rem', backgroundColor: 'white' }}
                        >
                            <option value="student">Student</option>
                            <option value="company">Kompanija</option>
                            <option value="alumni">Alumni</option>
                        </select>
                    </div>

                    {/* --- USLOVNA POLJA ZA KOMPANIJU --- */}
                    {role === 'company' && (
                        <div style={{ borderLeft: '4px solid #667eea', paddingLeft: '1rem', marginBottom: '1.5rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#4b5563' }}>Podaci o kompaniji</h3>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Building2 size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder="Naziv kompanije" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Kontakt telefon" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Adresa sedišta" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '0rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <FileText size={20} style={{ position: 'absolute', left: '0.75rem', top: '1rem', color: '#9ca3af' }} />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        placeholder="Kratak opis kompanije"
                                        style={{ ...inputStyle, paddingLeft: '2.5rem', height: '100px', resize: 'vertical' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- LOZINKE --- */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>Lozinka</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>Potvrdite lozinku</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', backgroundColor: loading ? '#9ca3af' : '#667eea', color: 'white', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
                    >
                        {loading ? 'Registracija...' : 'Registruj se'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
                    Već imate nalog? <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>Prijavite se</Link>
                </div>
            </div>
        </div>
    );
};