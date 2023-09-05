import React, { useContext, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import {SettingContext} from '../../context/Setting';

export default function settingsForm() {
    const [showupdated,setShowupdated] = useState(false)
    const settings = useContext(SettingContext)
    const handleChange= (e)=>{
        settings.setHideCompleted(e.target.checked)
        setShowupdated(false)
    }
    const itemsHandle= (e)=>{
        settings.setDisplay(e.target.value)
        setShowupdated(false)
    }
    const sortHandle= (e)=>{
        settings.setSort(e.target.value)
        setShowupdated(false)
    }
   
    useEffect(()=>{
            let toSave = JSON.stringify(settings)
            localStorage.setItem("state", toSave);
    },[settings])
  return (
    <>
    {settings.user && <div>
    <div className='secHeader'>
        <h1>Manage Settings</h1>
    </div>
    <div className='settings'>
        <div className='settingsForm'>
        <h2>Change Settings</h2>
         <FormControl>
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch checked={settings.hideCompleted} onChange={handleChange} name="" />
                }
                label="hide completed"
            />
            <label>Item Per page</label>
            <input type="number" name="items" onChange={itemsHandle}/>
            <label>Sort Keywords</label>
            <input type="text" name="sort" onChange={sortHandle}/>
            <Button onClick={()=>{setShowupdated(true)}} variant="contained">Show New Settings</Button>
            </FormGroup>
            </FormControl>
            </div>
            <div>
            {showupdated&&<div className='settingsResults'>
                <h2>Updated Settings</h2>
                <p>Hide Completed: {settings.hideCompleted?'True':'False'}</p>
                <p>Items Per Page: {settings.display}</p>
                <p>Sort Keyword: {settings.sort}</p>
            </div>}
            </div>
    </div>
    </div>}
    </>
  )
}
