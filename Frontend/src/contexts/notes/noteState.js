import React, { useState, useEffect } from "react";
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = "https://inotebook-backend-virid.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Retrieved token:", token);  // Debugging line
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await fetch(`${host}/routes/notes/fetchNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      console.log("Fetched notes:", json);
  
      if (json.notes && Array.isArray(json.notes)) {
        setNotes(json.notes);
      } else {
        console.error("API response does not contain an array of notes:", json);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  
  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/routes/notes/addNotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Corrected this line
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/routes/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Corrected this line
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();  // Await the JSON response
    
    // Logic to edit the notes
    const newNotes = notes.map(note => 
      note._id === id ? { ...note, title, description, tag } : note
    );

    setNotes(newNotes);
  };

  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/routes/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Corrected this line
      }
    });
    const json = await response.json();
    console.log("Deleting the note with the " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
