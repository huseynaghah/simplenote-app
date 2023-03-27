import closeIcon from "../../images/info.svg";

function NoteInfo({ handleInfo, currentNote }) {
  const { creationDate, lastModified, content } = currentNote;

  let dateLast = new Date (currentNote.lastModified)
  console.log("eyooo" , dateLast.getHours());

  let wordCount = 0;
  const dataArray = content.split("\n");
  dataArray.forEach((element) => {
    let newElement = element.trim();
    if (element !== "") {
      wordCount = newElement.split(" ").length + wordCount;
    }
  });

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <section className="note-info__container">
      <div className="note-info">
        <div className="note-info__header">
          <h3>Document</h3>
          <img src={closeIcon} alt="Close Icon" onClick={handleInfo} />
          <div className="border-bottom"></div>
        </div>
        <div className="note-info__body">
          <div>
            <span>Modified</span>
            <span>
              {month[dateLast.getMonth()]} {dateLast.getDate()}, {dateLast.getFullYear()},{" "}
              {dateLast.getHours() === 0
                ? "00"
                : dateLast.hours < 10
                ? `0${dateLast.hours}`
                : dateLast.hours}
              :
              {dateLast.minutes === 0
                ? "00"
                : dateLast.minutes < 10
                ? `0${dateLast.minutes}`
                : dateLast.minutes}
            </span>
          </div>
          <div>
            <span>Created</span>
            <span>
              {month[creationDate.month]} {creationDate.dayOfMonth}, {creationDate.year},{" "}
              {creationDate.hours === 0
                ? "00"
                : creationDate.hours < 10
                ? `0${creationDate.hours}`
                : creationDate.hours}
              :
              {creationDate.minutes === 0
                ? "00"
                : creationDate.minutes < 10
                ? `0${creationDate.minutes}`
                : creationDate.minutes}
            </span>
          </div>
          <div>
            <span>Words</span>
            <span>{wordCount}</span>
          </div>
          <div>
            <span>Characters</span>
            <span>{content.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoteInfo;
