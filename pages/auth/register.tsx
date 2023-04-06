import { Button, Input, Loading, Row, Spacer, Text } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "redux/hook"
import { registerUser, selectAuthLoading } from "redux/slices/App"

function Register() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loading = useAppSelector(selectAuthLoading)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const register = () => {
    if (error)
      setError('')
    if (password !== confirm || confirm === '') {
      setError('Mots de passe non identiques')
      return
    }
    dispatch(registerUser({
      username,
      password,
      firstname,
      lastname,
      email
    })).unwrap().then((res) => {
      if (res && res.user)
        router.push('/')
    })
  }

  return (
    <Layout title='Register'>
      <Spacer y={3} />
      <div style={{ padding: 20 }}>
        <Text>Créer un compte</Text>
          <Input
            label='Firstname'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            fullWidth
          />
          <Input
            label='Lastname'
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            fullWidth
          />
          <Input
            label='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
          />
          <Input
            label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <Input
            label='Mot de passe'
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            type='password'
          />
          <Input
            label='Confirmer le Mot de Passe'
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            fullWidth
            helperText={error}
            helperColor='error'
            type='password'
          />
          <Button
            auto flat rounded bordered
            style={{ width: '100%', marginTop: 20 }}
            color='warning'
            onPress={register}
          >
            {loading ? <Loading type='points' /> : 'Créer un compte'}
          </Button>
      </div>
    </Layout>
  )
}

export default Register