import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { storeInLocalStorage, fetchFromLocalStorage } from "../../utils/helpers";

const initialState = {
  notes: fetchFromLocalStorage("notes"),
  error: null,
  count: 0,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNewNote(state, action) {
      const { noteTitle, noteContent } = action.payload;
      let noteId = uuid();
      let newPost = { noteId, noteTitle, noteContent };
      newPost.noteDate = new Date().toISOString();
      state.notes.push(newPost);
      storeInLocalStorage("notes", state.notes);
    },

    removeNote(state, action) {
      const tempId = action.payload;
      const tempNotes = state.notes.filter((note) => note.noteId !== tempId);
      state.notes = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    },

    editNote(state, action) {
      const { noteId, noteTitle, noteContent } = action.payload;
      const tempNotes = state.notes.map((note) => {
        if (note.noteId === noteId) {
          note.noteTitle = noteTitle;
          note.noteContent = noteContent;
          note.noteDate = new Date().toISOString();
        }
        return note;
      });

      state.note = tempNotes;
      storeInLocalStorage("notes", tempNotes);
    },

    increaseCount(state, action) {
      state.count = state.count + 1;
    },
    pinNote(state, action) {
        const noteId = action.payload;
        const noteIndex = state.notes.findIndex(note => note.noteId === noteId);
        if (noteIndex !== -1) {
          const note = state.notes[noteIndex];
          if (note.pinned) {
            note.pinned = true;
            const originalIndex = state.notes.findIndex(n => !n.pinned);
            if (originalIndex !== -1) {
              state.notes.splice(originalIndex, 0, state.notes.splice(noteIndex, 1)[0]);
            }
          } else {
            note.pinned = true;
            state.notes.unshift(state.notes.splice(noteIndex, 1)[0]);
          }
          storeInLocalStorage("notes", state.notes);
        }
      },
  },
});

export const {
  addNewNote,
  removeNote,
  editNote,
  pinNote, // Add pinNote to exported actions
} = noteSlice.actions;
export const getAllNotes = (state) => state.notes.notes;
export default noteSlice.reducer;
