import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobApi } from "../../api/jobApi";
import {applicationAPI} from "../../api/applicationApi.js";

const JobApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const res = await applicationAPI.getByJob(jobId);
            console.log(res.data.applications);
            setApplications(res.data.applications || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    const updateStatus = async (applicationId, status) => {
        try {
            await applicationAPI.update(applicationId, {
                status: status
            });
            loadApplications();
        } catch (e) {
            console.error(e);
        }
    };

    const deleteApplication = async (applicationId) => {
        if (!window.confirm("Da li ste sigurni da želite da obrišete prijavu?")) return;

        try {
            await applicationAPI.delete(applicationId);
            setApplications(prev => prev.filter(app => app.id !== applicationId));
        } catch (e) {
            console.error(e);
        }
    };


    if (loading) return <div>Učitavanje...</div>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Prijave za posao</h1>

            {applications.length === 0 ? (
                <p>Nema prijava za ovaj oglas.</p>
            ) : (

                applications.map(app => (
                    <div
                        key={app.id}
                        style={{
                            border: "1px solid #e5e7eb",
                            padding: "1.5rem",
                            marginBottom: "1rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#fff"
                        }}
                    >
                        {/* GORNJI DEO */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                            <div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                                    {app.user.name}
                                </h3>
                                <p style={{ color: "#6b7280" }}>{app.user.email}</p>
                            </div>

                            {/* STATUS */}
                            {app.status === "accepted" && (
                                <span style={{ color: "#16a34a", fontWeight: 700 }}>
                    ✅ Prihvaćen
                </span>
                            )}

                            {app.status === "rejected" && (
                                <span style={{ color: "#dc2626", fontWeight: 700 }}>
                    ❌ Odbijen
                </span>
                            )}

                            {app.status === "pending" && (
                                <span style={{ color: "#f59e0b", fontWeight: 700 }}>
                    ⏳ Na čekanju
                </span>
                            )}
                        </div>

                        {/* DUGMAD SAMO ZA PENDING */}
                        {app.status === "pending" && (
                            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                                <button
                                    onClick={() => updateStatus(app.id, "accepted")}
                                    style={{
                                        backgroundColor: "#16a34a",
                                        color: "white",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "0.375rem",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    Prihvati
                                </button>

                                <button
                                    onClick={() => updateStatus(app.id, "rejected")}
                                    style={{
                                        backgroundColor: "#dc2626",
                                        color: "white",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "0.375rem",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    Odbij
                                </button>
                            </div>
                        )}

                        {/* LINKOVI */}
                        <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem" }}>
                            <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#2563eb", fontWeight: 600 }}
                            >
                                📄 CV
                            </a>

                            {app.linkedin_url && (
                                <a
                                    href={app.linkedin_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "#0a66c2", fontWeight: 600 }}
                                >
                                    🔗 LinkedIn
                                </a>
                            )}
                        </div>

                        {/* BRISANJE */}
                        <button
                            onClick={() => deleteApplication(app.id)}
                            style={{
                                marginTop: "1rem",
                                background: "none",
                                border: "none",
                                color: "#dc2626",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            🗑️ Obriši prijavu
                        </button>
                    </div>
                ))


            )}
        </div>
    );
};

export default JobApplications;