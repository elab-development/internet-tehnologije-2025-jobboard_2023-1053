import React, { useState } from 'react';
import { Building2, Search, MapPin, Users } from 'lucide-react';

export const Companies = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - replace with actual API call
    const companies = [
        { id: 1, name: 'Tech Solutions d.o.o.', location: 'Beograd', employees: '50-100', description: 'Softverska kompanija' },
        { id: 2, name: 'Digital Agency', location: 'Novi Sad', employees: '10-50', description: 'Digitalni marketing' },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Kompanije</h1>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>Pregledajte kompanije i ostavite komentare</p>

                    <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="text"
                                placeholder="Pretražite kompanije..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: 'none', outline: 'none', color: '#1f2937', fontSize: '1rem' }}
                            />
                        </div>
                        <button style={{ backgroundColor: '#667eea', color: 'white', padding: '1rem 2rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                            Pretraži
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {companies.map((company) => (
                        <div
                            key={company.id}
                            style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                <div style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '0.5rem' }}>
                                    <Building2 size={32} style={{ color: '#1e40af' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>{company.name}</h3>
                                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{company.description}</p>
                                    <div style={{ display: 'flex', gap: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MapPin size={16} />
                                            <span>{company.location}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Users size={16} />
                                            <span>{company.employees} zaposlenih</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};