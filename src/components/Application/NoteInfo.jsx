import closeIcon from "../../images/info.svg";

function NoteInfo({ handleInfo, currentNote }) {
  const { created, modified, data } = currentNote;

  let wordCount = 0;
  const dataArray = data.split("\n");
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
              {month[modified.month]} {modified.dayOfMonth}, {modified.year},{" "}
              {created.hours === 0
                ? "00"
                : created.hours < 10
                ? `0${created.hours}`
                : created.hours}
              :
              {created.minutes === 0
                ? "00"
                : created.minutes < 10
                ? `0${created.minutes}`
                : created.minutes}
            </span>
          </div>
          <div>
            <span>Created</span>
            <span>
              {month[created.month]} {created.dayOfMonth}, {created.year},{" "}
              {created.hours === 0
                ? "00"
                : created.hours < 10
                ? `0${created.hours}`
                : created.hours}
              :
              {created.minutes === 0
                ? "00"
                : created.minutes < 10
                ? `0${created.minutes}`
                : created.minutes}
            </span>
          </div>
          <div>
            <span>Words</span>
            <span>{wordCount}</span>
          </div>
          <div>
            <span>Characters</span>
            <span>{data.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoteInfo;
