import { Button, Col, Grid, Input, Loading, Modal, Row, Spacer, StyledButtonGroup, Switch, Text, useModal } from "@nextui-org/react";
import Layout from "components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "redux/hook";
import { Check } from "react-feather";
import { ZoneCard } from "components/cards/ZoneCard";

const zones = [
  { id: 'id1', title: 'Lyon', description: 'Zone dans la presauil de Lyon' },
  { id: 'id2', title: 'Lille', description: 'Zone dans lille' },
  { id: 'id3', title: 'Marseille', description: 'Zone dans Marseille' },
  { id: 'id3', title: 'Marseille', description: 'Zone dans Marseille' },
  { id: 'id3', title: 'Marseille', description: 'Zone dans Marseille' },
  { id: 'id3', title: 'Marseille', description: 'Zone dans Marseille' },
]

const CreateGame = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [gameName, setGameName] = useState('')
  const [time, setTime] = useState(0)
  const [zone, setZone] = useState('')
  const [publique, setPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setVisible, bindings } = useModal()

  const updateTime = (id: number) => () => {
    if (id === time)
      setTime(0)
    else setTime(id)
  }

  const createGame = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push({ pathname: `/game/waiting`, query: { name: gameName, zone, time, code: 'FAK3C0D3' } })
    }, 3000)
  }

  return (
    <Layout title="Create Game">
      <Spacer y={4} />
      <Grid.Container gap={2} justify='space-around'>
        <Grid xs={12}>
          <Text size='3xl'>
            Créer une partie
          </Text>
        </Grid>
        <Grid xs={12}>
          <Input
            fullWidth
            label="Nom de la partie"
            value={gameName}
            onChange={e => setGameName(e.target.value)}
          />
        </Grid>
        <Grid xs={8}>
          <Col>
            <Text style={{ width: '100%' }}>Temps de pulse</Text>
            <Row justify='space-around'>
              <Button.Group bordered flat auto size='md' color={time === 0 ? 'warning' : 'success'}>
                <Button icon={time == 2 ? <Check /> : undefined} onPress={updateTime(2)}>
                  2s
                </Button>
                <Button icon={time == 3 ? <Check /> : undefined} onPress={updateTime(3)}>
                  3s
                </Button>
                <Button icon={time == 5 ? <Check /> : undefined} onPress={updateTime(5)}>
                  5s
                </Button>
              </Button.Group>
            </Row>
          </Col>
        </Grid>
        <Grid xs={4}>
          <Col>
            <Text style={{ marginBottom: 7 }}>Publique </Text>
            <Switch checked={publique} onChange={e => setPublic(e.target.checked)} color='warning' />
          </Col>
        </Grid>
        <Grid xs={12}>
          <Button onPress={() => setVisible(true)} auto flat bordered rounded color={zone === '' ? 'warning' : 'success'} style={{ width: '100%' }}>
            {zone === '' ? 'Choisir Zone' : zones.find(z => z.id === zone)?.title}
          </Button>
          <Modal blur scroll {...bindings}>
            <Modal.Header>
              <Text size={14}>
                Choix de la Zone de Jeu
              </Text>
            </Modal.Header>
            <Modal.Body>
              {zones.map(zone => <ZoneCard zone={zone} onPress={() => { setZone(zone.id); setVisible(false) }} />)}
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color='error' onPress={() => setVisible(false)}>
                Fermer
              </Button>
              <Button disabled={!zone}>
                Choisir
              </Button>
            </Modal.Footer>
          </Modal>
        </Grid>
        <Grid xs={12}>
          <Button
            auto flat rounded bordered color='warning'
            disabled={!zone || !gameName || time === 0}
            style={{ width: '100%' }}
            onPress={createGame}
          >
            {loading ? <Loading type='points' size='sm' /> : 'Créer la partie'}
          </Button>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default CreateGame