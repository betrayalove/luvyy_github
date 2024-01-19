import React from 'react';

interface IProps {
  setShowBeats: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKits: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLicenses: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserButtons: React.FC<IProps> = ({
  setShowBeats,
  setShowKits,
  setShowLicenses,
  setShowInfo,
}) => {
  const handleButtonClick = (setFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Close other sections
    setShowBeats(false);
    setShowKits(false);
    setShowLicenses(false);
    setShowInfo(false);

    // Open the selected section
    setFunction(true);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(setShowBeats)}>Биты</button>
      <button onClick={() => handleButtonClick(setShowKits)}>Киты</button>
      <button onClick={() => handleButtonClick(setShowLicenses)}>Лицензии</button>
      <button onClick={() => handleButtonClick(setShowInfo)}>Информация</button>
    </div>
  );
};

export default UserButtons;
