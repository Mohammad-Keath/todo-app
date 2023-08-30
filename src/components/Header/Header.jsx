import React from 'react'
import { AiFillHome,AiFillSetting } from 'react-icons/ai';

export default function header() {
  return (
    <header>
    <a href='/'><AiFillHome/></a>
    <a href='/setting'><AiFillSetting/></a>
    </header>
  )
}
