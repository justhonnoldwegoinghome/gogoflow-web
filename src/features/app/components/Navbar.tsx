import Link from "next/link";

import { User, UserChip } from "@/features/users";

interface NavbarProps {
  isLoaded: boolean;
  isLoggedIn: boolean;
  userId: User["id"] | null;
  logOut: () => void;
}

export function Navbar({ isLoaded, isLoggedIn, userId, logOut }: NavbarProps) {
  return (
    <div className="py-4 bg-gray-100 border flex justify-between">
      <Link href="/">Home</Link>
      <div>
        {isLoaded ? <div>Loaded</div> : <div>Not unloaded</div>}
        {isLoggedIn ? (
          <div>
            <UserChip id={userId as User["id"]} />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <div>
            <Link href="/log-in" className="block">
              Log In
            </Link>
            <Link href="/sign-up" className="block">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
