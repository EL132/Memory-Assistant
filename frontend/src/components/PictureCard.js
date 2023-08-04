import React from 'react';
import './PictureCard.css';

const PictureCard = ({ picture }) => {
    return (
        <div className="picture-card">
        <img src={picture.s3_url} alt={picture.name} />
        <div className="image-details">
            <h3>{picture.name}</h3>
            <ul>
                {picture.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default PictureCard;
