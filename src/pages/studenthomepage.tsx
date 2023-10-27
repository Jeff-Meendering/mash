import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="button-container">
        <button className="big-button">Meeting Hub</button>
        <button className="big-button">Profile</button>
        <button className="big-button">Chat</button>
      </div>
    </div>
  );
};

export default MainPage;