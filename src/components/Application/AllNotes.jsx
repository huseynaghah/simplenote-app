import newNoteIcon from "../../images/new-note.svg";
import searchIcon from "../../images/search-icon.svg";
import clearIcon from "../../images/search-icon.svg";
import createIcon from "../../images/search-icon.svg";
import hamburgerIcon from "../../images/hamburger.svg";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { useEffect, useState, useRef, forwardRef } from "react";
import DisplayAllNotes from "./DisplayAllNotes";
import { margin, textAlign } from "@mui/system";

const AllNotes = forwardRef(
  ({ noteList, addNewNote, getCurrentNote, currentNote, pinNote }, ref) => {
    const isInitialMount = useRef(true);
    const [searchNote, setSearchNote] = useState("");
    const [filteredNoteList, setFilteredNoteList] = useState([...noteList]);

    const handleSearch = (e) => {
      setSearchNote(e.target.value);
    };

    const logOut = () => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("acc")

      window.location="/"
    

    }

    const handleClear = () => {
      setSearchNote("");
    };

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
    }


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

    let userAcc = localStorage.getItem("acc")


    return (
      <section className="column-container all-notes-container" ref={ref}>
        <header className="all-notes__header">
          <img src={hamburgerIcon}
            alt="hamburgerIcon"
            onClick={toggleDrawer} />
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
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='left'
          className='bla bla bla'
        >
          <div style={{border: '1px solid black', margin:'4px', height:'40px', textAlign:'center', paddingTop:'3%'}}>{JSON.parse(userAcc)}</div>
          <div style={{border: '0', margin:'4px', height:'40px', textAlign:'center', paddingTop:'3%', backgroundColor:'#ced9f2'}} onClick={logOut}>Log out</div>
        </Drawer>
      </section>
    );
  }
);

export default AllNotes;
