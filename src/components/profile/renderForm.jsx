import React from "react";
import { FaTimes } from "react-icons/fa";

const RenderForm = ({ 
    activeTab, 
    formData, 
    setFormData, 
    isSaved, 
    documentName, 
    setDocumentName, 
    selectedFile, 
    setSelectedFile, 
    documents, 
    handleAddDocument, 
    handleViewDocument, 
    handleRemoveDocument 
}) => {
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
                  {["Male", "Female", "Other"].map((Gender) => (
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
        case "Education":
          return (
            <div className="form-grid">
              {["University", "Institute", "Course", "Branch", "StartDate"].map((field) => (
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
              {["EndDate", "Percentage"].map((field) => (
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
            </div>
          );
        case "Experience":
          return (
            <div className="form-grid">
              {["Company", "Position", "Current Salary", "Expected Salary"].map((field) => (
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
                <label>Are you currently working here? <span className="required">*</span></label>
                <div className="work-status-options">
                  {["Yes ", "No"].map((option) => (
                    <label key={option} className="radio-label">
                      <input
                        type="radio"
                        name="currentlyWorking"
                        value={option}
                        checked={formData.currentlyWorking === option}
                        onChange={() => setFormData({ ...formData, currentlyWorking: option })}
                        disabled={isSaved}
                      />
                      <span className="custom-radio"></span> {option}
                    </label>
                  ))}
                </div>
              </div>
              <br/>
              {["From", "To"].map((field) => (
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
                <label>Description</label>
                <textarea
                  placeholder="Description"
                  value={formData.About}
                  onChange={(e) => setFormData({ ...formData, About: e.target.value })}
                  disabled={isSaved}
                ></textarea>
              </div>
            </div>
          );

        case "Skills":
          return (
            <div className="form-grid">
              {["TechnicalSkills"].map((field) => (
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
              {["SoftSkills"].map((field) => (
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
            </div>
          );
          case "Documents":
            return (
              <div className="form-grid">
                {/* Document Name Input */}
                <div className="form-group">
                  <label>
                    Document Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Document Name"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                  />
                </div>

                {/* Browse Button */}
                <div className="form-group">
                  <label>
                    Upload Document <span className="required">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>

                {/* Add Button */}
                <button className="add-button" onClick={handleAddDocument}>
                  ADD
                </button>
                <br/>
                {/* Documents Table */}
                {documents.length > 0 && (
                  <table className="documents-table">
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>Document Name</th>
                        <th>File Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{doc.name}</td>
                          <td>{doc.file.name}</td>
                          <td>
                            <button 
                              className="view-button" 
                              onClick={() => handleViewDocument(doc)}
                            >
                              View
                            </button>
                            <button 
                              className="delete-button" 
                              onClick={() => handleRemoveDocument(index)}
                            >
                              <FaTimes />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );

        default:
          return <p className="tab-content">{activeTab} section content goes here.</p>;
      }
    }

export default RenderForm;
