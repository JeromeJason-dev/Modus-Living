import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className=" bg-white text-black grid grid-cols-1 md:grid-cols-3 px-10 py-15 gap-4 border-0 border-black">
      <div>
        <h3 className=" text-xl font-bold mb-4">Modus Living</h3>
        <p>The ultimate shopping experience for you</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className=" text-xl font-bold mb-1">Quick Links</h3>
        <ul>
          <li className="hover:text-blue-400">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-blue-400">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="hover:text-blue-400">
            <Link to={"/register"}>Register</Link>
          </li>
          <li className="hover:text-blue-400">
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className=" text-xl font-bold mb-4">Find us</h3>
        <p>
          <Mail size={16} /> 
          <span> modusliving@gmail.com</span>
        </p>

        <p>
          <Phone size={16} />
          <span>+254 712 345 678</span>
        </p>
        <p>
          <MapPin size={16} />
          <span>Nairobi, Kenya</span>
        </p>
      </div>
      <div className="md:col-span-3 border-t border-gray-700 mt-10 pt-6 text-center text-black dark:text-white">
        &copy; 2026 Modus Living. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
