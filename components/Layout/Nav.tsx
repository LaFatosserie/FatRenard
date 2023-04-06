import { Navbar, Text, Dropdown, Avatar, Link, Button } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "redux/hook"
import { logout, selectUser, selectUserLoggedIn } from "redux/slices/App"
import { getRoutes } from "utils/routes"

const Nav = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const loggedIn = useAppSelector(selectUserLoggedIn)
    const user = useAppSelector(selectUser)
    const collapseItems = getRoutes(loggedIn, user?.admin || false)

    return (
        <div style={{ width: '100vw', position: 'absolute', top: 0, left: 0, right: 0 }}>
            <Navbar isBordered variant="floating">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
              css={{
                "@xs": {
                  w: "12%",
                },
              }}
            >
              <img src="/fox_logo.svg" height={60} width={70} />
              <Text b color="inherit" hideIn="xs">
                Fat Renard
              </Text>
            </Navbar.Brand>
            <Navbar.Content
              enableCursorHighlight
              activeColor="warning"
              hideIn="xs"
              variant="highlight"
            >
              {collapseItems.map(item => (
                <Navbar.Link isActive={router.pathname === item.pathname} href={item.pathname}>{item.label}</Navbar.Link>
              ))}
            </Navbar.Content>
            <Navbar.Content
              css={{
                "@xs": {
                  w: "12%",
                  jc: "flex-end",
                },
              }}
            >
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                    {loggedIn ? (
                        <Dropdown.Trigger>
                            <Avatar
                                bordered
                                as="button"
                                color="warning"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Dropdown.Trigger>
                    ) : router.pathname === '/auth/signin' ? ( <></> ) : (
                        <Button bordered color="gradient" auto onClick={() => router.push('/auth/signin')}>
                            Connexion
                        </Button>
                    )}
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="warning"
                  onAction={(actionKey) => console.log({ actionKey })}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Hello {user?.firstname}
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user?.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    Paramètres
                  </Dropdown.Item>
                  {/* <Dropdown.Item key="team_settings">Joueurs</Dropdown.Item> */}
                  <Dropdown.Item key="system">Informations de l'application</Dropdown.Item>
                  {/* <Dropdown.Item key="configurations">Bonus</Dropdown.Item> */}
                  <Dropdown.Item key="logout" withDivider color="error">
                    <div onClick={() => dispatch(logout())}>
                      Se deconnecter
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
            <Navbar.Collapse disableAnimation>
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem
                  key={item.pathname}
                  activeColor='warning'
                  isActive={router.pathname === item.pathname}
                >
                  <Link
                    color="inherit"
                    css={{
                      minWidth: "100%",
                    }}
                    href={item.pathname}
                  >
                    {item.label}
                  </Link>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
          </Navbar>
        </div>
    )
}

export default Nav