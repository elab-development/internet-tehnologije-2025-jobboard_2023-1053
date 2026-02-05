import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Lozinke se ne podudaraju');
            return;
        }

        if (password.length < 8) {
            setError('Lozinka mora imati najmanje 8 karaktera');
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Greška prilikom registracije');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem 0' }}>
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
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Ime i prezime
                        </label>
                        <div style={{ position: 'relative' }}>
                            <UserIcon size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                placeholder="Vaše ime"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Email adresa
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                placeholder="vas@email.com"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Tip korisnika
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none', backgroundColor: 'white' }}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        >
                            <option value="student">Student</option>
                            <option value="company">Kompanija</option>
                            <option value="alumni">Alumni</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Lozinka
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#374151', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Potvrdite lozinku
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', backgroundColor: loading ? '#9ca3af' : '#667eea', color: 'white', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#5a67d8')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#667eea')}
                    >
                        {loading ? 'Registracija...' : 'Registruj se'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
                    Već imate nalog?{' '}
                    <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                        Prijavite se
                    </Link>
                </div>
            </div>
        </div>
    );
};
