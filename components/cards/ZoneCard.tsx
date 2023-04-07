import { Button, Card, Text } from "@nextui-org/react";
import { Zone } from "types/Zone";

export const ZoneCard = ({ zone, onPress }: { zone: Zone, onPress: () => void }) => {
  return <Card variant='flat' isPressable onPress={onPress}>
    <Card.Image
      src="/img/fox-paysage.jpg"
      objectFit='cover'
      width='100%'
    />
    <Card.Footer>
      <Text>{zone.name}</Text>
    </Card.Footer>
  </Card>
}
