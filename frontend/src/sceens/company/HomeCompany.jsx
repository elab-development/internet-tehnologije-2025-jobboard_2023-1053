import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Users, Eye } from 'lucide-react';
import {jobApi as jobAPI} from "../../api/jobApi.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {categoryAPI} from "../../api/categoryApi.js";
import {useNavigate} from "react-router-dom";



const HomeCompany = () => {
    const{user}=useStateContext();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddJob, setShowAddJob] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);
    const navigate = useNavigate();

    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        deadline: '',
        company_id:user.company.id,
        category_id:'',
        salary: '',

    });
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        loadJobs();
    }, []);
    useEffect(() => {
        loadCategories()
    },[]);

    const loadCategories = async () => {
        try {
            const data = await categoryAPI.getAll()
            console.log(data.data.categories);

            setCategories(data.data.categories||[]);

        } catch (error) {
            console.error('Error loading categories:', error);
        } finally {
            setLoading(false);
        }
    };
    const loadJobs = async () => {
        try {
            const data = await jobAPI.getByCompany(user.company.id);
            console.log(data.data.jobs);

            setJobs(data.data.jobs || []);
        } catch (error) {
            console.error('Error loading jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddJob = async (e) => {
        e.preventDefault();

        try {
            if (editingJobId) {
                await jobAPI.update(editingJobId, newJob);
            } else {
                await jobAPI.create(newJob);
            }

            setShowAddJob(false);
            setEditingJobId(null);

            setNewJob({
                title: '',
                description: '',
                deadline: '',
                company_id: user.company.id,
                category_id: '',
                salary: '',
            });

            loadJobs();
        } catch (error) {
            console.error('Error saving job:', error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj oglas?')) return;

        try {
            await jobAPI.delete(jobId);
            setJobs(prev => prev.filter(job => job.id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    useEffect(() => {
        Promise.all([loadJobs(), loadCategories()]);
    }, []);
    const handleEditJob = (job) => {
        if (!categories.length) return;

        setNewJob({
            title: job.title,
            description: job.description,
            deadline: job.deadline,
            company_id: job.company_id,
            category_id: String(job.category.id),
            salary: job.salary || '',
        });

        setEditingJobId(job.id);
        setShowAddJob(true);
    };



    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Kontrolna tabla kompanije</h1>
                        <p style={{ color: '#6b7280' }}>Upravljajte oglasima i prijavama</p>
                    </div>
                    <button
                        onClick={() => setShowAddJob(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#667eea', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a67d8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
                    >
                        <Plus size={20} />
                        Dodaj oglas
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Briefcase size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>{jobs.length}</span>
                        </div>
                        <p style={{ color: '#6b7280' }}>Aktivni oglasi</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Users size={24} style={{ color: '#059669' }} />
                            </div>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                {jobs.reduce((sum, job) => sum + (job.applications || 0), 0)}
              </span>
                        </div>
                        <p style={{ color: '#6b7280' }}>Ukupno prijava</p>
                    </div>
                </div>

                {showAddJob && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                {editingJobId ? 'Izmeni oglas' : 'Dodaj novi oglas'}
                            </h2>
                            <form onSubmit={handleAddJob}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Naziv pozicije</label>
                                    <input
                                        type="text"
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Opis posla</label>
                                    <textarea
                                        value={newJob.description}
                                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                        required
                                        rows={4}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', resize: 'vertical' }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                                        Datum isteka oglasa
                                    </label>
                                    <input
                                        type="date"
                                        value={newJob.deadline}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                    />
                                </div>





                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Kategorija</label>
                                        <select
                                            value={newJob.category_id}
                                            onChange={(e) => setNewJob({ ...newJob, category_id: e.target.value })}
                                            required
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                                        >
                                            <option value="">Izaberite kategoriju</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Plata (opcionalno)</label>
                                        <input
                                            type="text"
                                            value={newJob.salary}
                                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                            placeholder="npr. 50.000 - 70.000 RSD"
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        type="submit"
                                        style={{ flex: 1, backgroundColor: '#667eea', color: 'white', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                    >
                                        Objavi oglas
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddJob(false)}
                                        style={{ flex: 1, backgroundColor: '#e5e7eb', color: '#374151', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                    >
                                        Otkaži
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Vaši oglasi</h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Učitavanje...</div>
                    ) : jobs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <Briefcase size={64} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
                            <h3 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '0.5rem' }}>Nema oglasa</h3>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Kliknite "Dodaj oglas" da objavite svoj prvi oglas</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    style={{
                                        padding: '1.5rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.375rem',
                                        transition: 'box-shadow 0.2s'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'start',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        {/* LEVO */}
                                        <div>
                                            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                                {job.title}
                                            </h4>
                                            <div style={{ display: 'flex', gap: '1rem', color: '#6b7280' }}>
                                                <span>{job.company.name}</span>
                                                <span>•</span>
                                                <span>{job.salary}</span>
                                            </div>
                                        </div>

                                        {/* DESNO */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    backgroundColor: '#dbeafe',
                                                    color: '#1e40af',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '0.375rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                <Users size={16} />
                                                {job.applications || 0} prijava
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                <button
                                                    onClick={() => handleEditJob(job)}
                                                    style={{
                                                        color: '#f59e0b',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    ✏️ Izmeni
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteJob(job.id)}
                                                    style={{
                                                        color: '#dc2626',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    🗑️ Obriši
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(`/autenticate/company/jobs/${job.id}/applications`)
                                        }
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#667eea',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <Eye size={16} />
                                        Pogledaj prijave
                                    </button>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default HomeCompany;