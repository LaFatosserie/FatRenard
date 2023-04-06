import { Button, Card, Text } from "@nextui-org/react";

export const ZoneCard = ({ zone, onPress }: { zone: { id: string, title: string, description: string }, onPress: () => void }) => {
  return <Card variant='flat' isPressable onPress={onPress}>
    <Card.Image
      src="/img/fox-paysage.jpg"
      objectFit='cover'
      width='100%'
    />
    <Card.Footer>
      <Text>{zone.title}</Text>
    </Card.Footer>
  </Card>
}
