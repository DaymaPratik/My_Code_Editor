function QuoteCard({quote}) {
   
  return (
  
        
        quote.map((item,idx)=>{
        return (
            <div key={idx} className='h-fit my-3 min-[600px]:min-h-[200px] w-[95%] min-[400px]:w-[90%] min-[600px]:w-[230px] min-[768px]:w-[300px] min-[1256px]:w-[350px] p-5  font-semibold  shadow-[0px_0px_10px_1px_#ff0000]'>
        <p className='bg-clip-text text-transparent bg-gradient-to-br py-2 from-[#ffffff] from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%]'>
          <q>{item.quote}</q></p>
        <p className='font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-[#cffff8]  via-[#007bff] to-[#cffff8]'>
          ~ {item.author}</p>
      </div>
        )
        })


  )
}

export default QuoteCard