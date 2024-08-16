/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function Back({destination = "/"}) {
  return (
    <>
      <div className="flex ml-1">
        <Link to={destination} className="bg-sky-800 text-white px-4 py-1 rounded-[7px] w-fit">
            <BsArrowLeft className="text-2xl"/>
        </Link>
      </div>
    </>
  );
}

export default Back;
