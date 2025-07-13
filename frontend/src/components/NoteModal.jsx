import React, { useState, useEffect } from 'react';

const NoteModal = ({ closeModal, addNote, editNote, edittingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.description);
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editNote) {
      edittingNote(editNote._id, title, content);
    } else {
      addNote(title, content);
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-500 bg-opacity-40 flex items-center justify-center z-50 px-4">
      {/* Responsive card */}
      <div className='flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-full max-w-md sm:p-8 h-[80vh] max-h-[700px]'>
        <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mb-4 text-center">
          {editNote ? 'Edit Note' : 'Add Note'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
            required
          />

          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
            rows="5"
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              {editNote ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
