import React,{useEffect, useState} from 'react'
import {Pagination} from '@mui/material';


export default function List({list,setting,setList}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(()=>{
    const num = setting.display
    list.sort((a,b) => {return (a[setting.sort] - b[setting.sort])})
    const startIndex = (currentPage - 1) * num;
    const endIndex = parseInt(startIndex) + parseInt(num);
    setDisplayedItems(list.slice(startIndex, endIndex));
  },[list,currentPage,setting])

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items)
  }
  

  return (
    <div className='list'>
      {displayedItems.map((item,idx) => (
        (setting.hideCompleted? !item.complete : true) && <div className='listItem' key={idx}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={()=>toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
        
        ))}
        <div className='pagination'>
        <Pagination 
        onChange={handlePageChange} 
        count={Math.ceil(list.length / setting.display)}
        variant="outlined" 
        shape="rounded" />
        </div>
    </div>
  )
}