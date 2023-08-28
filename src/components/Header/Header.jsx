import React from 'react'

export default function header({incomplete}) {
  return (
    <header>
    <h1>To Do List: {incomplete} items pending</h1>
    </header>
  )
}
