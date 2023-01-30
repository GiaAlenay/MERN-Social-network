import {Route,Navigate,Routes,BrowserRouter} from 'react-router-dom'
import { HomePage } from 'scenes/HomePage';
import { LoginPage } from 'scenes/LoginPage';
import { Profile } from 'scenes/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
