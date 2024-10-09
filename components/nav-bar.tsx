"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { GithubIcon, HomeIcon } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        {" "}
        <Button variant="ghost" onClick={() => router.push("/")}>
          <HomeIcon className="size-8" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              window.open("https://github.com/ayoubben18", "_blank")
            }
          >
            <GithubIcon className="size-8" />
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/ayoub-bensalah-56834b29b/",
                "_blank"
              )
            }
          >
            <LinkedInLogoIcon className="size-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
