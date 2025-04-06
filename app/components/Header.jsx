import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";

export default function Header(){
    const menulist = [
        {
            name:"Home",
            link:"/",
        },
        {
            name:"About",
            link:"/about-us",
        },
        {
            name:"Contact",
            link:"/contact-us",
        },
    ];
    return(
       <nav className="sticky top-0 z-50 bg-white bg-opacity-65 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
          <Link href={"/"}>
                  <img className="h-4 md:h-8" src="/logo.png" alt="Snapify Logo" />
          </Link>
          <div className="hidden md:flex gap-2 items-center font-semibold">
            {menulist?.map((item) =>{
              return(
               <Link href={item?.link}>
                  <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-100">{item?.name}</button>
               </Link>
              );
            })}
          </div>
          {/* <Link href={"/login"}>
            <button className="bg-blue-600 px-5 font-bold py-2 rounded-full text-white">
                Login
            </button>
          </Link> */}
          <div className="flex items-center gap-1">
              <AuthContextProvider>
                 <AdminButton />
              </AuthContextProvider>
              <Link href={`/search`}>
                 <button 
                  title="Search"
                  className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100">
                    <Search size={14}/>
                 </button>
              </Link>
              <AuthContextProvider>
                  <HeaderClientButtons />
              </AuthContextProvider>
              <Link href={`/account`}>
                 <button 
                  title="Account"
                  className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100">
                    <UserCircle2 size={14}/>
                 </button>
              </Link>
              <AuthContextProvider>
                 <LogoutButton />
              </AuthContextProvider>
          </div>
       </nav>
    );
}