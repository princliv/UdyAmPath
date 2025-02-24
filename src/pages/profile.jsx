import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import ProfileEditModal from "../components/profile/ProfileEditModal"; // Import modal component
import DetailForm from "../components/profile/detailform"; // Import form component
import defaultProfileImage from "../assets/profile/profilePhoto.png"; // Default profile photo path

const ProfilePage = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("Ankit Kumar");
  const [location, setLocation] = useState("Roorkee, India");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Top Section */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Rectangle - Personal Info Card */}
        <div style={{ 
          background: "white", 
          padding: "20px", 
          borderRadius: "10px", 
          width: "250px", 
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          position: "relative"
        }}>
          {/* Title with Edit Icon */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: "bold", margin: 0 }}>Personal Info</h3>
            <button onClick={toggleModal} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <FiEdit2 style={{ color: "#004aad" }} />
            </button>
          </div>

          {/* Profile Image */}
          <div 
            style={{ 
              width: "80px", 
              height: "80px", 
              backgroundImage: `url(${profileImage || defaultProfileImage})`, 
              borderRadius: "50%", 
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "15px auto" 
            }}
          ></div>

          {/* Name */}
          <h3 style={{ margin: "5px 0" }}>{name}</h3>

          {/* Location */}
          <p style={{ color: "gray", fontSize: "14px", margin: "5px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaMapMarkerAlt style={{ marginRight: "5px" }} /> {location}
          </p>

          <hr style={{ margin: "10px 0", border: "0.5px solid #ddd" }} />

          {/* Update Profile Link */}
          <p style={{ color: "#004aad", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>
            Update profile visibility
          </p>
        </div>

        {/* Right Rectangle - Dynamic Banner Section */}
        <div style={{ 
          backgroundImage: bannerImage ? `url(${bannerImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px", 
          borderRadius: "10px", 
          flex: 1, 
          marginLeft: "20px",
          minHeight: "150px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: bannerImage ? "none" : "2px solid #f0f0f0" // Border only when no image is set
        }}>

          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ display: "none" }} 
            id="upload-banner"
          />
          
          {/* Upload Button (Initially) */}
          {!bannerImage && (
            <label 
              htmlFor="upload-banner" 
              style={{ 
                cursor: "pointer", 
                padding: "10px 15px", 
                background: "#004aad", 
                color: "white", 
                borderRadius: "20px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "background 0.3s", // Smooth transition
              }}
              onMouseEnter={(e) => e.target.style.background = "#00368c"} // Darker color on hover
              onMouseLeave={(e) => e.target.style.background = "#004aad"} // Restore original color
            >
              <FiPlus size={16} /> Upload Banner
            </label>
          )}

          {/* Edit & Remove Icons (After Image is Selected) */}
          {bannerImage && (
            <>
              {/* Edit Icon */}
              <label htmlFor="upload-banner" style={{ 
                position: "absolute",
                top: "10px",
                right: "40px",
                background: "rgba(28, 77, 212, 0.6)",
                color: "white",
                padding: "8px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}>
                <FiEdit2 size={16} />
              </label>

              {/* Remove Icon */}
              <button onClick={handleRemoveImage} style={{ 
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 0, 0, 0.7)",
                color: "white",
                padding: "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <FiTrash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Importing and using the modal */}
      <ProfileEditModal 
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        profileImage={profileImage}
        setProfileImage={setProfileImage} // Pass setProfileImage
        handleProfileChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
          }
        }}
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        defaultProfileImage={defaultProfileImage} // Pass default image as prop
      />
      
      {/* Detail Form */}
      <DetailForm />
    </div>
  );
};

export default ProfilePage;