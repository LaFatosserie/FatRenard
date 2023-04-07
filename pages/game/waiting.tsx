import { Button, Card, Col, Divider, Grid, Input, Loading, Row, Spacer, Text, useSSR } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { IconButton } from "components/button/IconButton"
import { WaitingPlayersCard } from "components/cards/PlayersCard"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Clipboard } from "react-feather"
import { useAppDispatch, useAppSelector } from "redux/hook"
import { loadGame, selectGame } from "redux/slices/App"
import { loadZone, selectZoneById } from "redux/slices/Zones"
import { RootState } from "redux/store"

const players = [
  { firstname: 'Arthur', lastname: 'Walsh' },
  { firstname: 'Tim', lastname: 'Drye' },
  { firstname: 'Amicie', lastname: 'Mevel' },
  { firstname: 'Francois', lastname: 'Gillet' },
  { firstname: 'JG', lastname: 'Jammes' },
  { firstname: 'Louis', lastname: 'Borreill' },
  { firstname: 'Jeanne', lastname: 'Bendo' },
]

const WaitingGame = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { joining, code, zone } = router.query

  const [starting, setStarting] = useState(false)
  const game = useAppSelector(selectGame)
  const activeZone = useAppSelector((state: RootState) => selectZoneById(state, zone as string))

  const copyCode = () => {
    navigator.clipboard.writeText(code as string)
  }

  const startGame = () => {
    setStarting(true)
    setTimeout(() => {
      setStarting(false)
      router.replace('/')
    }, 5000)
  }

  useEffect(() => {
    if (!activeZone && zone)
      dispatch(loadZone(zone as string))
    const localGameId = localStorage.getItem('__fat_game__')
    if (!game && localGameId)
      dispatch(loadGame({ id: localGameId, joining: false }))
  }, [game, activeZone])

  return (
    <Layout title='Waiting for Players'>
      <Spacer y={4} />
      <Grid.Container gap={3}>
        <Grid xs={6}>
          <Col>
            <Text>
              Name {game.name}
            </Text>
            <Text>
              Interval Time {game.time}s
            </Text>
            <Text>
              Zone {activeZone?.name}
            </Text>
          </Col>
        </Grid>
        {!joining && <Grid xs={6}>
          <Input
            value={code}
            disabled={true}
            style={{ color: 'black' }}
            contentRightStyling={false}
            contentRight={
              <IconButton onClick={copyCode}>
                <Clipboard size={18} />
              </IconButton>
            }
          />
        </Grid>}
        <Grid xs={12}>
          <WaitingPlayersCard players={players} />
        </Grid>
        {!joining && <Grid xs={12}>
          <Button
            disabled={players.length < 2}
            style={{ width: '100%' }}
            color='warning'
            auto flat bordered rounded
            onPress={startGame}
          >
            {starting ? <Loading size='sm' type='points' /> : 'Commencer la partie'}
          </Button>
        </Grid>}
      </Grid.Container>
    </Layout>
  )
}

export default WaitingGame