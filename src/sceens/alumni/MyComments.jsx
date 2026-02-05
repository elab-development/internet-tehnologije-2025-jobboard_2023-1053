import React, { useEffect, useState } from "react";
import { Trash2, Pencil, Star } from "lucide-react";
import { commentAPI } from "../../api/commentApi";
import EditCommentModal from "./EditCommentModal.jsx";

const MyComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editComment, setEditComment] = useState(null);

    const loadComments = async () => {
        try {
            const res = await commentAPI.getByUser();
            console.log(res.data);
            setComments(res.data.comments || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Da li ste sigurni?")) return;

        await commentAPI.delete(id);
        setComments(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "2rem" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
                    Moji komentari
                </h1>

                {loading ? (
                    <p>Učitavanje...</p>
                ) : comments.length === 0 ? (
                    <p>Nemate komentara.</p>
                ) : (
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            style={{
                                backgroundColor: "white",
                                padding: "1.5rem",
                                borderRadius: "0.5rem",
                                marginBottom: "1rem",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}
                        >
                            <h3 style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                                {comment.company.name}
                            </h3>

                            <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.5rem" }}>
                                {[1,2,3,4,5].map(star => (
                                    <Star
                                        key={star}
                                        size={16}
                                        style={{
                                            color: comment.rating >= star ? "#facc15" : "#d1d5db"
                                        }}
                                    />
                                ))}
                            </div>

                            <p style={{ color: "#374151", marginBottom: "1rem" }}>
                                {comment.comment}
                            </p>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button
                                    style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
                                    onClick={() => setEditComment(comment)}
                                >
                                    <Pencil size={16} /> Izmeni
                                </button>

                                <button
                                    style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
                                    onClick={() => handleDelete(comment.id)}
                                >
                                    <Trash2 size={16} /> Obriši
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {editComment && (
                    <EditCommentModal
                        comment={editComment}
                        onClose={() => setEditComment(null)}
                        onUpdated={(updated) =>
                            setComments(prev =>
                                prev.map(c => c.id === updated.id ? updated : c)
                            )
                        }
                    />
                )}

            </div>
        </div>
    );
};

export default MyComments;