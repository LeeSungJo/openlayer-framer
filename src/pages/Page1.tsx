import { useState } from "react";
import styled from "styled-components";
import ModalLayout from "../components/page1/ModalLayout";

export default function Page1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <BtnOpenModal onClick={() => setIsOpen(!isOpen)}>Button</BtnOpenModal>
      {isOpen && <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} />}
    </Layout>
  );
}

const Layout = styled.div`
  background-color: grey;
  height: 100vh;
  width: 100vw;
`;

const BtnOpenModal = styled.button``;
