"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const Custom404 = () => {
  const { back } = useRouter()
  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center pt-20 pb-6 space-y-4 md:pt-10 md:px-10 md:mt-36 mx-auto mt-24 px-6">
        <Image src="/404.png" alt="Verified" width={370} height={370} />
        <p
          className="text-2xl font-semibold leading-9"
          style={{ color: "rgba(25, 216, 147, 1)" }}
        >
          Oops! Page Not Found
        </p>
        <p className="mb-2 text-[16px] w-[501px] font-normal leading-normal text-center md:px-4 md:w-full md:justify-center">
          It looks like this page is on a logistics adventure of its own. While
          we track it down, kindly return to homepage for a smoother journey.
        </p>
        <Button className="bg-transparent border-2 border-[#003471] text-[#003471] font-bold py-1.5 px-8 rounded text-base" onClick={() => back()}>
          Go Back
        </Button>
      </div>
    </>
  );
};

export default Custom404;
