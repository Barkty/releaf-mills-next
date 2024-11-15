"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ menuOpen, setMenuOpen }) => {
    return (
        <div className="w-full z-20 flex item-center justify-center h-auto bg-transparent fixed top-20">
            <div className="w-[90%] bg-white flex text-white items-center justify-between px-3 md:px-20 py-6 rounded shadow-md shadow-[rgba(0,0,0,0.09)]">
                <Link href={"/"}>
                    <Image src="https://cdn.prod.website-files.com/6251e775eedaa714dd5d6662/6254941093ee02ec8e06a847_Releaf%20logo.svg" alt="Releaf Logo" width={120} height={50} />
                </Link>
                <div className="w-[160px] md:w-[160px] flex item-center">
                    <Button className='flex text-center bg-[#8FC54D] border-0 text-white text-md px-10 md:px-12 hover:bg-opacity-80 hover:transition-all duration-300' onClick={() => setMenuOpen(!menuOpen)}>
                        Add Dumpsite
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;