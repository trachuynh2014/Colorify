"use client";

import React, { useState } from "react";
import Loading from "@/components/loading";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Home() {
  const [companyName, setCompanyName] = useState("Twitter");
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([
    "#1DA1F2",
    "#14171A",
    "#657786",
    "#AAB8C2",
    "#E1E8ED",
    "#F5F8FA",
  ]); // Twitter default

  const callChatGPT = () => {
    setLoading(true);

    axios
      .post("/api/call-gpt", { companyName })
      .then((res) => {
        setColors(res.data);
        toast.success("Succeed!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Something went wrong!");
      });
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success("Color copied to clipboard!");
  };

  return (
    <>
      <main>
        <div className="fixed top-20 lg:top-10 left-1/2 -translate-x-1/2">
          <div className="h-12 w-full rounded-md bg-gradient-to-r from-[#C6FFDD] via-[#FBD786] to-[#f7797d] p-1">
            <div className="relative">
              <input
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                className="py-2 px-4 pr-[4.5rem] w-80 lg:w-96 focus:outline-none rounded"
                placeholder="Company name (or anything you want to know its color palette) (e.g. Twitter)"
                onKeyDown={(e) => (e.key === "Enter" ? callChatGPT() : null)}
              />
              <kbd
                className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg"
                onClick={() => callChatGPT()}
              >
                Enter
              </kbd>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        ) : (
          <div
            className="grid justify-between w-screen h-screen"
            style={{
              gridTemplateColumns: `repeat(${colors.length}, minmax(0, 1fr))`,
            }}
          >
            {colors.map((color) => (
              <div
                className="h-screen flex justify-center items-center"
                style={{ backgroundColor: color }}
                key={color}
              >
                <div
                  onClick={() => copyColorToClipboard(color)}
                  className="flex items-center px-4 py-2 bg-slate-800 bg-opacity-50 cursor-pointer rotate-90 md:rotate-0"
                >
                  <svg
                    className="mr-3 fill-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                  <span className="text-white">{color}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
