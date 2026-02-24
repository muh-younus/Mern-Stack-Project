import React from 'react'
import CreatePost from './pages/CreatePost'
import Feedback from './pages/Feedback'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/feedback' element={<Feedback/>} />
        </Routes>
      </Router>

      
    </div>
  )
}

export default App
