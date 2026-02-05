import React, { useState } from "react";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {applicationAPI} from "../../api/applicationApi.js";

const ApplyJobModal = ({ job, onClose }) => {
    const { user } = useStateContext();

    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [cvFile, setCvFile] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!job) return null;

    const handleSubmit = async () => {
        if ( !cvFile) {
            alert("Dodaj CV");
            return;
        }

        const formData = new FormData();
        formData.append("job_id", job.id);
        formData.append("linkedinUrl", linkedinUrl);
        formData.append("cv", cvFile);

        try {
            setLoading(true);
            await applicationAPI.create(formData);
            alert("Uspešno ste se prijavili");
            onClose();
        } catch (e) {
            console.error(e);
            alert("Greška pri prijavi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "0.5rem",
                width: "420px"
            }}>
                <h2 style={{ marginBottom: "1.5rem" }}>
                    Prijava za {job.title}
                </h2>

                {/* LINKEDIN */}
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontWeight: 600 }}>LinkedIn URL</label>
                    <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            marginTop: "0.25rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #d1d5db"
                        }}
                    />
                </div>

                {/* CV UPLOAD */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ fontWeight: 600 }}>CV (PDF / DOC)</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files[0])}
                        style={{
                            width: "100%",
                            marginTop: "0.25rem"
                        }}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: "#e5e7eb",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Otkaži
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            backgroundColor: "#667eea",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {loading ? "Slanje..." : "Pošalji prijavu"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;