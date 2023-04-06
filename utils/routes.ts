type Route = {
  label: string,
  pathname: string
}

const adminRoutes: Route[] = [
  { label: 'Zone Generator', pathname: 'admin/zone-generator' }
]

const connectedRoutes: Route[] = [
  { label: 'Créer un partie', pathname: '/game/create' },
  { label: 'Rejoindre une partie', pathname: '/game/join' },
  { label: 'Mes parties', pathname: '/game/mygames' }
]

const notConnectedRoutes: Route[] = [
  { label: 'Se Connecter', pathname: '/auth/signin' }
]

export const getRoutes = (loggedIn: boolean, admin: boolean) => {
  if (!loggedIn) return notConnectedRoutes
  else if (loggedIn && admin)
    return [...connectedRoutes, ...adminRoutes]
  return connectedRoutes
}