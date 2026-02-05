import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, User, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {


    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '1rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <Briefcase size={32} />
                    <span>JobBoard</span>
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/jobs" style={{ textDecoration: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                Poslovi
                            </Link>
                            <Link to="/companies" style={{ textDecoration: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                Kompanije
                            </Link>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={20} />
                                    <span>{user?.name}</span>
                                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    {user?.role}
                  </span>
                                </div>
                                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                                    <LogOut size={20} />
                                    Odjava
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: '1px solid white' }}>
                                Prijava
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none', color: '#1e3a8a', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}>
                                Registracija
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};