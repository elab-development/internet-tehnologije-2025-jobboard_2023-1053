import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import {applicationAPI} from "../../api/applicationApi.js";


const HomeStudent= () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);



    const loadApplications = async () => {
        try {
            const data = await applicationAPI.getByUser();
            console.log(data.data)
            setApplications(data.data.applications || []);
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadApplications();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return '#f59e0b';
            case 'accepted': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <Clock size={16} />;
            case 'accepted': return <CheckCircle size={16} />;
            case 'rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Dobrodošli!</h1>
                    <p style={{ color: '#6b7280' }}>Ovde možete upravljati svojim prijavama</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <FileText size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{applications.length}</span>
                        </div>
                        <p style={{ color: '#6b7280' }}>Ukupno prijava</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Clock size={24} style={{ color: '#d97706' }} />
                            </div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {applications.filter(app => app.status.toLowerCase() === 'pending').length}
              </span>
                        </div>
                        <p style={{ color: '#6b7280' }}>Na čekanju</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <CheckCircle size={24} style={{ color: '#059669' }} />
                            </div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {applications.filter(app => app.status.toLowerCase() === 'accepted').length}
              </span>
                        </div>
                        <p style={{ color: '#6b7280' }}>Prihvaćeno</p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Moje prijave</h2>
                        <Link
                            to="/autenticate/jobs"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#667eea', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '600', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a67d8'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
                        >
                            <Briefcase size={20} />
                            Pronađi poslove
                        </Link>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Učitavanje...</div>
                    ) : applications.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <FileText size={64} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                            <h3 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '0.5rem' }}>Nema prijava</h3>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Još niste aplicirali ni na jedan oglas</p>
                            <Link
                                to="/autenticate/jobs"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#667eea', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '600' }}
                            >
                                Pregledaj oglase
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                            {app.job.title}
                                        </h4>
                                        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{app.job.company.name}</p>
                                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                            Aplicirano: {new Date(app.job.deadline).toLocaleDateString('sr-RS')}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: `${getStatusColor(app.status)}20`, color: getStatusColor(app.status), padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '600', fontSize: '0.875rem' }}>
                                        {getStatusIcon(app.status)}
                                        {app.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default HomeStudent;