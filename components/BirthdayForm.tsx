'use client';

import { useState } from 'react';
// import styles from './BirthdayForm.module.css';

const BirthdayForm = () => {
  const [birthday, setBirthday] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Generate chat
    const chatPrompt = `This is my birthday: ${birthday}. Provide me a short, concise joke of my horoscope in quotation marks.`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: chatPrompt }] }),
    });

    const data = await res.json();
    setResponse(data.response.content);

    // Generate image
    const imagePrompt = `This is my birthday: ${birthday}, generate a picture of my zodiac sign.`;
    const imageRes = await fetch('/api/Image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: imagePrompt }),
    });

    const imageData = await imageRes.json();
    setImageUrl(imageData.imageUrl);

    setLoading(false);
    setIsWindowOpen(true);
  };

  const handleCloseModal = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="birthday">Enter your birthday:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {loading && <p className="loading">Loading...</p>}

      {isWindowOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <button className="closeButton" onClick={handleCloseModal}>×</button>
            <p>{response}</p>
            {imageUrl && <img src={imageUrl} alt="Generated birthday celebration" className="image" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayForm;
