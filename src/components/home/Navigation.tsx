import { motion } from "framer-motion";
import styled from "styled-components";
import MenuItem from "./MenuItem";

export default function Navigation() {
  const itemIds = [0, 1, 2, 3, 4];

  return (
    <MenuList>
      {itemIds.map((idx) => (
        <MenuItem key={idx} />
      ))}
    </MenuList>
  );
}
const MenuList = styled(motion.div)``;
