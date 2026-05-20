"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী চেঞ্জ করতে পারেন

import { FiMenu, FiX } from "react-icons/fi";
import {
    Avatar,
    Button,
    Skeleton
} from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Profile dropdown state and refs (custom implementation to ensure it opens below the navbar)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    // if pinned (clicked) the menu will stay open even when mouse leaves
    const [isProfilePinned, setIsProfilePinned] = useState(false);
    const avatarButtonRef = useRef(null);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        function onDocClick(e) {
            if (!avatarButtonRef.current) return;
            if (avatarButtonRef.current.contains(e.target) || profileMenuRef.current?.contains(e.target)) return;
            setIsProfileOpen(false);
            setIsProfilePinned(false);
        }
        function onKey(e) {
            if (e.key === "Escape") {
                setIsProfileOpen(false);
                setIsProfilePinned(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);


    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;


    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                }
            }
        });
    };


    const getLinkClass = (path) => {
        const baseClass = "text-sm font-medium transition-colors duration-200 relative py-1";
        const activeClass = "text-primary border-b-2 border-primary font-semibold";
        const inactiveClass = "text-default-600 hover:text-primary";
        return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="flex items-center justify-between h-20">


            <div className="flex-shrink-0">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-foreground"
                >
                    Tutor<span className="text-primary">Connect</span>
                </Link>
            </div>


            <div className="hidden md:flex items-center space-x-6">

                <Link
                    href="/"
                    className={getLinkClass("/")}
                >
                    Home
                </Link>

                <Link
                    href="/tutor"
                    className={getLinkClass("/tutor")}
                >
                    Tutors
                </Link>

                {user && (
                    <>
                        <Link
                            href="/add-tutor"
                            className={getLinkClass("/add-tutor")}
                        >
                            Add Tutor
                        </Link>
                        <Link
                            href="/my-tutor"
                            className={getLinkClass("/my-tutor")}
                        >
                            My Tutor
                        </Link>


                        <Link
                            href="/booked-session"
                            className={getLinkClass("/booked-session")}
                        >
                            My Booked Sessions
                        </Link>
                    </>
                )}
            </div>


            <div className="hidden md:flex items-center gap-4">


                <ThemeToggle />


                {isPending ? (

                    <Skeleton className="flex rounded-full w-10 h-10" />

                ) : user ? (


                    <div
                        className="relative"
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => { if (!isProfilePinned) setIsProfileOpen(false); }}
                    >
                        <button
                            ref={avatarButtonRef}
                            onClick={() => {
                                const next = !isProfileOpen;
                                setIsProfileOpen(next);
                                setIsProfilePinned(next);
                            }}
                            className="focus:outline-none"
                            aria-haspopup="true"
                            aria-expanded={isProfileOpen}
                        >
                            <Avatar
                                as="span"
                                size="sm"
                                color="primary"
                                name={user?.name || "User"}
                                src={user?.image || "/default-avatar.png"}
                                className="cursor-pointer transition-transform hover:scale-105"
                            />
                        </button>

                        {isProfileOpen && (
                            <div
                                ref={profileMenuRef}
                                role="menu"
                                aria-label="Profile Actions"
                                className="absolute right-0 mt-2 w-56 bg-background border border-default-100 rounded-md shadow-lg z-50"
                            >
                                <div className="p-3 border-b">
                                    <p className="text-sm font-semibold">Signed in as</p>
                                    <p className="text-sm text-primary font-medium truncate">{user?.email}</p>
                                </div>
                                <Link href="/profile" className="block px-3 py-2 hover:bg-default-100">My Profile</Link>
                                <button
                                    className="w-full text-left px-3 py-2 text-danger hover:bg-default-100"
                                    onClick={() => { setIsProfileOpen(false); setIsProfilePinned(false); handleSignOut(); }}
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>

                ) : (


                    <div className="flex items-center gap-2">

                        <Link href="/login">
                            <Button
                                variant="light"
                                size="sm"
                            >
                                Login
                            </Button>
                        </Link>

                        <Link href="/register">
                            <Button
                                color="primary"
                                size="sm"
                            >
                                Register
                            </Button>
                        </Link>

                    </div>

                )}
            </div>


            <div className="flex md:hidden items-center gap-2">

                <ThemeToggle />

                <button
                    onClick={() =>
                        setIsMobileMenuOpen(!isMobileMenuOpen)
                    }
                    className="p-2 rounded-md text-default-600 hover:text-primary transition-colors"
                >
                    {isMobileMenuOpen ? (
                        <FiX className="w-6 h-6" />
                    ) : (
                        <FiMenu className="w-6 h-6" />
                    )}
                </button>

            </div>

        </div>
    </div>


    {isMobileMenuOpen && (

        <div className="md:hidden border-t border-default-100 bg-background/95 backdrop-blur-md px-4 pt-3 pb-4 space-y-2">

            {/* Home */}
            <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    pathname === "/"
                        ? "bg-primary/10 text-primary"
                        : "text-default-600 hover:bg-default-100"
                }`}
            >
                Home
            </Link>


            <Link
                href="/tutor"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    pathname === "/tutor"
                        ? "bg-primary/10 text-primary"
                        : "text-default-600 hover:bg-default-100"
                }`}
            >
                Tutors
            </Link>


            {user && (
                <>
                    <Link
                        href="/add-tutor"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/add-tutor"
                                ? "bg-primary/10 text-primary"
                                : "text-default-600 hover:bg-default-100"
                        }`}
                    >
                        Add Tutor
                    </Link>

                    <Link
                        href="/booked-session"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/booked-session"
                                ? "bg-primary/10 text-primary"
                                : "text-default-600 hover:bg-default-100"
                        }`}
                    >
                        My Booked Sessions
                    </Link>

                    <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/profile"
                                ? "bg-primary/10 text-primary"
                                : "text-default-600 hover:bg-default-100"
                        }`}
                    >
                        My Profile
                    </Link>

                    <Button
                        fullWidth
                        color="danger"
                        variant="flat"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleSignOut();
                        }}
                    >
                        Log Out
                    </Button>
                </>
            )}


            {!user && !isPending && (

                <div className="pt-3 flex flex-col gap-2">

                    <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full"
                    >
                        <Button
                            fullWidth
                            variant="bordered"
                        >
                            Login
                        </Button>
                    </Link>

                    <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full"
                    >
                        <Button
                            fullWidth
                            color="primary"
                        >
                            Register
                        </Button>
                    </Link>

                </div>
            )}
        </div>
    )}
</nav>
    );
}