import Cookies from "js-cookie";
import "../../index.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import SideBar from "../../Components/SideBar/SideBar";
import { Link } from "react-router-dom";
import QuoteBox from "../../Components/QuoteBox/QuoteBox";
import TestimonialCard from "../../Components/TestimonialCard/TestimonialCard";
import WhyUsCard from "../../Components/WhyUsCard/WhyUsCard";
import HashLoader from "react-spinners/HashLoader";
function Home() {
  const { openNavSidebar, userDetails } = useContext(UserContext);
  const [whyUsArray, setWhyUsArray] = useState([
    {
      title: "User-Friendly Interface",
      para: "Our web app is designed with simplicity in mind, making it easy for beginners and experienced developers alike to get started quickly. The intuitive interface ensures you can focus on coding without distractions.",
    },
    {
      title: "Real-Time Preview",
      para: "See the results of your code instantly with our real-time preview feature. No need to switch tabs or refresh the page for your results,as you type it reguraly update the UI as well.",
    },
    {
      title: "Secure and Reliable",
      para: "We prioritize your security and privacy. Our web app is built with robust security measures to protect your data and provide a reliable coding environment.",
    },
    {
      title: "Syntax Highlighting",
      para: "Enhance your coding experience with syntax highlighting for HTML, CSS, and JavaScript. Easily identify different elements, attributes, and properties to improve readability and reduce errors.",
    },
    {
      title: "Continuous Improvement",
      para: "We're committed to continuously improving our web app based on user feedback. Expect regular updates with new features, enhancements, and bug fixes to ensure the best possible coding experience.",
    },
  ]);
  const [canAddTest, setCanAddTest] = useState(false);
  const [required, setRequired] = useState(false);
  const [testArray, setTestArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testObj, setTestObj] = useState({
    userName: userDetails.name || "",
    role: "",
    description: "",
  });

  useEffect(() => {
    const getAllTestimonials = async () => {
      const response = await fetch(
        "http://localhost:10000/api/getTestinomials",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data.testinomials);
      setTestArray(data.testinomials);
    };
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => getAllTestimonials();
  }, []);
  const handleChangeFunction = (e) => {
    const { name, value } = e.target;
    setTestObj({
      ...testObj,
      [name]: value,
    });
  };
  const createTestinomialFunction = async (e) => {
    e.preventDefault();
    const response = await fetch("https://my-code-editor.onrender.com/api/addTestinomial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(testObj),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Please all the required feilds") {
      setRequired(true);
      return;
    }
    setCanAddTest(false);
    window.location.reload();
  };

  // const token=Cookies.get('token');
  // console.log(token);
  return (
    <>
      {openNavSidebar && <SideBar />}
      {loading ? (
        <div className="h-[90vh] w-full bg-black flex justify-center items-center">
          <HashLoader color="#ff0101" />
        </div>
      ) : (
        <>
          {/* INTRO SECTION OF LANDING PAGE */}
          <main
            className='relative bg-fixed h-fit min-w-screen bg-no-repeat bg-cover bg-center  
  bg-[url("../../../HomePage(4).jpg")]'
          >
            <div
              className=" flex items-center max-[768px]:justify-center min-[768px]:pl-[50px] min-[1024px]:pl-[100px] py-[100px] h-full bg-gradient-to-r
     from-[#000000] to-[#00000061] "
            >
              <section className=" w-[95%] min-[600px]:w-[90%] min-[768px]:w-[80%] min-[1256px]:w-[60%]  h-fit shadow-[0px_0px_10px_0px_#ff0000] p-2 min-[600px]:p-5 rounded-lg">
                <h1
                  className="border-b-2 border-[#fd3838] text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] 
      min-[1024px]:text-[45px] font-black bg-clip-text text-transparent bg-gradient-to-br 
       from-[#e3f483] from-[20%] via-[#ff0000d6] via-[60%] to-[#03fcd7] to-[20%]"
                >
                  About Us:-
                </h1>
                <h2
                  className="text-[17px] min-[300px]:text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] font-black bg-clip-text text-transparent bg-gradient-to-br  from-[#cffff8] from-[20%]
             via-[#ff0000d6] via-[60%] to-[#cffff8] to-[20%]"
                >
                  Our Code Editor provides the best coding online platform for
                  the frontend development.
                </h2>
                <h3
                  className="text-[12px] min-[300px]:text-[15px] min-[400px]:text-[18px] min-[600px]:text-[23px] min-[768px]:text-[25px] min-[1024px]:text-[30px] font-bold 
         bg-clip-text text-transparent bg-gradient-to-tr from-[#cffff8]  via-[#007bff] to-[#cffff8]"
                >
                  UNLEASH YOUR CREATIVITY WITH OUR STATE OF THE ART ONLINE CODE
                  EDITOR
                </h3>
                <h2
                  className="text-[14px] min-[300px]:text-[17px] min-[400px]:text-[22px] min-[600px]:text-[25px] min-[768px]:text-[30px] min-[1024px]:text-[35px] font-black  bg-clip-text text-transparent bg-gradient-to-tr from-[#cffff8] from-[20%]
             via-[#ff0000d6] via-[60%] to-[#cffff8] to-[20%]"
                >
                  Accelerate your frontend development with our efficient and
                  versatile online code editor.
                </h2>
                <div className="button-box text-white my-4">
                  {userDetails?.token ? (
                    <Link to={"/newProject"}>
                      <button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">
                        Get Started
                      </button>
                    </Link>
                  ) : (
                    <>
                      <Link to={"/auth"}>
                        <button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">
                          Login
                        </button>
                      </Link>
                      <Link to={"/auth"}>
                        <button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">
                          Sign Up
                        </button>{" "}
                      </Link>
                    </>
                  )}
                </div>
              </section>
            </div>
          </main>

          {/* WHY US SECTION */}
          <main
            className='relative bg-fixed h-fit min-w-screen bg-no-repeat bg-cover bg-center  
  bg-[url("../../../WhyUsBackground.jpg")]'
          >
            <div className="bg-[#000000ae]">
              <h1
                className="text-center py-2 text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] 
     shadow-[0px_0px_10px_3px_#ff0000] font-black bg-clip-text text-transparent  bg-gradient-to-br 2
      from-[#ffffff] from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%]"
              >
                Why Us
              </h1>
              <section
                className="flex flex-wrap items-center justify-center text-[17px] min-[600px]:text-[20px] min-[1256px]:text-[25px]        
                   gap-10  p-5 min-[1256px]:p-10 h-fit min-h-[100vh] w-[100%] 
    bg-[#00000029] "
              >
                {whyUsArray.map((item, idx) => {
                  return <WhyUsCard key={idx} item={item} />;
                })}
              </section>
            </div>
          </main>

          {/* QUOTES SECTION OF LANDING PAGE */}
          <main
            className='relative background bg-fixed min-h-[100vh] min-w-screen bg-no-repeat bg-cover bg-center 
              bg-[url("../../../HomePage(2).jpg")]
   '
          >
            <QuoteBox />
          </main>

          {/* TESTINOMIALS OF THE USERS */}
          <main
            className={`relative  bg-fixed min-h-[100vh] min-w-screen bg-no-repeat bg-cover bg-center  py-5 pb-10 bg-[url("../../../MultiColorLaptop.jpg")]`}
          >
            {canAddTest ? (
              <>
                <div className="bg-[rgba(255,248,248,0.15)] absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white p-8 rounded-lg shadow-[0px_0px_10px_0px_red] w-full px-10  mx-auto max-w-sm backdrop-blur-[7px]">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Testinomial
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label className="block  mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="userName"
                        value={testObj.userName || ""}
                        onChange={handleChangeFunction}
                        className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
          focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block  mb-2" htmlFor="role">
                        Role
                      </label>
                      <input
                        required
                        type="text"
                        id="role"
                        name="role"
                        value={testObj.role || ""}
                        onChange={handleChangeFunction}
                        className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
          focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block  mb-2" htmlFor="desc">
                        Description
                      </label>
                      <input
                        required
                        type="text"
                        id="desc"
                        name="description"
                        value={testObj.description || ""}
                        onChange={handleChangeFunction}
                        className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
          focus:outline-none focus:border-red-500"
                      />
                    </div>
                    {required && (
                      <p className="my-2 text-center font-bold text-[20px] text-[#00f8ff]">
                        All fields are required
                      </p>
                    )}

                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-[rgb(255,0,0)] border-2 border-red-500 transition duration-150 ease-in px-3 py-1 hover:bg-transparent  text-[20px] 
                rounded-md w-[70%] block"
                        onClick={createTestinomialFunction}
                      >
                        Add
                      </button>
                      <button
                        className="bg-[rgb(255,0,0)] border-2 border-red-500 transition duration-150 ease-in px-3 py-1 hover:bg-transparent  text-[20px] 
                rounded-md w-[70%] block"
                        onClick={() => {
                          setCanAddTest(!canAddTest);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="bg-[#0000007f]">
                <h1
                  className="text-center py-2 text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] 
                  shadow-[0px_0px_10px_3px_#ff0000] font-black bg-clip-text text-transparent  bg-gradient-to-br 2 from-[#ffffff] from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%]"
                >
                  User's Experience
                </h1>
                <section
                  className={`grid grid-cols-1 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3 text-[17px] min-[600px]:text-[20px] min-[1256px]:text-[25px] place-items-center  
    gap-5 justify-items-center p-5 min-[1256px]:p-10 h-fit min-h-[100vh] w-[100%] bg-[#00000029]
    `}
                >
                  {testArray.length !== 0 ? (
                    testArray.map((item, idx) => {
                      return <TestimonialCard item={item} key={item._id} />;
                    })
                  ) : (
                    <div>
                      <h3
                        className="w-[100%] py-2 px-5 text-red-500 text-center  shadow-[0px_0px_10px_0px_#ff0000] text-[30px]
               font-semibold my-5"
                      >
                        Seems like we don't have a testinomials yet ...
                      </h3>
                    </div>
                  )}
                </section>
                {userDetails?.token && (
                  <div className="py-3 text-center">
                    <button
                      className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md"
                      onClick={() => {
                        setCanAddTest(true);
                      }}
                    >
                      Add Your Experience
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default Home;
