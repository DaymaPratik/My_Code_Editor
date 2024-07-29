import Cookies from 'js-cookie';
import '../../index.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext/UserContextProvider';
import SideBar from '../../Components/SideBar/SideBar';
import QuoteCard from '../../Components/QutoeCard/Quote';
import { Link} from "react-router-dom";
function Home() {
  const {openNavSidebar,userDetails}=useContext(UserContext);
  const [quote,setQuote]=useState([{
    quote:"Code is like humor. When you have to explain it, it’s bad.",
    author:"Cory House"
},
{
    quote:"First, solve the problem. Then, write the code.",
    author:"John Johnson"
},
{
    quote:"Simplicity is the soul of efficiency.",
    author:"Austin Freeman"
},
{
    quote:"The only way to learn a new programming language is by writing programs in it.",
    author:"Dennis Ritchie"
},
{
    quote:"Debugging is like being the detective in a crime movie where you are also the murderer.",
    author:"Filipe Fortes"
},
{
    quote:"Code never lies, comments sometimes do.",
    author:"Ron Jeffries"
},
{
    quote:"In order to be irreplaceable, one must always be different.",
    author:"Jim Highsmith"
},
{
    quote:" Good code is its own best documentation.",
    author:"Steve McConnellE"
},]);
// const token=Cookies.get('token');
// console.log(token);
  return (
  <>
   {openNavSidebar && 
    <SideBar/>
     }


     {/* INTRO SECTION OF LANDING PAGE */}
   <main className=' relative background bg-fixed min-h-[65vh] min-[400px]:min-h-[70vh] min-[600px]:min-h-[100vh] min-w-screen bg-no-repeat bg-cover bg-center 
  bg-[url("../../../public/HomePage(4).jpg")]'
   >
    <div className='absolute flex items-center max-[768px]:justify-center min-[768px]:pl-[50px] min-[1024px]:pl-[100px] h-[100%] w-[100%] bg-gradient-to-r from-[#000000] to-[#00000061] '>
      <section className=' w-[95%] min-[600px]:w-[90%] min-[768px]:w-[80%] min-[1256px]:w-[60%]  shadow-[0px_0px_10px_0px_#ff0000] p-2 min-[600px]:p-5 rounded-lg'>
      <h1 className='border-b-2 border-[#fd3838] text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] 
      min-[1024px]:text-[45px] font-black bg-clip-text text-transparent bg-gradient-to-br 
       from-[#e3f483] from-[20%] via-[#ff0000d6] via-[60%] to-[#03fcd7] to-[20%]'>
        About Us:-
         </h1>
         <h2 className='text-[17px] min-[300px]:text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] font-black bg-clip-text text-transparent bg-gradient-to-br  from-[#cffff8] from-[20%] via-[#ff0000d6] via-[60%] to-[#cffff8] to-[20%]'>
          Our Code Editor provides the best coding online platform for the frontend development.
         </h2>
         <h3 className='text-[12px] min-[300px]:text-[15px] min-[400px]:text-[18px] min-[600px]:text-[23px] min-[768px]:text-[25px] min-[1024px]:text-[30px] font-bold 
         bg-clip-text text-transparent bg-gradient-to-tr from-[#cffff8]  via-[#007bff] to-[#cffff8]'>
        UNLEASH YOUR CREATIVITY WITH OUR STATE OF THE ART ONLINE CODE EDITOR</h3>
         <h2 className='text-[14px] min-[300px]:text-[17px] min-[400px]:text-[22px] min-[600px]:text-[25px] min-[768px]:text-[30px] min-[1024px]:text-[35px] font-black  bg-clip-text text-transparent bg-gradient-to-tr from-[#cffff8] from-[20%] via-[#ff0000d6] via-[60%] to-[#cffff8] to-[20%]'>
          Accelerate your frontend development with our efficient and versatile online code editor.</h2>
          <div className="button-box text-white my-4">
           {
            userDetails?.token
            ?
            <Link to={'/newProject'}><button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">Get Started</button></Link>
            :
            <>
            <Link to={'/auth'}><button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">Login</button></Link>
            <Link to={'/auth'}><button className="glow px-4 py-1 text-[15px] min-[600px]:text-[25px] rounded-md">Sign Up</button> </Link></>
           }
          </div>

      </section>
    </div>
   </main>



   {/* QUOTES SECTION OF LANDING PAGE */}
   <main className=' relative background bg-fixed min-h-[100vh]
    min-w-screen bg-no-repeat bg-cover bg-center 
  bg-[url("../../../public/HomePage(2).jpg")]
   '>
    <div className='bg-[#000000b8]'>
    <h1 className='text-center text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] 
     shadow-[0px_0px_10px_3px_#ff0000]
    font-black bg-clip-text text-transparent bg-gradient-to-br py-2 from-[#ffffff] from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%]'>
          Lets Get Motivated
    </h1>
    </div>
    <section className=' grid grid-cols-1 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3 text-[17px] min-[600px]:text-[20px] min-[1256px]:text-[25px] place-items-center  
    gap-5 justify-items-center p-5 min-[1256px]:p-10 h-fit min-h-[100vh] w-[100%] 
    bg-gradient-to-r from-[#000000] to-[#00000061] '>
       <QuoteCard quote={quote}/>
    </section>
   </main>

  

  </>
  )
}

export default Home