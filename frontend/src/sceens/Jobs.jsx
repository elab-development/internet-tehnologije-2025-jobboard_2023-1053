import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Search, MapPin, Briefcase, Clock, DollarSign, Building} from 'lucide-react';
import {jobApi as jobAPI} from "../api/jobApi.js";
import {categoryAPI} from "../api/categoryApi.js";
import ApplyJobModal from "./student/ApplyJobModal.jsx";


export const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [categories, setCategories] = useState([]);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);


    useEffect(() => {
        loadJobs();
    }, []);
    useEffect(() => {
        loadJobs();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const res = await categoryAPI.getAll();
        setCategories(res.data.categories || []);
    };

    const loadJobs = async () => {
        try {
            setLoading(true);
            const data = await jobAPI.getAll();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Error loading jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);

            const params = {
                name: searchTerm || undefined,
                category_id: categoryId || undefined,
                salary_min: salaryMin || undefined,
                salary_max: salaryMax || undefined,
            };

            const res = await jobAPI.search(params);
            setJobs(res.data.jobs || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sr-RS');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Pronađite svoj posao</h1>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>Pregledajte najnovije ponude za posao</p>

                    <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input
                                type="text"
                                placeholder="Pretražite poslove..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                style={{ width: '90%', padding: '1rem 1rem 1rem 3rem', border: 'none', outline: 'none', color: '#1f2937', fontSize: '1rem' }}
                            />

                        </div>
                        <button
                            onClick={handleSearch}
                            style={{ backgroundColor: '#667eea', color: 'white', padding: '1rem 2rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a67d8'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
                        >
                            Pretraži
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                        {/* KATEGORIJA */}
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            style={{ padding: "0.75rem", borderRadius: "0.375rem" }}
                        >
                            <option value="">Sve kategorije</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* MIN PLATA */}
                        <input
                            type="number"
                            placeholder="Min plata"
                            value={salaryMin}
                            onChange={(e) => setSalaryMin(e.target.value)}
                            style={{ padding: "0.75rem", borderRadius: "0.375rem" }}
                        />

                        {/* MAX PLATA */}
                        <input
                            type="number"
                            placeholder="Max plata"
                            value={salaryMax}
                            onChange={(e) => setSalaryMax(e.target.value)}
                            style={{ padding: "0.75rem", borderRadius: "0.375rem" }}
                        />

                        <button
                            onClick={handleSearch}
                            style={{
                                backgroundColor: "#667eea",
                                color: "white",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Filtriraj
                        </button>
                    </div>

                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                        <div style={{ fontSize: '1.125rem' }}>Učitavanje poslova...</div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '0.5rem' }}>
                        <Briefcase size={64} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                        <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Nema dostupnih poslova</h3>
                        <p style={{ color: '#6b7280' }}>Trenutno nema objavljenih oglasa. Proverite ponovo kasnije.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {jobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/jobs/${job.id}`}
                                style={{ display: 'block', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textDecoration: 'none', color: 'inherit', transition: 'box-shadow 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>{job.title}</h3>
                                        <p style={{ color: '#667eea', fontWeight: '600', marginBottom: '0.5rem' }}>{job.company_name}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '600' }}>
                                        <Clock size={16} />
                                        {formatDate(job.deadline)}
                                    </div>
                                </div>

                                <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>{job.description}</p>

                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                        <MapPin size={16} />
                                        <span>{job.company.address}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                        <Building size={16} />
                                        <span>{job.company.name}</span>
                                    </div>
                                    {job.salary && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                                            <DollarSign size={16} />
                                            <span>{job.salary}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedJob(job);
                                        setShowApplyModal(true);
                                    }}
                                    style={{
                                        marginTop: "1rem",
                                        backgroundColor: "#16a34a",
                                        color: "white",
                                        padding: "0.5rem 1.25rem",
                                        borderRadius: "0.375rem",
                                        border: "none",
                                        cursor: "pointer",
                                        fontWeight: 600
                                    }}
                                >
                                    Prijavi se
                                </button>

                            </Link>

                        ))}
                    </div>
                )}
            </div>
            {showApplyModal && (
                <ApplyJobModal
                    job={selectedJob}
                    onClose={() => {
                        setShowApplyModal(false);
                        setSelectedJob(null);
                    }}
                />
            )}

        </div>

);
};