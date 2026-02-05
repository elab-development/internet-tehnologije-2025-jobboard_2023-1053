import React, {useEffect, useState} from "react";
import {commentAPI} from "../api/commentApi.js";
import {Star} from "lucide-react";

const CommentModal = ({ company, onClose }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);


    const handleSubmit = async () => {
        if (!commentText.trim()) return alert("Unesi komentar");

        try {
            setLoading(true);

            const payload = {
                company_id: company.id,
                comment: commentText,
                rating: rating
            };

            const res = await commentAPI.create(payload);

            setComments(prev => [res.data.comment, ...prev]);

            setCommentText("");
            setRating(5);
        } catch (error) {
            console.log(error);
            alert("Greška pri slanju komentara");
        } finally {
            setLoading(false);
        }
    };

    const loadComments=async () => {
        try{
            const data = await commentAPI.getByCompany(company.id);
            console.log(data);
            setComments(data.data.comments);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        loadComments()
    },[company.id]);



    return (
        <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                background: "white",
                padding: "2rem",
                borderRadius: "0.5rem",
                width: "500px"
            }}>
                <h2>{company.name}</h2>

                {comments.map(c => (
                    <div key={c.id} style={{ marginBottom: "1rem" }}>
                        <b>{c.user.name}</b> ⭐ {c.rating}
                        <p>{c.comment}</p>
                    </div>
                ))}

                <hr />

                <h4>Dodaj komentar</h4>

                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    style={{ width: "100%", marginBottom: "1rem" }}
                />

                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={24}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                                cursor: "pointer",
                                color:
                                    (hoverRating || rating) >= star
                                        ? "#facc15"   // žuta
                                        : "#d1d5db"   // siva
                            }}
                        />
                    ))}
                </div>


                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                    <button onClick={handleSubmit}>Pošalji</button>
                    <button onClick={onClose}>Zatvori</button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;