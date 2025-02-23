import React, { useState } from "react";
import { Edit2 } from "lucide-react"; // Importing Edit Icon
import "./css/DetailForm.css";

const DetailForm = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [formData, setFormData] = useState({
    FullName: "",
    DateOfBirth: "",
    Gender: "",
    Phone: "",
    Country: "",
    State: "",
    City: "",
    PinCode: "",
    About: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [highlightDate, setHighlightDate] = useState("June 2025");
  const [isEditingHighlight, setIsEditingHighlight] = useState(false);
  
  const [links, setLinks] = useState({ LinkedIn: "", Portfolio: "", GitHub: "" });
  const [showLinksModal, setShowLinksModal] = useState(false);

  const tabs = ["Personal Info", "Education", "Experience", "Skills", "Documents"];

  const handleSave = () => {
    if (!formData.FullName || !formData.DateOfBirth || !formData.Gender || !formData.Phone || !formData.Country) {
      setModalMessage("Please fill all the required sections to save");
    } else {
      setModalMessage("Saved Successfully");
      setIsSaved(true);
    }
    setShowModal(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <div className="detail-form-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        {/* Highlights Section */}
        <div className="sidebar-box">
          <h3>
            Highlights 
            <Edit2 className="edit-icon" size={14} onClick={() => setIsEditingHighlight(true)} />
          </h3>
          <div className="highlight-item">
            🎓 {highlightDate}
          </div>
        </div>

        {/* Additional Links Section */}
        <div className="sidebar-box">
          <h3>
            Additional Links 
            <Edit2 className="edit-icon" size={14} onClick={() => setShowLinksModal(true)} />
          </h3>
          <ul className="links-list">
            {Object.keys(links).map((platform) => (
              <li key={platform}><a href={links[platform]}>{platform}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for Editing Highlights */}
      {isEditingHighlight && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Graduation Date</h3>
            <input
              type="text"
              value={highlightDate}
              onChange={(e) => setHighlightDate(e.target.value)}
            />
            <button onClick={() => setIsEditingHighlight(false)}>Save</button>
          </div>
        </div>
      )}

      {/* Modal for Editing Links */}
      {showLinksModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Additional Links</h3>
            {Object.keys(links).map((platform) => (
              <div key={platform} className="form-group">
                <label>{platform}</label>
                <input
                  type="text"
                  value={links[platform]}
                  onChange={(e) => setLinks({ ...links, [platform]: e.target.value })}
                />
              </div>
            ))}
            <button onClick={() => setShowLinksModal(false)}>Save</button>
          </div>
        </div>
      )}

      <div className="form-section">
        <div className="tabs">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
              {tab}
            </button>
          ))}
        </div>
        
        {/* Render Form */}
        {(() => {
          switch (activeTab) {
            case "Personal Info":
              return (
                <div className="form-grid">
                  {["FullName", "DateOfBirth", "Phone"].map((field) => (
                    <div className="form-group" key={field}>
                      <label>
                        {field.replace(/([A-Z])/g, " $1").trim()} <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        disabled={isSaved}
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label>Gender <span className="required">*</span></label>
                    <div className="Gender-options">
                      {["Male", "Female", "More Options"].map((Gender) => (
                        <button
                          key={Gender}
                          onClick={() => setFormData({ ...formData, Gender })}
                          className={formData.Gender === Gender ? "selected" : ""}
                          disabled={isSaved}
                        >
                          {Gender}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country <span className="required">*</span></label>
                    <input
                      type="text"
                      value={formData.Country}
                      onChange={(e) => setFormData({ ...formData, Country: e.target.value })}
                      disabled={isSaved}
                    />
                  </div>
                  {["State", "City", "PinCode"].map((field) => (
                    <div className="form-group" key={field}>
                      <label>{field.replace(/([A-Z])/g, " $1").trim()}</label>
                      <input
                        type="text"
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        disabled={isSaved}
                      />
                    </div>
                  ))}
                  <div className="form-group full-width">
                    <label>About</label>
                    <textarea
                      placeholder="About"
                      value={formData.About}
                      onChange={(e) => setFormData({ ...formData, About: e.target.value })}
                      disabled={isSaved}
                    ></textarea>
                  </div>
                </div>
              );
            default:
              return <p className="tab-content">{activeTab} section content goes here.</p>;
          }
        })()}

        {/* Save & Edit Buttons */}
        {isSaved ? (
          <button className="edit-button" onClick={handleEdit}>EDIT</button>
        ) : (
          <button onClick={handleSave} className="save-button">SAVE</button>
        )}
      </div>

      {/* Save Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailForm;
