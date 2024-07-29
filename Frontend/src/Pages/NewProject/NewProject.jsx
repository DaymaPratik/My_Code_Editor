import React, { useContext, useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import { useNavigate, Link } from "react-router-dom";
import { GiSplitCross } from "react-icons/gi";
import { ImHtmlFive2 } from "react-icons/im";
import { FaCss3Alt } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
import HashLoader from "react-spinners/HashLoader";
import { ProjectsContext } from "../../Context/ProjectsContextProvider";
import SideBar from "../../Components/SideBar/SideBar";
const defaultTopLayout = [30, 30, 30];
const onBottomLayoutChange = (layout) => {
  // console.log('Bottom layout changed:', layout);
};

function NewProject() {
  const { openNavSidebar, setOpenNavSidebar, userDetails, logout, setIsLogin } =
    useContext(UserContext);
  const {setEditTableProject,editTableProject,edit,setEdit}=useContext(ProjectsContext);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [allRequired, setAllRequired] = useState(false);
  const [showHtml, setShowHtml] = useState(true);
  const [showCss, setShowCss] = useState(false);
  const [showJs, setShowJs] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const setIsLoginTrue = () => {
    setIsLogin(true);
  };
  const setIsLoginFalse = () => {
    setIsLogin(false);
  };

  const toggleTitleEditFuncton = () => {
    setCanEditTitle(!canEditTitle);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setHtml(editTableProject?.html || "");
    setCss(editTableProject?.css || "");
    setJs(editTableProject?.js || "");
    setTitle(editTableProject?.title || "Untitled");
   
  }, []);

  useEffect(() => {
    updateOpFunction();
    setEditTableProject({
      _id:editTableProject._id,
      name:editTableProject.name,
      userId:editTableProject.userId,
      title,
      html,
      css,
      js,
      output,
      })
  }, [html, css, js,output,title]);

  const updateOpFunction = () => {
    const finalOp = `
  <html>
  <head>
  <style>${css}</style>
  </head>
  <body>
      ${html}
      <script>${js}</script>
  <body>
  </html>
  `;
    setOutput(finalOp);
    setEditTableProject({output:finalOp,...editTableProject})
  };

  const saveProjectFunction = async (e) => {
    e.preventDefault();
    if (!userDetails.token) {
      setIsUserLoggedIn(false);
      return;
    }
    try {
      const response = await fetch("https://my-code-editor.onrender.com/api/newProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: userDetails.name,
          userId: userDetails._id,
          title,
          html,
          css,
          js,
          output,
        }),
      });
      const data = await response.json();
      if (data.message === "All fields of project must be required") {
        setAllRequired(true);
        return;
      }
      navigate("/allProjects");
    } catch (error) {
      console.log("error in frontend while creating new project");
    }
  };

  const editProjectFunction=async ()=>{
    try {
      const response=await fetch('http://localhost:10000/api/saveEditProject',{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:'include',
        body:JSON.stringify(editTableProject),
      })
      const data=await response.json();
      setEditTableProject({});
      setEdit(false);
      navigate('/allProjects');
    } catch (error) {
      console.log("Error in frontend While saving a edited project",error);
    }
  
  }
  return (
    <>
      {openNavSidebar && (
         <SideBar/>
      )}
      {loading ? (
        <div className="h-[90vh] w-full bg-black flex justify-center items-center">
          <HashLoader color="#ff0101" />
        </div>
      ) : (
        <div className="bg-[#000000e5] text-white">
          {/* header of the new project page which shows title and save button */}
          <header className="shadow-[0px_0px_10px_0px_red] mb-3 w-[100%] py-2 px-2  min-[600px]:px-5 flex justify-between items-center">
            <div className="flex gap-1 min-[600px]:gap-3 justify-center items-center ">
              {canEditTitle ? (
                <input
                  type="text"
                  className=" bg-[#ff1c1c75]  rounded-lg 
                  focus:outline-none focus:border-red-500 w-[150px] min-[600px]:w-[200px] py-1 px-2 text-[15px] min-[600px]:text-[24px]"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              ) : (
                <h3 className="font-bold text-[15px] min-[600px]:text-[25px] underline underline-offset-2">
                  {title}
                </h3>
              )}
              <button
                className="bg-[rgba(239,12,12,0.87)] transtition max-[600px]:text-[12px] block duration-100 ease-in rounded-md hover:bg-[rgba(253,252,252,0.61)] px-1 min-[600px]:px-3 py-2"
                onClick={toggleTitleEditFuncton}
              >
                {canEditTitle ? "Save Title" : "Edit title"}
              </button>
            </div>
            <div>
              {edit
              ?
              <button
                className="bg-[rgba(239,12,12,0.87)] block  max-[600px]:text-[12px] transtition duration-100 ease-in rounded-md
                          hover:bg-[rgba(0,0,0,0.61)] px-1 min-[600px]:px-3 py-2"
                onClick={editProjectFunction}
              >
               Edit & Save Project
              </button>
              :
              <button
                className="bg-[rgba(239,12,12,0.87)] block transtition duration-100 ease-in rounded-md
                          hover:bg-[rgba(0,0,0,0.61)] px-1  max-[600px]:text-[12px] min-[600px]:px-3 py-2"
                onClick={saveProjectFunction}
              >
                Save Project
              </button>
              }
            </div>
          </header>

          {/* Conditional to check whether user is login or not */}
          {!isUserLoggedIn && (
            <div className="py-[25px] relative w-fit mx-auto text-red-500 px-[15px] min-[400px]:px-[30px] my-3 rounded-lg shadow-[0px_0px_7px_0px_red] text-[18px] min-[400px]:text-[25px] 
            min-[600px]:text-[35px] text-center">
              Please login or Sign Up
              <div
                className="text-[25px] text-red-500 font-bold absolute top-1 right-1  cursor-pointer"
                onClick={() => {
                  setIsUserLoggedIn(!isUserLoggedIn);
                }}
              >
                <GiSplitCross />
              </div>
            </div>
          )}
          {/* Conditional to check whether not an empty project is saved */}
          {allRequired && (
            <div
              className="py-[25px] relative w-fit mx-auto my-3 rounded-lg shadow-[0px_0px_7px_0px_red] px-[15px] min-[768px]:px-[20px] min-[1024px]:px-[30px] 
                text-[15px] max-[400px]:font-semibold min-[400px]:text-[20px] min-[768px]:text-[28px] min-[1024px]:text-[35px] text-center text-red-500"
            >
              Sorry can't save an Empty Project...
              <div
                className="text-[20px] min-[400px]:text-[25px] font-bold absolute top-[4px] right-1 text-red-500 cursor-pointer"
                onClick={() => {
                  setAllRequired(!allRequired);
                }}
              >
                <GiSplitCross />
              </div>
            </div>
          )}
          {/* Large Screen Code Editor */}
          <main className="max-[768px]:hidden w-[96vw] mx-auto h-[80vh] overflow-x-hidden">
            <PanelGroup direction="horizontal" onLayout={onBottomLayoutChange}>
              <Panel
                className=""
                defaultSize={defaultTopLayout[0]}
                minSize={8}
              >
                <section className="h-full w-full border-2 border-black flex flex-col justify-start items-start">
                  <div className="w-full bg-[black] flex justify-between items-center px-2 py-2">
                    <h2 className="text-[20px]">HTML</h2>
                    <ImHtmlFive2 className="text-[30px]" />
                  </div>
                  <div className="w-full ">
                    <CodeMirror
                      value={html}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdadte) => {
                        setHtml(value);
                        
                      }}
                    />
                  </div>
                </section>
              </Panel>
              <PanelResizeHandle className="mx-[4px] w-1 bg-red-500" />
              <Panel
                className=""
                defaultSize={defaultTopLayout[1]}
                minSize={8}
              >
                <section className="h-full w-full border-2 border-black flex flex-col justify-start items-start">
                  <div className="w-full bg-[black] flex justify-between items-center px-2 py-2">
                    <h2 className="text-[20px]">CSS</h2>
                    <FaCss3Alt className="text-[30px]" />
                  </div>
                  <div className=" w-full ">
                    <CodeMirror
                      value={css}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdadte) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </section>
              </Panel>

              <PanelResizeHandle className="mx-[4px] w-1 bg-red-500" />
              <Panel
                className=""
                defaultSize={defaultTopLayout[2]}
                minSize={8}
              >
                <section className="h-full w-full border-2 border-black flex flex-col justify-start items-start">
                  <div className="w-full bg-[black] flex justify-between items-center px-2 py-2">
                    <h2 className="text-[20px]">JS</h2>
                    <SiJavascript className="text-[30px]" />
                  </div>
                  <div className="w-full ">
                    <CodeMirror
                      value={js}
                      height="600px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdadte) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </section>
                l
              </Panel>
            </PanelGroup>
          </main>

          {/* Small Screen Code Editor */}
          <main className="min-[768px]:hidden overflow-x-hidden">
            <div className=" text-black  flex gap-2 mb-2 py-2 pl-3">
              <button
                className={` px-4 rounded-md py-2 ${
                  showHtml ? "bg-[rgba(239,12,12,0.87)]" : "bg-[#fffefedf]"
                }`}
                onClick={() => {
                  setShowHtml(true);
                  setShowCss(false);
                  setShowJs(false);
                }}
              >
                HTML
              </button>
              <button
                className={` px-4 py-2 rounded-md ${
                  showCss ? "bg-[rgba(239,12,12,0.87)]" : "bg-[#fffefedf]"
                }`}
                onClick={() => {
                  setShowHtml(false);
                  setShowCss(true);
                  setShowJs(false);
                }}
              >
                CSS
              </button>
              <button
                className={` px-4 py-2 rounded-md ${
                  showJs ? "bg-[rgba(239,12,12,0.87)]" : "bg-[#fffefedf]"
                }`}
                onClick={() => {
                  setShowHtml(false);
                  setShowCss(false);
                  setShowJs(true);
                }}
              >
                JS
              </button>
            </div>
            <div className="h-[400px]">
              {showHtml && (
                <div className="transition ease-in duration-150 ">
                  <CodeMirror
                    value={html}
                    height="100%"
                    theme={"dark"}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdadte) => {
                      setHtml(value);
                    }}
                  />
                </div>
              )}
              {showCss && (
                <div className="transition ease-in duration-150 ">
                  <CodeMirror
                    value={css}
                    height="100%"
                    theme={"dark"}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdadte) => {
                      setCss(value);
                    }}
                  />
                </div>
              )}
              {showJs && (
                <div className="transition ease-in duration-150 ">
                  <CodeMirror
                    value={js}
                    height="100%"
                    theme={"dark"}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdadte) => {
                      setJs(value);
                    }}
                  />
                </div>
              )}
            </div>
          </main>

          <section className="output-section min-h-[70vh]">
            <h1 className="text-[25px] min-[400px]:text-[30px] max-w-[100vw] font-semibold text-center text-red-500 py-2 shadow-[0px_0px_10px_0px_red] my-3">
              Output Section
            </h1>
            <iframe
              title="Result"
              srcDoc={output}
              className="bg-white p-0 w-full h-[60vh]"
            />
          </section>
        </div>
      )}
    </>
  );
}

export default NewProject;

