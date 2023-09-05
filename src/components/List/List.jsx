import React,{useEffect, useState} from 'react'
import {Pagination} from '@mui/material';
import apiReq from '../Auth/apiReq.jsx';

export default function List({list,setting,setList}) {
  const API_URL='http://localhost:3500/todo'

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [fetchError,setFetchError]=useState(null)
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

  async function toggleComplete(id) {
    let changedItem
    const items = list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
        changedItem= item
      }
      return item;
    });
    
    const updateOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedItem)
    }
    const result = await apiReq(`${API_URL}/${id}`, updateOptions);
    if (result) setFetchError(result);

    setList(items)
  }
  const handleDelete = async (e,id)=>{ 
    let index
    list.map( (item,idx) => {
      if ( item.id == id ) {
        index = idx
      }
      return item;
    });
    let arr = [...list]
    arr.splice(index,1)
    console.log(arr)

    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const result = await apiReq(`${API_URL}/${id}`, deleteOptions);
    if (result) setFetchError(result);

    setList(arr)
  }
  

  return (
    <div className='list'>
      {displayedItems.map((item,idx) => (
        (setting.hideCompleted? !item.complete : true) && !fetchError  && <div className='listItem' key={idx}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={()=>toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <button onClick={(e)=>handleDelete(e,item.id)}>Delete</button>
          <hr />
        </div>
        
        ))}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
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
