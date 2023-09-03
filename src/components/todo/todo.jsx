import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.jsx';
import List from '../List/list.jsx';
import Header from '../Header/Header.jsx';
import Button from '@mui/material/Button';
import { SettingContext } from '../../context/Setting.jsx';
import { v4 as uuid } from 'uuid';

const ToDo = () => {
  const setting = useContext(SettingContext)
  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  function addItem(item) {
    item.id = list.length;
    item.complete = false;
    setList((prevList) => prevList.concat(item));
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }



  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);
  useEffect(()=>{
    const LSstate = localStorage.getItem("state")
    const LSstateInt = JSON.parse(LSstate)
    if(LSstateInt){
            setting.setDisplay(LSstateInt.display)
            setting.setHideCompleted(LSstateInt.hideCompleted)
            setting.setSort(LSstateInt.sort)
    }
},[])
  return (
    <div className='toDo'>
      <div className='secHeader'>
    <h1>To Do List: {incomplete} items pending</h1>
    </div>
      {/* <Header incomplete={incomplete}/> */}
      <div className='main'>
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <Button type='submit' variant="contained">Add Item</Button>
        </label>
      </form>
      <List list={list} setting={setting} setList={setList} />
    </div>
    </div>
  );
};

export default ToDo;
