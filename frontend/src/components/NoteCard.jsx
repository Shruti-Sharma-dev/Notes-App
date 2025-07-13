import React from 'react';

const pastelColors = [
  '#FFB3BA', // bright pastel red-pink
  '#FFDFBA', // bright peach
  '#FFFFBA', // sunny pastel yellow
  '#BAFFC9', // bright pastel mint green
  '#BAE1FF', // bright pastel blue
  '#E0BBE4', // pastel purple
  '#D5AAFF', // vivid lilac
  '#AFF8DB', // turquoise pastel
  '#FFC3A0', // coral pastel
  '#FFABAB', // bubblegum pink
  '#B5EAD7', // fresh green pastel
  '#C7CEEA'  // brighter lavender
];
const getRandomColor = () =>
  pastelColors[Math.floor(Math.random() * pastelColors.length)];


const NoteCard = ({ note, onEdit, onDelete }) => {
  const bgColor = getRandomColor();
  return (
    <div  className="rounded-lg p-4 shadow-md transition-all duration-200"
    style={{ backgroundColor: bgColor }}>
      <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
      <p className="text-gray-600 mb-4">{note.description}</p>
      <div className="flex gap-2">
        <button
          className="bg-white hover:grey-50 text-teal-500 px-4 py-2 rounded-md"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="bg-white hover:bg-grey-700 text-red-600 px-4 py-2 rounded-md"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
