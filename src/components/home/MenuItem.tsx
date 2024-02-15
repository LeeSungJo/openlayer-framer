import { motion } from "framer-motion";
import styled from "styled-components";

interface IMenuItem {
  event: (name: string) => void;
}

export default function MenuItem({ event }: IMenuItem) {
  return <Container onClick={event}>Item</Container>;
}

const Container = styled(motion.div)`
  height: 50px;
  background-color: #c9e0fd;
  margin-bottom: 4%;
  &:hover {
    scale: 1.03;
    font-weight: 1000;
    color: #9b9800;
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
