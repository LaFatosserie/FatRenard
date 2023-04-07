import { Button, Card, Col, Grid, Input, Loading, Spacer, Text } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { WaitingPlayersCard } from "components/cards/PlayersCard"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "redux/hook"
import { loadGame, selectGame } from "redux/slices/App"
import { GameStatus } from "types/Game"

const players = [
  { firstname: 'Arthur', lastname: 'Walsh' },
  { firstname: 'Tim', lastname: 'Drye' },
  { firstname: 'Amicie', lastname: 'Mevel' },
  { firstname: 'Francois', lastname: 'Gillet' },
  { firstname: 'JG', lastname: 'Jammes' },
  { firstname: 'Louis', lastname: 'Borreill' },
  { firstname: 'Jeanne', lastname: 'Bendo' },
]

const JoinGame = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const game = useAppSelector(selectGame)

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)

  const join = () => {
    if (code === '') {
      setError('Invalide')
      return
    }
    if (error !== '')
      setError('')
    setJoining(true)
    dispatch(loadGame({ id: code, joining: true })).unwrap().then(() => {
      setJoining(false)
      router.push({ pathname: '/game/waiting', query: { joining: true }})
    })
  }

  return (
    <Layout title="Join Game">
      <Spacer y={4} />
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Text size='$2xl'>Rejoindre une partie</Text>
        </Grid>
        <Grid xs={12}>
          <Col>
            <Input
              label='Code de la partie'
              fullWidth
              value={code}
              helperColor="error"
              helperText={error}
              onChange={e => setCode(e.target.value)}
            />
            <Button
              style={{ width: '100%', marginTop: 20 }}
              color='warning'
              auto flat rounded bordered
              onPress={join}
              disabled={joining}
            >
              {joining ? <Loading type='points' size='sm' /> : 'Rejoindre'}
            </Button>
          </Col>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default JoinGame