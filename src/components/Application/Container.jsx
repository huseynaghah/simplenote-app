import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import Note from "./Note";
import AllNotes from "./AllNotes";
import useWindowDimensions from "../../hooks/useWindowDimension";
import "../../assets/style.css";
import NoteInfo from "./NoteInfo";
import axios from "axios";
import getItems from "./getNotes";


function Container() {


  let token = localStorage.getItem("token")

  const [noteList, setNoteList] = useState([]);
  const [currentNote, setCurrentNote] = useState(() => {
    const initialValue = noteList[0];
    return initialValue || {};
  });


  useEffect(() => {
    getItems()
    .then( (data)=>{
    // setNoteList([...data][0]);
    const pinnedNotes = [...data][0].filter((note) => note.isPinned);
    const withoutPinned = [...data][0].filter((note) => !note.isPinned);
    [...data][0].length > 0 && setCurrentNote([...data][0][0])
    setNoteList([...pinnedNotes, ...withoutPinned]);
   })
    .catch((err)=>console.log(err))


   

  }, [])
  
  console.log("afterfetch" , noteList);



  // console.log(currentNote);


  const [shouldUpdateNoteList, setShouldUpdateNoteList] = useState(false);
  const [displayMobile, setDisplayMobile] = useState(true);
  const [displayInfo, setDisplayInfo] = useState(false);

  const allNotesRef = useRef();
  const notesRef = useRef();
  const verticalLineRef = useRef();

  const addNewNote = () => {

    let userDataFromLocalHost = JSON.parse(localStorage.getItem("user"))
    console.log(userDataFromLocalHost);
    
    axios.post("http://localhost:8090/api/notes/", {userId: userDataFromLocalHost}, {headers: {Authorization : "Bearer " + token}})
    .then((res)=>{
      console.log(res.data);
      const date = new Date();

      const newNote = {
        _id: res.data._id,
        content: res.data.content,
        creationDate: res.data.creationDate,
        lastModified: res.data.lastModified,
        isPinned: res.data.isPinned,
        markdown: res.data.markdown,
        tags: res.data.tags,
        isTrashed: res.data.isTrashed,
        userId: res.data.userId
      };
      setNoteList((prevNoteList) => [newNote, ...prevNoteList]);

      setShouldUpdateNoteList(true);
    })


   
  };

  const handleShouldUseMarkdown = () => {
    setCurrentNote((prevCurrent) => ({
      ...prevCurrent,
      shouldUseMarkdown: !prevCurrent.shouldUseMarkdown,
    }));
    setShouldUpdateNoteList(true);
  };

  const getCurrentNote = (id) => {
    setCurrentNote(noteList.find((note) => note._id === id && note));
  };

  const handleTodo = () => {};

  const pinNote = (e, ID, isP) => {
    e.stopPropagation();
    e.preventDefault();

    axios.patch("http://localhost:8090/api/notes/pin", {"_id": ID, "isPinned" : !isP}, {headers: {Authorization : "Bearer " + token}} )
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

    const newList = noteList.map((note) => {
      return note._id === ID
        ? {
            ...note,
            isPinned: !note.isPinned,
          }
        : note;
    });

    const [editedNote] = newList.filter((note) => note._id === ID);

    const noteListWithoutPin = newList.filter(
      (note) => !note.isPinned && note._id !== ID
    );

    const pinnedNotes = newList.filter(
      (note) => note.isPinned && note._id !== ID
    );

    if (editedNote.isPinned) {
      setNoteList([editedNote, ...pinnedNotes, ...noteListWithoutPin]);
    } else {
      setNoteList([...pinnedNotes, editedNote, ...noteListWithoutPin]);
    }
    setShouldUpdateNoteList(true);
  };

  const editCurrentNote = (e) => {
    setShouldUpdateNoteList(true);

    let date = new Date().toISOString()

     setCurrentNote((prevCurrentNote) => ({
      ...prevCurrentNote,
      content: e.target.value,
      lastModified: date,
    })
    );

    

    axios.patch("http://localhost:8090/api/notes/edit", {"_id": currentNote._id, content: e.target.value, lastModified: date}, {headers: {Authorization : "Bearer " + token}})
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))


  };

  const handleDelete = async (id) => {

    console.log("repsel", id);

    axios.post("http://localhost:8090/api/notes/delete",  {"_id" : id}, {headers: {Authorization : "Bearer " + token}})
    .then((res)=>{
      console.log(res.data)
      
    })
    .catch((err)=>console.log(err))
    
    const newNoteList = noteList.filter((note) => note._id !== id);
    const indexCurrent = noteList.indexOf(currentNote);

    setNoteList(newNoteList);

    if (newNoteList.length === 0) {
      setCurrentNote({});
    } else if (indexCurrent === newNoteList.length) {
      setCurrentNote(newNoteList[newNoteList.length - 1]);
    } else {
      setCurrentNote(noteList[indexCurrent + 1]);
    }


  };

  const handleToggle = () => {
    allNotesRef.current.classList.toggle("disable-all-notes");
    notesRef.current.classList.toggle("toggle-note-container");
    verticalLineRef.current.classList.toggle("display-vertical-line");
  };

  const handleInfo = () => {
    setDisplayInfo((prev) => !prev);
  };

  useEffect(() => {
    if (shouldUpdateNoteList) {
      const pinnedNotes = noteList.filter((note) => note.isPinned);
      const withoutPinned = noteList.filter((note) => !note.isPinned);
      setNoteList([...pinnedNotes, ...withoutPinned]);
      setShouldUpdateNoteList(false);
    }
  }, [shouldUpdateNoteList]);

  useEffect(() => {
    noteList.length > 0 && shouldUpdateNoteList && setCurrentNote(noteList[0]);
    localStorage.setItem("noteList", JSON.stringify(noteList));
    setShouldUpdateNoteList(false);
  }, []);

  useEffect(() => {
    if (shouldUpdateNoteList) {
      const newNotes = noteList.filter((note) =>
        note._id !== currentNote._id ? note : null
      );
      const pinnedNotes = newNotes.filter((note) => note.isPinned);
      const withoutPinned = newNotes.filter((note) => !note.isPinned);
      withoutPinned.unshift(currentNote);
      setNoteList([...pinnedNotes, ...withoutPinned]);
      setShouldUpdateNoteList(false);
    }
  }, [currentNote]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 750) {
      setDisplayMobile(true);
    } else {
      setDisplayMobile(false);
    }
  }, [width]);

  return (
    <>
      <div className="grid-container">
        {displayMobile ? (
          
            <Routes>
              <Route
                path="/"
                element={
                  <AllNotes
                    noteList={noteList}
                    addNewNote={addNewNote}
                    getCurrentNote={getCurrentNote}
                    currentNote={currentNote}
                    pinNote={pinNote}
                    ref={allNotesRef}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Note
                    noteList={noteList}
                    currentNote={currentNote}
                    editCurrentNote={editCurrentNote}
                    pinNote={pinNote}
                    handleShouldUseMarkdown={handleShouldUseMarkdown}
                    handleDelete={handleDelete}
                    handleTodo={handleTodo}
                    handleToggle={handleToggle}
                    addNewNote={addNewNote}
                    ref={notesRef}
                    handleInfo={handleInfo}
                  />
                }
              />
            </Routes>
          
        ) : (<>
            <AllNotes
              noteList={noteList}
              addNewNote={addNewNote}
              getCurrentNote={getCurrentNote}
              currentNote={currentNote}
              pinNote={pinNote}
              ref={allNotesRef}
            />
            <Note
              noteList={noteList}
              currentNote={currentNote}
              editCurrentNote={editCurrentNote}
              pinNote={pinNote}
              handleShouldUseMarkdown={handleShouldUseMarkdown}
              handleDelete={handleDelete}
              handleTodo={handleTodo}
              handleToggle={handleToggle}
              addNewNote={addNewNote}
              ref={notesRef}
              verticalLineRef={verticalLineRef}
              handleInfo={handleInfo}
            />
         </>
        )}
      </div>
      {displayInfo && (
        <NoteInfo handleInfo={handleInfo} currentNote={currentNote} />
      )}
    </>
  );
}

export default Container;
