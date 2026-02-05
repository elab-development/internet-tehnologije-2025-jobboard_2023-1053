import React from 'react';

const  HomeAdmin=()=> {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>Admin kontrolna tabla</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Users size={24} style={{ color: '#1e40af' }} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Upravljanje korisnicima</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Dodaj, uredi ili obriši korisnike</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Building2 size={24} style={{ color: '#d97706' }} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Kompanije</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Upravljaj kompanijama</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Briefcase size={24} style={{ color: '#059669' }} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Kategorije</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Dodaj ili uredi kategorije</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#fce7f3', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <MessageSquare size={24} style={{ color: '#be123c' }} />
                            </div>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Moderacija komentara</h3>
                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pregled i moderacija komentara</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;