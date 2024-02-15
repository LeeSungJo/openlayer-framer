import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import HamburgerSvg from "../../assets/hambuger.svg?react";
import Navigation from "./Navigation";

interface ISideBar {
  isOpen: boolean;
  setIsOpen: () => void;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideBar({
  isOpen,
  setIsOpen,
  selectedMenu,
  setSelectedMenu,
}: ISideBar) {
  return (
    <>
      <Toggle onClick={() => setIsOpen()}>
        <HamburgerSvg height={40} width={40} />
      </Toggle>
      <AnimatePresence>
        {isOpen && (
          <Area
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
              ease: "easeOut",
              duration: 0.2,
              type: "tween",
            }}
            exit={{ x: "-100%" }}
          >
            <TitleArea>메뉴 제목</TitleArea>
            <Navigation event={event} />
          </Area>
        )}
      </AnimatePresence>
    </>
  );
}

const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const Toggle = styled(motion.div)`
  position: fixed;
  z-index: 11;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Area = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #8dc0ff;
  width: 300px;
  height: calc(100vh - 20px);
  z-index: 10;
  padding: 10px;
`;
