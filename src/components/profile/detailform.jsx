import React, { useState } from "react";
import { Edit2 } from "lucide-react"; // Importing Edit Icon
import "./css/DetailForm.css";
import errorGif from "../../assets/profile/error.gif";  // Adjust the path as per your project structure
import submitGif from "../../assets/profile/submit.gif";
import RenderForm from "../../components/profile/renderForm";


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
    University: "",
    Institute: "",
    Course: "",
    Branch: "",
    StartDate: "",
    EndDate: "",
    Percentage: "",
    Company: "",
    Position: "",
    CurrentSalary: "",
    ExpectedSalary: "",
    currentlyWorking: "",
    From: "",
    To: "",
    TechnicalSkills: "",
    SoftSkills: ""
  });
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [highlightDate, setHighlightDate] = useState("June 2025");
  const [isEditingHighlight, setIsEditingHighlight] = useState(false);
  
  const [links, setLinks] = useState({ LinkedIn: "", Portfolio: "", GitHub: "" });
  const [showLinksModal, setShowLinksModal] = useState(false);

  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleAddDocument = () => {
    if (!documentName || !selectedFile) {
      alert("Please enter document name and select a file.");
      return;
    }
    setDocuments([...documents, { name: documentName, file: selectedFile }]);
    setDocumentName("");
    setSelectedFile(null);
  };

  const handleViewDocument = (doc) => {
    const fileURL = URL.createObjectURL(doc.file);
    window.open(fileURL, "_blank");
  };

  const handleRemoveDocument = (index) => {
    setDocuments((prevDocuments) => prevDocuments.filter((_, i) => i !== index));
  };  

  const tabs = ["Personal Info", "Education", "Experience", "Skills", "Documents"];

  const handleSave = () => {
    if (!formData.FullName || !formData.DateOfBirth || !formData.Gender || !formData.Phone || !formData.Country || !formData.University || !formData.Institute || !formData.Course || !formData.Branch || !formData.StartDate ) {
        setModalMessage(
            <div>
                <img src={errorGif} alt="Error" style={{ width: "200px", height: "150px" }} />
                <p>Please fill all the required sections to save</p>
            </div>
        );
    } else {
        setModalMessage(
            <div>
                <img src={submitGif} alt="Success" style={{ width: "200px", height: "150px" }} />
                <p>Saved Successfully</p>
            </div>
        );
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
        <RenderForm
          activeTab={activeTab}
          formData={formData}
          setFormData={setFormData}
          isSaved={isSaved}
          documentName={documentName}
          setDocumentName={setDocumentName}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          documents={documents}
          handleAddDocument={handleAddDocument}
          handleViewDocument={handleViewDocument}
          handleRemoveDocument={handleRemoveDocument}
        />

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {activeTab !== "Documents" ? (
            <button 
              onClick={() => setActiveTab(tabs[tabs.indexOf(activeTab) + 1])} 
              className="next-button"
            >
              NEXT
            </button>
          ) : (
            isSaved ? (
              <>
                <button className="edit-button" onClick={handleEdit}>EDIT</button>
              </>
            ) : (
              <button onClick={handleSave} className="save-button">SAVE</button>
            )
          )}
        </div>
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
