import React, { createContext, useState } from 'react'
 
export const ProjectsContext=createContext([]);
function ProjectsContextProvider({children}) {
    const [projectsArray,setProjectsArray]=useState([]);
    const [editTableProject,setEditTableProject]=useState({});
    const [edit,setEdit]=useState(false);
  return (
   <ProjectsContext.Provider value={{projectsArray,setProjectsArray,editTableProject,setEditTableProject,edit,setEdit}}>
    {children}
   </ProjectsContext.Provider>
  )
}

export default ProjectsContextProvider