import { useEffect, useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimension";

function EditNote({ currentNote, editCurrentNote }) {
  const noteRef = useRef();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 750) {
      noteRef.current.focus();
    }
  }, [currentNote, width]);

  return (
    <textarea
      className="note-body"
      spellCheck="false"
      ref={noteRef}
      value={currentNote.content === undefined ? "" : currentNote.content}
      onChange={editCurrentNote}
    ></textarea>
  );
}

export default EditNote;
