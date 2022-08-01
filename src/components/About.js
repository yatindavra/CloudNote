import React,{useContext,useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

function About() {
 const a = useContext(NoteContext)
 useEffect(() => {
   a.update();
   // eslint-disable-next-line
 }, [])
 
  return (
    <div>
            This is About {a.state.name} and {a.state.class}
        </div>
  )
}

export default About
