import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.jsx';
import List from '../List/List.jsx';
import Button from '@mui/material/Button';
import { SettingContext } from '../../context/Setting.jsx';
import apiReq from '../Auth/apiReq.jsx';

const ToDo = () => {
  const API_URL='http://localhost:3500/todo'
  const setting = useContext(SettingContext)
  const [defaultValues] = useState({
    difficulty: 3,
    // id:uuid()
  });
  const [myList, setMyList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  

  async function addItem(item) {
    
    item.id = myList.length+1;
    item.complete = false;
    const arr =[...myList]
    arr.push(item)
    setMyList(arr);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }
    const result = await apiReq(API_URL, postOptions);
    if (result) setFetchError(result);

    console.log(myList)
    console.log(arr)
  }

  useEffect(() => {
    let incompleteCount = myList.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [myList]);

  useEffect(()=>{
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const itemsList = await response.json();
        setMyList(itemsList);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => fetchItems(), 500);

    const LSstate = localStorage.getItem("state")
    const LSstateInt = JSON.parse(LSstate)
    if(LSstateInt){
            setting.setDisplay(LSstateInt.display)
            setting.setHideCompleted(LSstateInt.hideCompleted)
            setting.setSort(LSstateInt.sort)
    }
    
  },[])
  return (
    <>
     {!fetchError && <div className='toDo'>
      {setting.user && <div>
      <div className='secHeader'>
    <h1>To Do List: {incomplete} items pending</h1>
    </div>
      <h3>{setting.user.username}</h3>
      {/* <Header incomplete={incomplete}/> */}
      <div className='main'>
      {setting.can('add') && <form onSubmit={handleSubmit}>

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
      </form>}
      <List list={myList} setting={setting} setList={setMyList} />
    </div>
    </div>}
    {!setting.user &&<div>
      <h2>You have to login to see content</h2>
      <a href='/signin'>Click here to signin</a>
      <a href='/signup'>Click here to create an account</a>
    </div>}
    </div>}
    {isLoading && <p>Loading Items...</p>}
    {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
    
    </>
  )
};

export default ToDo;
