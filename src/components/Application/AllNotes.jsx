import newNoteIcon from "../../images/new-note.svg";
import searchIcon from "../../images/search-icon.svg";
import clearIcon from "../../images/search-icon.svg";
import createIcon from "../../images/search-icon.svg";
import hamburgerIcon from "../../images/hamburger.svg";

import { useEffect, useState, useRef, forwardRef } from "react";
import DisplayAllNotes from "./DisplayAllNotes";

const AllNotes = forwardRef(
  ({ noteList, addNewNote, getCurrentNote, currentNote, pinNote }, ref) => {
    const isInitialMount = useRef(true);
    const [searchNote, setSearchNote] = useState("");
    const [filteredNoteList, setFilteredNoteList] = useState([...noteList]);

    const handleSearch = (e) => {
      setSearchNote(e.target.value);
    };

    const handleClear = () => {
      setSearchNote("");
    };

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        console.log("required", noteList);
        const newList = noteList.filter((note) =>
          note.content.toLowerCase().includes(searchNote.toLowerCase())
        );
        setFilteredNoteList(newList);
      }
    }, [searchNote, noteList]);

    const createFirstElement = (
      <div className="create-note">
        <img src={createIcon} alt="Create" className="create-icon-image" />
        <button className="create-note-button" onClick={addNewNote}>
          Create your first note
        </button>
      </div>
    );

    return (
      <section className="column-container all-notes-container" ref={ref}>
        <header className="all-notes__header">
          <img src={hamburgerIcon} alt="hamburgerIcon" />
          <p>All Notes</p>
          <img
            src={newNoteIcon}
            alt="Create new note"
            className="create-note-btn"
            onClick={addNewNote}
          />
        </header>
        <div className="input">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Search all notes"
            value={searchNote}
            onChange={handleSearch}
          />
          <img
            src={clearIcon}
            onClick={handleClear}
            alt="Clear Icon"
            className={
              searchNote.length > 0 ? "clear-icon show-element" : "clear-icon"
            }
          />
        </div>
        {noteList.length > 0 ? (
          <DisplayAllNotes
            noteList={filteredNoteList}
            getCurrentNote={getCurrentNote}
            currentNote={currentNote}
            pinNote={pinNote}
          />
        ) : (
          createFirstElement
        )}
      </section>
    );
  }
);

export default AllNotes;
