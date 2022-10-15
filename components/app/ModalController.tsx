import SignIn from "../modals/SignInModal";
import React from "react";
import { useSelector } from "react-redux";
import { selectModal } from "redux/selectors";
import { MODALS } from "types/App";
import { Modal } from "@nextui-org/react";
import { useAppDispatch } from "redux/hook";
import { appCloseModal } from "redux/slices/App";

const getModal = (modal: MODALS): JSX.Element => {
  if (modal === MODALS.SIGN_IN) return <SignIn />;
  return <div></div>;
};

const ModalController = () => {
  const dispatch = useAppDispatch();

  const modal = useSelector(selectModal);

  if (!modal) return <></>;

  return (
    <Modal
      open={modal != null}
      onClose={() => dispatch(appCloseModal())}
      closeButton
      blur
    >
      {getModal(modal.name)}
    </Modal>
  );
};


export default ModalController;