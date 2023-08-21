import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Card = ({ imageSrc, name, description }) => {
  return (
    <div className="max-w-md  bg-[#F9ECD2] pt-5 rounded-lg bor overflow-hidde  ">
      <img
        className="w-[150px] h-[150px] rounded-full ring-4  m-auto right-4"
        src={imageSrc}
        alt={name}
      />
      <div className="px-6 py-3">
        <div className="font-bold text-blue text-center text-base mb-2">
          {name}
        </div>
        <p className="font-bold text-[#605555] text-sm text-center">
          {description}
        </p>
      </div>
      <div className="flex m-auto text-center ml-2 px-6 pb-9">
        <span className="mr-2">
          <a href="#">
            <FaTwitter className="text-blue mx-2   text-xl ring-2 ring-blue rounded-3xl ring-offset-2 " />
          </a>
        </span>
        <span className="mr-2">
          <a href="#">
            <FaGithub className="text-blue mx-2   text-xl ring-2 ring-blue rounded-3xl ring-offset-2 " />
          </a>
        </span>
        <span className="mr-2">
          <a href="#">
            <FaFacebook className="text-blue  mx-2  text-xl ring-2 ring-blue rounded-3xl ring-offset-2 " />
          </a>
        </span>
        <span className="mr-2">
          <a href="#">
            <FaLinkedin className="text-blue mx-2   text-xl ring-2 ring-blue rounded-3xl ring-offset-2 " />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Card;
