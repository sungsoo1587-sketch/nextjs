import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Step1 from "/src/steps/Step1";
import Step2 from "/src/steps/Step2";

import "/src/App.css";

const App = () => {

  return (
    //<>...</> = Fragment (불필요한 div 안 생김)
    <> 
      <Router>
        <div>
          <nav>
            <Link to="/step/1">Step1</Link> | <Link to="/step/2">Step2</Link>
          </nav>

          <Routes>
            <Route path="/step/1" element={<Step1 />} />
            <Route path="/step/2" element={<Step2 />} />
            <Route path="*" element={<Step1 />} />
          </Routes>
        </div>
      </Router>
      
      
    </>
    
    
    
  )
}

export default App