"use client";

import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

export default function LeftSideBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 flex-col gap-6 w-full px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname.includes(link.route) || pathname === link.route;

          return (
            <Link
              className={`${
                isActive ? "bg-primary-500" : null
              } leftsidebar_link hover:bg-primary-500 hover:bg-opacity-50`}
              href={link.route}
              key={link.route}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-xl:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer">
              <Image
                className="hover:bg-white hover:bg-opacity-15 transition-colors duration-300 p-1 rounded-lg"
                src="/assets/logout.svg"
                alt="logout"
                width={28}
                height={28}
              />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
