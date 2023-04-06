import { Card, Divider, Loading, Row, Text } from "@nextui-org/react";

export const WaitingPlayersCard = ({
  players
}: {
  players: { firstname: string, lastname: string }[]
}) => (
  <Card variant='flat' style={{ maxHeight: '60vh' }}>
    <Card.Header>
      <Row justify='space-around' align='center'>
        <Text>En attente de joueurs</Text>
        <Loading type='points' color='warning' />
      </Row>
    </Card.Header>
    <Divider />
    <Card.Body>
      {players.map(player => (
        <Row>
          <Text>{player.firstname + ' ' + player.lastname}</Text>
        </Row>
      ))}
    </Card.Body>
  </Card>
)