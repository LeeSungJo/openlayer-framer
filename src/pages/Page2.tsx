import { useState } from "react";
import SideBar from "../components/home/SideBar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={handleSideBar} />
    </>
  );
}
