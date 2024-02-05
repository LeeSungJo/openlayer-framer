import { motion } from "framer-motion";
import styled from "styled-components";

interface IModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalLayout({ isOpen, setIsOpen }: IModal) {
  return (
    <>
      {isOpen && (
        <Layout>
          Modal
          <CloseModal onClick={() => setIsOpen(false)}>닫기</CloseModal>
        </Layout>
      )}
    </>
  );
}

const Layout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  border: solid;
  border-color: red;
`;

const CloseModal = styled.button`
  height: 50px;
  width: 100px;
`;
