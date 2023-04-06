import { Button, Card, Col, Divider, Grid, Input, Loading, Row, Spacer, Text, useSSR } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { IconButton } from "components/button/IconButton"
import { WaitingPlayersCard } from "components/cards/PlayersCard"
import { useRouter } from "next/router"
import { useState } from "react"
import { Clipboard } from "react-feather"

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
  const { name, time, code, zone } = router.query

  const [starting, setStarting] = useState(false)

  const copyCode = () => {
    console.log('COPY')
  }

  const startGame = () => {
    setStarting(true)
    setTimeout(() => {
      setStarting(false)
      router.replace('/')
    }, 5000)
  }

  return (
    <Layout title='Waiting for Players'>
      <Spacer y={4} />
      <Grid.Container gap={3}>
        <Grid xs={6}>
          <Col>
            <Text>
              Name {name}
            </Text>
            <Text>
              Interval Time {time}s
            </Text>
            <Text>
              Zone ID {zone}
            </Text>
          </Col>
        </Grid>
        <Grid xs={6}>
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
        </Grid>
        <Grid xs={12}>
          <WaitingPlayersCard players={players} />
        </Grid>
        <Grid xs={12}>
          <Button
            disabled={players.length < 2}
            style={{ width: '100%' }}
            color='warning'
            auto flat bordered rounded
            onPress={startGame}
          >
            {starting ? <Loading size='sm' type='points' /> : 'Commencer la partie'}
          </Button>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default WaitingGame