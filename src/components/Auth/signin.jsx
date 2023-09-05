import React, { useContext } from 'react'
import {useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import {SettingContext}from '../../context/Setting'

function signin() {
    const settings = useContext(SettingContext)

    const API_URL = 'http://localhost:3500/users'
    const [users, setUsers] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [userpassword, setUserpassword] = useState('');
    
    const navigate = useNavigate();
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
        setTimeout(() => fetchUsers(), 500);
    },[])

        const authUser = async (username,password) => {
            setFetchError(null)
            users.map(user=>{
                if(user.username == username){
                    if(user.password==password){
                        settings.setUser(user)
                        cookie.save('user',user)
                        navigate('/')
                    }
                }
            })
        }
        
          const handleSubmit = (e) => {
            e.preventDefault()
            authUser(username,userpassword);
            setUsername('');
            setUserpassword('');
          }
      
  return (
    <div>
      {!isLoading&&<form className='signin' onSubmit={handleSubmit}>
            <h2>Sign in</h2>
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
            
            <button
                type='submit'
                onClick={() => handleSubmit}
            >
                login
            </button>
            <p>Don't have an account <a href='/signup'>Signup</a></p>
        </form>}
      {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
    </div>
  )
}

export default signin
