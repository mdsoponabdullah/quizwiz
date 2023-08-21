import React from "react";
import Link from "next/link";

const Btn = (props) => {
  return (
    <div>
      <Link className="btn-blue" href={props.url}>
        {props.title}
      </Link>
      <button className=""></button>
    </div>
  );
};

export default Btn;
