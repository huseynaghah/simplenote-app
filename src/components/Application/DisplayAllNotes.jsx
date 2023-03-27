import { Link } from "react-router-dom";

function DisplayAllNotes({ noteList, getCurrentNote, currentNote, pinNote, setInNote }) {

  const displayNoteElements = (
    <div className="note-list">
      {noteList.map((note) => {
        return (
          <div key={note._id} onClick={()=>setInNote(false)} className="note-link">
            <div
              className={
                currentNote._id === note._id
                  ? "note-element active-note"
                  : "note-element"
              }
              onClick={() => getCurrentNote(note._id)}
            >
              <div className="note-data">
                {note.content ? 
                <> <p className="note-title">{note.content.split("\n")[0]}</p>
                <p className="note-subtitle">{note.content.split("\n")[1]}</p></>
                :   <p className="note-title">New Note...</p>
                }
               
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className={
                  note.isPinned
                    ? "pin pin-active icon-pinned-small"
                    : "pin icon-pinned-small"
                }
                onClick={(e) => pinNote(e, note._id, note.isPinned)}
              >
                <rect x="0" fill="none" width="16" height="16"></rect>
                <path
                  className={
                    currentNote._id === note._id && note.isPinned
                      ? "active-focused"
                      : note.isPinned
                      ? "active-path"
                      : "path"
                  }
                  d="M4.41 10.17l-4-4 5.65-0.52L8.65 3.1 7.24 1.69l1.42-1.42 7.07 7.07 -1.42 1.42 -1.42-1.43 -2.56 2.58 -0.52 5.66 -4-4L3 14.41 1.59 13 4.41 10.17zM8.21 11.17L8.4 9l3.07-3.1 -1.4-1.41L7 7.6 4.87 7.79 8.21 11.17z"
                ></path>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
  return displayNoteElements;
}

export default DisplayAllNotes;
