import React, { useState } from "react";
import { Star } from "lucide-react";
import { commentAPI } from "../../api/commentApi";

const EditCommentModal = ({ comment, onClose, onUpdated }) => {
    const [text, setText] = useState(comment.comment);
    const [rating, setRating] = useState(comment.rating);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const res = await commentAPI.update(comment.id, {
                comment: text,
                rating: rating
            });
            onUpdated(res.data.comment);
            onClose();
        } catch (e) {
            console.error(e);
            alert("Greška pri izmeni komentara");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50
        }}>
            <div style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                width: "400px"
            }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                    Izmeni komentar
                </h3>

                {/* RATING */}
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[1,2,3,4,5].map(star => (
                        <Star
                            key={star}
                            size={22}
                            onClick={() => setRating(star)}
                            style={{
                                cursor: "pointer",
                                color: rating >= star ? "#facc15" : "#d1d5db"
                            }}
                        />
                    ))}
                </div>

                {/* KOMENTAR */}
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: "1px solid #d1d5db",
                        marginBottom: "1rem"
                    }}
                />

                {/* DUGMAD */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "0.5rem 1rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.375rem",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        Otkaži
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Sačuvaj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCommentModal;