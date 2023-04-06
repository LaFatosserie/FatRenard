import { Wrapper } from "@googlemaps/react-wrapper"
import { Button, Card, Col, Grid, Input, Loading, Row, Spacer, Text } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { Map } from "components/map"
import Polygon from "components/map/Polygon"
import { useRouter } from "next/router"
import { useState } from "react"
import { Check } from "react-feather"
import { useAppDispatch } from "redux/hook"

function ZoneGenerator() {
  const dispatch = useAppDispatch()

  // Map
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 45.75555016,
    lng: 4.8296179,
  })
  const [zoom, setZoom] = useState(15)

  // Zone Schema
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [smallZone, setSmallZone] = useState<google.maps.LatLngLiteral[]>([])
  const [meduimZone, setMeduimZone] = useState<google.maps.LatLngLiteral[]>([])
  const [largeZone, setLargeZone] = useState<google.maps.LatLngLiteral[]>([])

  const [workZone, setWorkZone] = useState(0)
  const [loading, setLoading] = useState(false)

  const onClick = (mouseEv: google.maps.MapMouseEvent) => {
    if (!mouseEv || workZone === 0)
      return
    switch (workZone) {
      case 1:
        setSmallZone(prev => [...prev, mouseEv.latLng!.toJSON()])
        break;
      case 2:
        setMeduimZone(prev => [...prev, mouseEv.latLng!.toJSON()])
        break;
      case 3:
        setLargeZone(prev => [...prev, mouseEv.latLng!.toJSON()])
        break;
      default:
        break;
    }
  }

  const removeLastPoint = () => {
    if (workZone === 0) return
    switch (workZone) {
      case 1:
        setSmallZone(prev => prev.slice(0, -1))
        break;
      case 2:
        setMeduimZone(prev => prev.slice(0, -1))
        break;
      case 3:
        setLargeZone(prev => prev.slice(0, -1))
        break;
      default:
        break;
    }
  }

  const selectWorkZone = (id: number) => () => {
    if (workZone === id) {
      setWorkZone(0)
      return
    }
    setWorkZone(id)
  }

  const onIdle = (map: google.maps.Map) => {
    if (!map) return
    setZoom(map.getZoom()!)
    setCenter(map.getCenter()!.toJSON())
  }

  const isSavable = () => {
    return name === '' || description === '' || smallZone.length === 0 || meduimZone.length === 0 || largeZone.length === 0
  }

  const save = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSmallZone([])
      setMeduimZone([])
      setLargeZone([])
      setDescription('')
      setName('')
      setWorkZone(0)
    }, 5000)
  }

  return (
    <Layout title='Zone Generator'>
      <Grid.Container gap={0} style={{ height: '100%' }}>
        <Grid xs={3}>
          <Col>
            <Spacer y={4} />
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <Text size='$3xl'>Creation de Zone</Text>
              </Grid>
              <Grid xs={12}>
                <Input
                  label='Nom de la Zone'
                  value={name}
                  fullWidth
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  label='Description Courte'
                  value={description}
                  fullWidth
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid xs={7}>
                <Col>
                  <Text>Zone de Travail</Text>
                  <Button.Group disabled={name === ''} bordered flat auto size='md' color={workZone === 0 ? 'warning' : 'success'}>
                    <Button icon={workZone == 1 ? <Check /> : undefined} onPress={selectWorkZone(1)}>
                      Small
                    </Button>
                    <Button icon={workZone == 2 ? <Check /> : undefined} onPress={selectWorkZone(2)}>
                      Meduim
                    </Button>
                    <Button icon={workZone == 3 ? <Check /> : undefined} onPress={selectWorkZone(3)}>
                      Large
                    </Button>
                  </Button.Group>
                </Col>
              </Grid>
              <Grid xs={4} style={{ alignItems: 'center' }}>
                  <Button
                    auto flat rounded bordered
                    style={{ width: '100%', marginTop: 25 }}
                    color='warning'
                    onPress={removeLastPoint}
                    disabled={workZone === 0}
                  >
                    Retirer Dernier Pt
                  </Button>
              </Grid>
              <Grid xs={3}>
                  <Input
                    style={{ color: 'black' }}
                    value={zoom}
                    disabled
                    label="Zoom"
                  />
              </Grid>
              <Grid xs={9}>
                <Input
                  style={{ color: 'black' }}
                  value={`${center.lat} ${center.lng}`}
                  disabled
                  fullWidth
                  label="Centre"
                />
              </Grid>
              <Grid xs={12}>
                <Row  justify='space-around'>
                  {smallZone.length > 0 && 
                    <Card style={{ maxWidth: '150px', padding: 10 }}>
                      <Text>{`Small ${smallZone.length} Pts`}</Text>
                    </Card>
                  }
                  {meduimZone.length > 0 && 
                    <Card style={{ maxWidth: '150px', padding: 10 }}>
                      <Text>{`Meduim ${meduimZone.length} Pts`}</Text>
                    </Card>
                  }
                  {largeZone.length > 0 && 
                    <Card style={{ maxWidth: '150px', padding: 10 }}>
                      <Text>{`Large ${largeZone.length} Pts`}</Text>
                    </Card>
                  }
                </Row>
              </Grid>
              <Grid xs={12}>
                <Button
                  auto flat bordered rounded
                  color='warning'
                  style={{ width: '100%' }}
                  onPress={save}
                  disabled={isSavable()}
                >
                  {loading ? <Loading type='points' color='warning' /> : 'Sauvegarder'}
                </Button>
              </Grid>
            </Grid.Container>
          </Col>
        </Grid>
        <Grid xs={9}>
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            <Map
              center={center}
              zoom={zoom}
              style={{ width: '100%', height: '100%' }}
              onClick={onClick}
              onIdle={onIdle}
            >
              {smallZone.length > 0 && <Polygon
                paths={smallZone}
                strokeColor='#ff0000'
              />}
              {meduimZone.length > 0 && <Polygon
                paths={meduimZone}
                strokeColor='#00ff00'
              />}
              {largeZone.length > 0 && <Polygon
                paths={largeZone}
                strokeColor='#0000ff'
              />}
            </Map>
          </Wrapper>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default ZoneGenerator