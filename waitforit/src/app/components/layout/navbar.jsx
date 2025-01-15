// //navigation bar


"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0.1) {
        setVisible(true); // Hide when close to the top
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed  w-2/5 bg-white p-4 shadow-md z-50 transition-transform duration-300 rounded-lg ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center mx-auto text-gray-800">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">WaitForIt.io</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button className="text-white bg-gray-800">Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button className="text-white bg-gray-800">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="text-white bg-gray-800">Signup</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
