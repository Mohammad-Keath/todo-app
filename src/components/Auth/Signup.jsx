import React from 'react'
import {useState,useEffect } from 'react';
import apiReq from './apiReq';

function Signup() {
    const API_URL = 'http://localhost:3500/users'
    const [users, setUsers] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [userrole, setUserrole] = useState('user');
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Did not receive expected data');
            const usersList = await response.json();
            setUsers(usersList);
            setFetchError(null);
          } catch (err) {
            setFetchError(err.message);
          } finally {
            setIsLoading(false);
          }
        }
        setTimeout(() => fetchUsers(), 2000);
    },[])

        const addUser = async (username,password,userrole) => {
            setFetchError(null)
            const id = users.length ? users.length+1 : 1;
            let capabilities 
            if(userrole === "admin"){
              capabilities = ["read","edit","delete","add"]
            }else{ capabilities = ["read"]}
            const myNewUser = { "id":id, "username":username,"password":password,"role":userrole,"capabilities":capabilities };
            console.log(username,password)
            const usersList = [...users, myNewUser];
            setUsers(usersList);
        
            const postOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(myNewUser)
            }
            const result = await apiReq(API_URL, postOptions);
            if (result) setFetchError(result);
        }
        
          const handleSubmit = (e) => {
            addUser(username,userpassword,userrole);
            setUsername('');
            setUserpassword('');
            setUserrole('user')
          }
      
  return (
    <div>
      {!isLoading&&<form className='signup' onSubmit={handleSubmit}>
            <label>username</label>
            <input
                autoFocus
                id='username'
                type='text'
                placeholder='username'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label >password</label>
            <input
                autoFocus
                id='password'
                type='password'
                placeholder='password'
                required
                value={userpassword}
                onChange={(e) => setUserpassword(e.target.value)}
            />
            <label>role</label>
            <select defaultValue='user' name='role' onChange={(e)=>{setUserrole(e.target.value)}}>
                    <option value='admin'>admin</option>
                    <option  value='user'>user</option>
            </select>
            <button
                type='submit'
                onClick={() => handleSubmit}
            >
                sign up
            </button>
        </form>}
      {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
    </div>
  )
}

export default Signup