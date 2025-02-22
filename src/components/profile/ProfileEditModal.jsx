import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Import icons
import "./css/ProfileEditModal.css"; // Import the CSS file

const ProfileEditModal = ({
  isOpen,
  toggleModal,
  profileImage,
  setProfileImage,
  handleProfileChange,
  name,
  setName,
  location,
  setLocation,
  defaultProfileImage,
}) => {
  if (!isOpen) return null;

  const handleRemoveProfileImage = () => {
    setProfileImage(defaultProfileImage); // Set default image when removing
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Profile</h2>

        {/* Profile Image Upload */}
        <div className="modal-profile-image">
          <input type="file" accept="image/*" onChange={handleProfileChange} id="profile-upload" hidden />
          <label htmlFor="profile-upload" className="profile-upload-button">
            <div className="profile-image-container">
              <img src={profileImage || defaultProfileImage} alt="Profile" className="profile-preview" />
              <div className="profile-actions">
                <label htmlFor="profile-upload" className="edit-profile-button">
                  <FiEdit2 size={16} />
                </label>
                <button className="remove-profile-button" onClick={handleRemoveProfileImage}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </label>
        </div>

        {/* Name Input */}
        <label className="modal-label">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="modal-input" />

        {/* Location Input */}
        <label className="modal-label">Location</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="modal-input" />

        {/* Buttons */}
        <div className="modal-buttons">
          <button className="save-button" onClick={toggleModal}>Save</button>
          <button className="cancel-button" onClick={toggleModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
