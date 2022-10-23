import React, { useEffect } from 'react'
import { Modal, Text, Button, Input, Checkbox, Row } from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { appCloseModal, signInWithToken } from 'redux/slices/App'

const SignInModal = () => {
  const dispatch = useAppDispatch()

  const loggedIn = useAppSelector(state => state.app.loggedIn)

  const handler = (response: any) => {
    if (response.data.fattoken) {
      dispatch(signInWithToken(response.data.fattoken))
    }
  }

  const openPopup = () => {
    window.open(process.env.NEXT_PUBLIC_FAT_LOGIN_URL, 'fatlogin', 'popup')
    window.addEventListener('message', handler, false)
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
          <Button flat color="primary" auto onPress={openPopup}>
            Connexion avec La Fatosserie
          </Button>
          {loggedIn && <div>LoggedIn</div>}
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