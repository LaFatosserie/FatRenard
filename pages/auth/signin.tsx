import { Button, Col, Input, Loading, Row, Spacer, Text } from '@nextui-org/react'
import Layout from 'components/Layout/Layout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { selectUserLoggedIn } from 'redux/selectors'
import { logInUser, selectAuthLoading, selectError } from 'redux/slices/App'

function SignIn() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loggedIn = useAppSelector(selectUserLoggedIn)
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectError)
  
  const [username, setUsername] = useState('')
  const [password, setPwd] = useState('')

  const signIn = () => {
    dispatch(logInUser({ username, password }))
  }

  const test = () => {
    console.log('Display toast')
    toast('Testing', { type: 'success' })
  }

  useEffect(() => {
    if (loggedIn)
      router.replace('/')
  }, [loggedIn])

  return (
    <Layout title='SignIn'>
      <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src='/img/sign-in-background.jpg'
          style={{ height: '100%', zIndex: 0 }}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
        <div style={{
          width: '80vw',
          maxWidth: '600px',
          backgroundColor:
          'white',
          zIndex: 1,
          padding: 30,
          borderRadius: 12
        }}>
          <Text size='$2xl'>Se Connecter</Text>
          <Spacer />
          <Input
            label='Username'
            value={username}
            rounded
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            label='Mot de Passe'
            value={password}
            rounded
            fullWidth
            helperText={error}
            helperColor='error'
            onChange={e => setPwd(e.target.value)}
          />
          <Spacer />
          <Col style={{ width: '100%' }}>
            <Button auto rounded bordered flat style={{ width: '100%', marginBottom: 10 }} onPress={test}>
              {username != '' ? 'Annuler' : 'Creer compte'}
            </Button>
            <Button
              auto
              rounded
              flat
              bordered
              color='warning'
              style={{ width: '100%' }}
              onPress={signIn}
              disabled={loading}
            >
              {loading ? <Loading size='sm' /> : 'Connection'}
            </Button>
          </Col>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn