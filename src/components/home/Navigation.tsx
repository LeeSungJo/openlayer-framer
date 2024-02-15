import { motion } from "framer-motion";
import styled from "styled-components";
import MenuItem from "./MenuItem";

interface INavigation {
  event: (name: string) => void;
}

export default function Navigation({ event }: INavigation) {
  const itemIds = [0, 1, 2, 3, 4];

  return (
    <MenuList>
      {itemIds.map((idx) => (
        <MenuItem key={idx} event={event} />
      ))}
    </MenuList>
  );
}
const MenuList = styled(motion.div)``;
