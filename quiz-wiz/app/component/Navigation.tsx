import Link from "next/link";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Btn from "./btn";

const Navigation = () => {
  const { user, LogOut } = UserAuth();
  const [loding, setLoading] = useState(true);

  const logOuthandler = async () => {
    try {
      await LogOut();
    } catch (error) {}
  };

  //// page purapuri hoyar por user login/logout check korar jonno
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      console.log(user);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div style={{ paddingTop: "20px" }} className="px-14 flex-2 pt-6">
      <div className="float-left">
        <Link className="" href="/">
          <Image
            src="/logo.png"
            width={100}
            height={0}
            alt="Picture of the author"
          />
        </Link>
      </div>
      <div className="float-right">
        <ul className="flex  text-[#ffffff] space-x-4 space-y-0 ">
          <li className="">
            <Link className="btn-blue" href="#">
              contest
            </Link>
          </li>

          <li className="">
            <Link className="btn-blue" href="#">
              Create
            </Link>
          </li>
          <li>
            <Btn title="about" url="/pages/about" />
          </li>

          {loding ? null : user ? (
            <>
              <li>
                <span
                  onClick={logOuthandler}
                  className="btn-blue hover:cursor-pointer"
                >
                  logout
                </span>
              </li>
              <li>
                <Link className="" href="/pages/profile">
                  <div className="group relative">
                    <img
                      alt={`${user.displayName}'s Profile Photo`}
                      src={user.photoURL}
                      className="h-7 w-7 rounded-xl"
                      width={50}
                      height={50}
                    />
                    <div className="absolute w-20 top-8 -left-6 inset-x-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-opacity-50">
                      <p className="text-[#000000] text-lg text-sm ">
                        {user.displayName}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className="btn-blue" href="/pages/login">
                login
              </Link>
            </li>
          )}

          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
