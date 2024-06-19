'use client';

import { useState } from 'react';

const BirthdayForm = () => {
  const [birthday, setBirthday] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Fake response to simulate API call
    const fakeResponse = {
      response: { content: `Your birthday is on ${birthday}. This is a fake response from ChatGPT.` }
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setResponse(fakeResponse.response.content);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

      {response && (
        <div style={{ marginTop: '1rem' }}>
          <h3>ChatGPT's response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default BirthdayForm;
