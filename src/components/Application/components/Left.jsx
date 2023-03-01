import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styles from "./Left.module.css"
import data from "/Users/huseynagahaqverdiyev/Documents/simplenote-app/notes.json"
import { List } from 'react-virtualized'

const list = [
  'Brian Vaughn',
  "salam",
  "sagol"
  // And so on...
];

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
}) {
  return (
    <div key={key} style={style}>
      {list[index]}
    </div>
  );
}



export default function SwipeableTemporaryDrawer() {

  console.log(data);
  const [searchValue, setSearchValue] = React.useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       <ListItem disablePadding>
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <InboxIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="All Notes" />
  //         </ListItemButton>
  //       </ListItem>
  //       <ListItem disablePadding>
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <InboxIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="Trash" />
  //         </ListItemButton>
  //       </ListItem>
  //       <ListItem disablePadding>
  //         <ListItemButton>
  //           <ListItemIcon>
  //             <InboxIcon />
  //           </ListItemIcon>
  //           <ListItemText primary="Settings" />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (<>
    <div className={styles.navbar}>
      <React.Fragment key="left">
        <button className={styles.leftbut} onClick={toggleDrawer("left", true)}>
          <svg className="icon-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="0" fill="none" width="24" height="24"></rect><path d="M21 11H3v2H21Zm0-5H3V8H21Zm0 10H3v2H21Z"></path></svg>
        </button>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {/* {list("left")} */}
        </SwipeableDrawer>
      </React.Fragment>
      <div className={styles.title}>All notes</div>
      <button className={styles.leftbut}>
        <svg className="icon-new-note" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="0" fill="none" width="24" height="24"></rect><path d="M9.707 12.879L19.59 3 21 4.41l-9.879 9.883L9 15 9.707 12.879zM18 18H6V6h7V4H6.002C4.896 4 4 4.896 4 6.002v11.996C4 19.104 4.896 20 6.002 20h11.996C19.104 20 20 19.104 20 17.998V11h-2V18z"></path></svg>
      </button>
    </div>
    <div className={styles.search}>
      <button className={styles.leftbut}>
        <svg className="icon-search-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect x="0" fill="none" width="16" height="16"></rect><path d="M6.54 12c-3.037 0.022-5.518-2.423-5.54-5.46s2.423-5.518 5.46-5.54S11.978 3.423 12 6.46c0 0.027 0 0.053 0 0.08C11.978 9.546 9.546 11.978 6.54 12zM6.54 3C4.607 2.978 3.022 4.527 3 6.46 2.978 8.393 4.528 9.978 6.46 10 8.393 10.022 9.978 8.473 10 6.54c0.022-1.933-1.527-3.518-3.46-3.54C6.54 3 6.54 3 6.54 3zM10.939 12.349l1.414-1.414 2.616 2.616 -1.414 1.414L10.939 12.349z"></path></svg>
      </button>
      <input type='text' value={searchValue} placeholder='Search All notes and tags' className={styles.inputSearch} onChange={(e) => setSearchValue(e.target.value)} />
      {searchValue && <button className={styles.leftbut} onClick={() => setSearchValue("")}><svg classNae="icon-cross-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect x="0" fill="none" width="16" height="16"></rect><path d="M13.66 3.76l-1.42-1.42L8 6.59 3.76 2.34 2.34 3.76 6.59 8l-4.25 4.24 1.42 1.42L8 9.41l4.24 4.25 1.42-1.42L9.41 8 13.66 3.76z"></path></svg></button>}
    </div>
    <div className={styles.notelist}>
      <List
        width={300}
        height={1000}
        rowCount={list.length}
        rowHeight={20}
        rowRenderer={rowRenderer}
      />
    </div>
  </>
  );
}

// {data && data.activeNotes.map(note=>{return <div style={{borderBottom: "1px solid black"}}><h1>{note.content.split("\r\n")[0]}</h1><div className={styles.desc}><h4 className={styles.desc}>{note.content.split("\r\n").slice(1)}</h4></div></div>})}
