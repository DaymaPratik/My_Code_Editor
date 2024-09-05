import React from "react";

const TestimonialCard = ({ item }) => {
  return (
    <div
      className="h-fit my-3 min-[600px]:min-h-[200px] w-[95%] min-[400px]:w-[90%] min-[600px]:w-[230px] 
            min-[768px]:w-[300px] min-[1256px]:w-[350px] p-2  font-semibold  shadow-[0px_0px_10px_1px_#ff0000]
             hover:shadow-[0px_0px_7px_0px_#ffffff] transition ease-in rounded-md duration-150
             hover:scale-105 hover:bg-[#661fe236] text-white"
    >
      <div className="flex items-center justify-start gap-4 px-5">
        <img
          className="block h-10 w-10 rounded-full"
          src="https://via.placeholder.com/150"
          alt={name}
        />
        <div>
          <p className="text-[20px] min-[900px]:text-[23px] leading-tight">
            {item.userName}
          </p>
          <p
            className="font-extrabold bg-clip-text text-[15px] min-[900px]:text-[18px] text-transparent bg-gradient-to-tr 
          from-[#cffff8]  via-[#007bff] to-[#cffff8]"
          >
            {item.role}
          </p>
        </div>
      </div>

      <p
        className="bg-clip-text text-[17px] min-[900px]:text-[20px] text-transparent bg-gradient-to-br py-2 from-[#ffffff] 
        from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%] px-4"
      >
        {item.description}
      </p>
    </div>
  );
};

export default TestimonialCard;
