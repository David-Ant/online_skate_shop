import "~/styles/globals.css";

import Link from 'next/link';

import { HiOutlineShoppingCart } from "react-icons/hi";
import { SearchWithButton } from "./SearchButton";
import SignInButton from "./SignInButton";
import { AnimatedButton } from "./AnimatedButton";
import { auth } from "~/server/auth";

export async function TopNav() {
    
    const session = await auth();

    return (
        <header>
            <h1>
                <nav className="flex bg-[#202020] items-center justify-between w-full py-3 px-8 text-white font-semibold">
                    <Link href="/">
                        <button>
                            <img
                                src="https://utfs.io/f/db5e70c1-0bb8-4991-80d0-221eea24c410-wtex4j.png"
                                className="h-[100px] w-[100px]"
                            />
                        </button>
                    </Link>
                    <div className="flex gap-4">
                        <SignInButton />
                        <Link href="/shoppingCart">
                            <AnimatedButton>
                                <HiOutlineShoppingCart size={40} />
                            </AnimatedButton>
                        </Link>
                    </div>
                </nav>
            </h1>
            <h2>
                <nav className="flex relative bg-white text-black items-center justify-between w-full py-2 pl-[15%] pr-[5%] font-semibold shadow-md">
                    <nav className="flex bg-white text-black items-center w-1/2 font-semibold">
                        {/* If the user is an admin, show the admin panel link */}
                        {session?.user?.isAdmin && (
                            <Link className="option-divider" href="/adminPanel">
                                <button className="option-divider">Admin Panel</button>
                            </Link>
                        )}
                        <Link className="option-divider" href="/shopping/decks">
                            <button>Decks</button>
                        </Link>
                        <Link className="option-divider" href="/shopping/wheels">
                            <button>Wheels</button>
                        </Link>
                        <Link className="option-divider" href="/customSetup">
                            <button>Custom Setup</button>
                        </Link>
                    </nav>
                    <SearchWithButton />
                </nav>
            </h2>
        </header>
    )
}