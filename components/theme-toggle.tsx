"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    mounted && (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        onClick={toggleTheme}
      >
        {currentTheme === "dark" ? (
          <MoonIcon className="w-7 h-7" />
        ) : (
          <SunIcon className="w-7 h-7" />
        )}
      </Button>
    )
  );
};

export default ThemeToggle;
