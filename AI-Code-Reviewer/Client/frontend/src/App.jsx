import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import './App.css'
import Editor from "react-simple-code-editor"

function App() {
 
  useEffect(()=>{
    prism.highlightAll()
  })
  const [code, setCode] = usestate()

  return (
    <>
     <main>
      <div className="left">
        <div className="code">
          <pre>
            <code className="language-javascript">
              {`function sum(){
              return 1 +1
              }`}

            </code>
          </pre>
        </div>
        <div className="review">
          Review
        </div>
      </div>

      <div className="right"></div>
     </main>
    </>
  )
}

export default App
