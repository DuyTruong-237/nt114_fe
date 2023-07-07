import React, { useState } from 'react';
import './AddData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Loại bỏ tự động thêm CSS của FontAwesome

export default function AddFileUpload({
    closeModal, 
    handleFileUpload
 }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    handleFileUpload(formData);
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <span className="close" onClick={closeModal}>
          <FontAwesomeIcon icon={faWindowClose} size="lg" style={{color: "#f8e3e3",}}/>
        </span>
        <h2>Add File</h2>
      </div>
      <div className="modal-content">
        <label>Title</label>
        <input 
        type="text"
        value={title} 
        onChange={handleTitleChange}
        />

        <label>Description</label>
        <textarea 
        value={description} 
        onChange={handleDescriptionChange}>
        </textarea>

        <label>File</label>
        <input 
        type="file" 
        className='upload-box'
        onChange={handleFileChange}
        />

        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
}
