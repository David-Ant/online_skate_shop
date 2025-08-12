import "~/styles/globals.css";

import Link from 'next/link';

import { HiOutlineShoppingCart } from "react-icons/hi";
import { SearchWithButton } from "./SearchButton";
import SignInButton from "./SignInButton";
import { AnimatedButton } from "./AnimatedButton";
import { auth } from "~/server/auth";
import Image from "next/image";

export async function TopNav() {

    const session = await auth();

    return (
        <header>
            <h1>
                <nav className="flex bg-[#202020] items-center justify-between w-full p-3 md:py-3 md:px-8 text-white font-semibold">
                    <Link href="/">
                        <button>
                            <Image
                                src="https://utfs.io/f/db5e70c1-0bb8-4991-80d0-221eea24c410-wtex4j.png"
                                width={100}
                                height={100}
                                alt="Logo"
                            />
                        </button>
                    </Link>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center">
                        <SignInButton />
                        <Link href="/shoppingCart">
                            <AnimatedButton>
                                <HiOutlineShoppingCart size={40} />
                            </AnimatedButton>
                        </Link>
                        </div>
                        {session?.user ? (
                            <p>Welcome, {session.user.name}!</p>
                        ) : null}
                    </div>
                </nav>
            </h1>
            <h2>
                <nav className="relative flex flex-col md:flex-row bg-white text-black items-center justify-between w-full py-2 sm:pl-[15%] sm:pr-[5%] font-semibold shadow-md">
                    <nav className={`flex ${session?.user?.isAdmin ? "flex-wrap md:flex-nowrap" : "flex-nowrap"} bg-white text-black items-center w-full md:w-1/2 font-semibold`}>
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