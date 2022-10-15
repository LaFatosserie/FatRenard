import React from 'react'
import { Modal, Text, Button, Input, Checkbox, Row } from '@nextui-org/react'
import { useAppDispatch } from 'redux/hook'
import { appCloseModal } from 'redux/slices/App'

const SignInModal = () => {
  const dispatch = useAppDispatch()

  const openPopup = () => {
    window.open('https://fatlogin.lafatosserie.fr/', 'fatlogin', 'popup')
  }

  const closeHandler = () => {
    dispatch(appCloseModal())
  }
  return (
    <>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Se Connecter
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Button flat color="primary" auto onClick={openPopup}>
            Connexion avec La Fatosserie
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Fermer
          </Button>
        </Modal.Footer>
  
    </>
  )
}

export default SignInModal