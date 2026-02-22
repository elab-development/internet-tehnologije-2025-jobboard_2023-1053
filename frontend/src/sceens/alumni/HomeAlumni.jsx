import React from 'react';
import {Link} from "react-router-dom";
import {Briefcase, Building2, MessageSquare} from "lucide-react";

const HomeAlumni = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Alumni kontrolna tabla</h1>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Pratite poslove i dajte komentare o kompanijama</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>


                    <Link
                        to="/autenticate/companies"
                        style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                    >
                        <div style={{ backgroundColor: '#fef3c7', width: 'fit-content', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            <Building2 size={32} style={{ color: '#d97706' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Kompanije</h3>
                        <p style={{ color: '#6b7280' }}>Pretraži i komentiši o kompanijama</p>
                    </Link>

                    <Link
                        to="/autenticate/alumni/my-comments"
                        style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                    >
                        <div style={{ backgroundColor: '#d1fae5', width: 'fit-content', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            <MessageSquare size={32} style={{ color: '#059669' }} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                            Moji komentari
                        </h3>
                        <p style={{ color: '#6b7280' }}>Pregled vaših komentara</p>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default HomeAlumni;