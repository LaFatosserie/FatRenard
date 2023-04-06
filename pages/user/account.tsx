import { Button, Collapse, Grid, Input, Spacer, Text, User } from "@nextui-org/react"
import Layout from "components/Layout/Layout"
import { useAppSelector } from "redux/hook"
import { selectUser } from "redux/selectors"

function Account() {
  // const user = useAppSelector(selectUser)

  const user = { 
    firstname: 'Arthur',
    lastname: 'Walsh',
    email: 'arthur.walsh@lafatosserie.fr'
  }

  return (
    <Layout title='Mon Compte'>
      <Spacer y={4} />
      <Grid.Container gap={3}>
        <Grid xs={12}>
          <User
            src={''}
            bordered
            color='warning'
            name={user?.firstname + ' ' + user?.lastname}
            description={user.email}
            size='xl'
          />
        </Grid>
        <Grid xs={12}>
          <Collapse.Group style={{ width: '100%' }}>
            <Collapse title='Editer Mes Informations (bientot)'>
              <>
                <Input
                  label="Firstname"
                  value={user.firstname}
                />
              </>
            </Collapse>
            <Collapse title='Supprimer mon compte'>
              <>
                <Text size={12}>Entraine la suppression de toutes vos donnes hors jeux</Text>
                <Button color='error' auto flat rounded bordered style={{ width: '100%' }}>
                  Supprimer mon compte
                </Button>
              </>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default Account