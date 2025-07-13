import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import { FaSearch } from 'react-icons/fa';


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.log('❌ Fetch notes error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);


  useEffect(() => {
    if (!user) {
      setNotes([]);
      setFilteredNotes([]);
    }
  }, [user]);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [query, notes]);

  const closeModal = () => {
    setModalOpen(false);
    setEditNote(null);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setModalOpen(true);
  };



  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        fetchNotes();
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
    }
  };

  // ✅ Add note
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/note/add`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        closeModal();
        fetchNotes();
      }
    } catch (error) {
      console.log('❌ Add note error:', error);
    }
  };

  // ✅ Edit note
  const edittingNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        closeModal();
        fetchNotes();
      }
    } catch (error) {
      console.log('❌ Edit note error:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <Navbar/>





      {/* Search Field */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-10 py-6">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-12 py-3 rounded-md border-none bg-gray-200 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base sm:text-lg"
          />
          {/* Icon inside input (left side) */}
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>











      <div className=' px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {(notes.length === 0) ? (
          <p className="text-center text-gray-500 mt-10">No notes available</p>
        ) : (

          filteredNotes.length > 0 ? filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
            :
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-teal-500 text-white px-4 py-2 rounded-full fixed bottom-6 right-6 sm:bottom-10 sm:right-10 text-3xl shadow-lg"
      >
        +
      </button>


      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          editNote={editNote}
          edittingNote={edittingNote}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
