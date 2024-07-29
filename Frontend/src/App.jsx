
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import NewProject from './Pages/NewProject/NewProject'
import Authentication from './Pages/Authentication/Authentication'
import UserContextProvider from './Context/UserContext/UserContextProvider'
import AllProjects from './Pages/AllProjects/AllProjects'
import ProjectsContextProvider from './Context/ProjectsContextProvider'
function App() {
 

  return (
    <BrowserRouter>
      <UserContextProvider>
     <ProjectsContextProvider>
     <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/newProject' element={<NewProject/>}/>
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/allProjects' element={<AllProjects/>}/>
       </Routes>
     </ProjectsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
