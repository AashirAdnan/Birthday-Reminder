import React, { useState } from "react";
import SingleBirthday from "./SingleBirthday";
import { bdays } from "./bdays";

const BirthdayReminder = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="shadow-xl p-5 mx-auto shadow-grey-300 text-center xl:w-2/5 md:w-2/7 sm:w-2/9 flex flex-col gap-6 ">
        <div>
          <h1 className="text-5xl">5 Birthday reminders</h1>
        </div>
        <div>
          {bdays.slice(0, show ? bdays.length : 5).map((item, index) => {
            return <SingleBirthday {...item} key={item.id} />;
          })}
          <button
            onClick={() => setShow(!show)}
            className="p-3 bg-blue-500 block ms-auto rounded-2xl w-[20%] cursor-pointer "
          >
            {show ? "Show Less" : "Show More"}
          </button>
        </div>

        <button className="bg-red-500 rounded-2xl text-white p-3">
          Remove All
        </button>
      </div>
    </>
  );
};

export default BirthdayReminder;
