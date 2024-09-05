import React from "react";

function WhyUsCard({ item }) {
  return (
    <div
      className="h-fit my-3  min-[600px]:min-h-[210px] min-[900px]:min-h-[240px] w-[95%] min-[400px]:w-[90%] min-[600px]:w-[230px] 
          min-[768px]:w-[300px] min-[1256px]:w-[350px] p-2  font-semibold  shadow-[0px_0px_10px_1px_#ff0000]
           hover:shadow-[0px_0px_7px_0px_#ffffff] transition ease-in rounded-md duration-150
           hover:scale-105 hover:bg-[#661fe270] bg-[#0e0e0e8e]"
    >
      <h1
        className="font-extrabold bg-clip-text text-[15px] min-[900px]:text-[18px] text-transparent bg-gradient-to-tr 
          from-[#cffff8]  via-[#007bff] to-[#cffff8] text-center"
      >
        {item.title}
      </h1>
      <p
        className="bg-clip-text text-[14px] min-[900px]:text-[17px] font-semibold text-transparent bg-gradient-to-br py-2 from-[#ffffff] 
        from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%] px-4  text-center"
      >
        {item.para}
      </p>
    </div>
  );
}

export default WhyUsCard;
