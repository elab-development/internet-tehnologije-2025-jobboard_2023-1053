import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Building2, TrendingUp } from 'lucide-react';

export const Home = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '6rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        Pronađite savršenu karijeru
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                        JobBoard platforma koja povezuje kandidate i poslodavce
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link
                            to="/register"
                            style={{ display: 'inline-block', backgroundColor: 'white', color: '#667eea', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', transition: 'transform 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Počnite sada
                        </Link>
                        <Link
                            to="/jobs"
                            style={{ display: 'inline-block', backgroundColor: 'transparent', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', border: '2px solid white', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            Pregledaj poslove
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
                        Zašto JobBoard?
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#dbeafe', width: 'fit-content', padding: '1rem', borderRadius: '50%', margin: '0 auto 1.5rem' }}>
                                <Briefcase size={40} style={{ color: '#1e40af' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                                Hiljade poslova
                            </h3>
                            <p style={{ color: '#6b7280' }}>
                                Pristup aktuelnim oglasima za posao iz različitih industrija
                            </p>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#fef3c7', width: 'fit-content', padding: '1rem', borderRadius: '50%', margin: '0 auto 1.5rem' }}>
                                <Building2 size={40} style={{ color: '#d97706' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                                Provere kompanije
                            </h3>
                            <p style={{ color: '#6b7280' }}>
                                Komentari i ocene realnih zaposlenih i alumni članova
                            </p>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#d1fae5', width: 'fit-content', padding: '1rem', borderRadius: '50%', margin: '0 auto 1.5rem' }}>
                                <Users size={40} style={{ color: '#059669' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                                Efikasna komunikacija
                            </h3>
                            <p style={{ color: '#6b7280' }}>
                                Direktan kontakt između kandidata i poslodavaca
                            </p>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#fce7f3', width: 'fit-content', padding: '1rem', borderRadius: '50%', margin: '0 auto 1.5rem' }}>
                                <TrendingUp size={40} style={{ color: '#be123c' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                                Razvoj karijere
                            </h3>
                            <p style={{ color: '#6b7280' }}>
                                Alati i resursi za napredovanje u karijeri
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '4rem 2rem', backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Spremni da započnete?
                    </h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Pridružite se hiljadama korisnika koji su već pronašli svoje mesto

                    </p>
                    <Link
                        to="/register"
                        style={{ display: 'inline-block', backgroundColor: 'white', color: '#1e3a8a', padding: '1rem 3rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Registrujte se besplatno
                    </Link>
                </div>
            </div>
        </div>
    );
};