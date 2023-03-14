import axios from "axios";
import { forwardRef } from "react";


const MoreTools = forwardRef(
  (
    { currentNote, noteList, pinNote, handleShouldUseMarkdown, handleDelete },
    ref
  ) => {
    let checked = noteList.find((note) => note._id === currentNote._id);
    if (noteList.length > 0) {
      checked = checked.isPinned;
    } else {
      checked = false;
    }

    return (
      <div className="more-tools-container" ref={ref}>
        <label className="note-action">
          <span>Pin to top</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              pinNote(e, currentNote._id, currentNote.isPinned);
            }}
          />
        </label>
        <label className="note-action">
          <span>Markdown</span>
          <input
            type="checkbox"
            checked={currentNote.shouldUseMarkdown || false}
            onChange={handleShouldUseMarkdown}
          />
        </label>
        <div className="note-action delete-btn">
          <button
            onClick={() => handleDelete(currentNote._id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default MoreTools;
