import toggleListIcon from "../../images/toggle-icon.svg";
import moreToolsIcon from "../../images/more-tools.svg";
import openMarkdown from "../../images/more-tools.svg";
import closeMarkDown from "../../images/clear-icon.svg";
import checkboxIcon from "../../images/checkbox.svg";
import infoIcon from "../../images/info.svg";
import createNote from "../../images/new-note.svg";

import EditNote from "./EditNote";
import Markdown from "./Markdown";
import MoreTools from "./MoreTools";
import ErrorBoundary from "../../Error/ErrorBoundary";
import useWindowDimensions from "../../hooks/useWindowDimension";

import { Link } from "react-router-dom";

import { useState, useRef, useEffect, forwardRef } from "react";

const Note = forwardRef(
  (
    {
      noteList,
      currentNote,
      editCurrentNote,
      pinNote,
      handleShouldUseMarkdown,
      handleDelete,
      handleTodo,
      handleToggle,
      addNewNote,
      verticalLineRef,
      handleInfo,
    },
    ref
  ) => {
    const [isMoreToolsVisible, setIsMoreToolsVisible] = useState(false);
    const [isMarkDownVisible, setIsMarkDownVisible] = useState(false);

    const moreToolsRef = useRef();
    const linkRef = useRef();
    const { width } = useWindowDimensions();

    const handleMarkDownVisibility = () => {
      setIsMarkDownVisible((prevIsVisible) => !prevIsVisible);
    };

    const handleMoreToolsVisibility = () => {
      setIsMoreToolsVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
      if (width < 750) {
        linkRef.current.classList.add("display-link");
      } else {
        linkRef.current.classList.remove("display-link");
      }
    }, [width]);

    useEffect(() => {
      const checkIsOutside = (e) => {
        const isMoreTools =
          e.target.alt === "More Tools" ||
          moreToolsRef.current.contains(e.target);

        if (e.target.className === "delete-btn" || !isMoreTools) {
          setIsMoreToolsVisible((prevVisible) => !prevVisible);
        }
      };

      if (isMoreToolsVisible) {
        document.addEventListener("click", checkIsOutside);
      }

      return () => {
        document.removeEventListener("click", checkIsOutside);
      };
    }, [isMoreToolsVisible]);

    return (
      <section className="column-container note-container" ref={ref}>
        <header className="note-header">
          <img
            src={createNote}
            alt="Create Note"
            className="show-element"
            onClick={addNewNote}
          />
          <div className="vertical-line" ref={verticalLineRef}></div>
          <Link to="/" className="go-back-link" ref={linkRef}>
            <svg
              className="icon-back"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <rect x="0" fill="none" width="24" height="24"></rect>
              <path
                fill="#646970"
                d="M21 11H6.83l5.72-5.72 -1.42-1.41L3 12l8.13 8.13 1.42-1.41L6.83 13H21V11z"
              ></path>
            </svg>
          </Link>

          <img
            src={toggleListIcon}
            alt="Toggle List"
            onClick={handleToggle}
            className={noteList.length !== 0 ? "show-element toggle" : "toggle"}
          />
          {currentNote && currentNote.shouldUseMarkdown && (
            <img
              src={isMarkDownVisible ? closeMarkDown : openMarkdown}
              alt="Display Markdown"
              onClick={handleMarkDownVisibility}
              className={
                noteList.length !== 0 ? "show-element markdown" : "markdown"
              }
            />
          )}
          <img
            src={checkboxIcon}
            alt="Checkbox Icon"
            onClick={handleTodo}
            className={noteList.length !== 0 ? "show-element" : ""}
          />
          <img
            src={infoIcon}
            alt="Info Icon"
            className={noteList.length !== 0 ? "show-element info" : "info"}
            onClick={handleInfo}
          />
          <img
            src={moreToolsIcon}
            alt="More Tools"
            onClick={handleMoreToolsVisibility}
            className={noteList.length !== 0 ? "show-element" : ""}
          />
          {isMoreToolsVisible && (
            <ErrorBoundary>
              <MoreTools
                ref={moreToolsRef}
                currentNote={currentNote}
                noteList={noteList}
                pinNote={pinNote}
                handleShouldUseMarkdown={handleShouldUseMarkdown}
                handleDelete={handleDelete}
              />
            </ErrorBoundary>
          )}
        </header>
        {isMarkDownVisible && currentNote.shouldUseMarkdown ? (
          <Markdown currentNote={currentNote} />
        ) : noteList.length !== 0 ? (
          <EditNote
            currentNote={currentNote}
            editCurrentNote={editCurrentNote}
          />
        ) : (
          <svg className="main-logo" width="150" height="150" viewBox="0 0 176 176">
            <g fillRule="evenodd" clipRule="evenodd">
              <path
                d="M152.37 87.885c0-34.066-27.182-63.42-59.45-64.854-6.416-.284-12.647 1.432-17.58 5.573-5.002 4.196-8.07 10.09-8.638 16.595C65.43 59.73 78.537 68.618 91.225 72.09c30.69 8.398 48.462 30.086 46.655 56.757 9.057-11.194 14.49-25.442 14.49-40.962zM84.345 97.24c-28.696-7.853-45.817-29.174-43.62-54.317.027-.287.073-.567.102-.852C29.19 53.846 22 70.023 22 87.886c0 34.348 27.955 63.828 60.277 64.933 7.227.248 14.214-1.685 19.766-6.344 5.67-4.757 9.146-11.435 9.79-18.808 1.703-19.463-16.492-27.417-27.488-30.426z"
                fill="#4895d9"
              ></path>
            </g>
          </svg>
        )}
      </section>
    );
  }
);

export default Note;
