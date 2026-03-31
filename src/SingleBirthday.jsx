import React from "react";

const SingleBirthday = ({ id, name, age, image }) => {
  return (
    <>
      <div className="flex justify-between items-center my-5 ">
        <div className="flex items-center gap-3">
          <div>
            <img className="w-20 h-20 rounded-full" src={image} />
          </div>
          <div className="flex flex-col items-baseline">
            <h1 className="font-semibold text-xl">{name}</h1>
            <p>{age} years old</p>
          </div>
        </div>

        <div>
          <button className="bg-red-500 rounded-2xl text-white p-3">
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleBirthday;
