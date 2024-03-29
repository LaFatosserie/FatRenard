import { Navbar, Text, Dropdown, Avatar, Link, Button } from "@nextui-org/react"
import { useAppDispatch, useAppSelector } from "redux/hook"
import { appOpenModal } from "redux/slices/App"
import { MODALS } from "types/App"

const Nav = () => {
    const dispatch = useAppDispatch()
    const collapseItems = [
        "Profile",
        "Dashboard",
    ]
    const loggedIn = useAppSelector(state => state.app.loggedIn)

    const openConnectModal = () => {
        dispatch(appOpenModal({ name: MODALS.SIGN_IN, params: {} }))
    }

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
              <Navbar.Link href="#">Features</Navbar.Link>
              <Navbar.Link isActive href="#">
                Customers
              </Navbar.Link>
              <Navbar.Link href="#">Pricing</Navbar.Link>
              <Navbar.Link href="#">Company</Navbar.Link>
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
                    ) : (
                        <Button bordered color="gradient" auto onClick={openConnectModal}>
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
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      zoey@example.com
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    Paramètres
                  </Dropdown.Item>
                  {/* <Dropdown.Item key="team_settings">Joueurs</Dropdown.Item> */}
                  <Dropdown.Item key="system">Informations de l'application</Dropdown.Item>
                  {/* <Dropdown.Item key="configurations">Bonus</Dropdown.Item> */}
                  <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
            <Navbar.Collapse disableAnimation>
              {collapseItems.map((item, index) => (
                <Navbar.CollapseItem
                  key={item}
                  activeColor="warning"
                  isActive={index === 2}
                >
                  <Link
                    color="inherit"
                    css={{
                      minWidth: "100%",
                    }}
                    href="#"
                  >
                    {item}
                  </Link>
                </Navbar.CollapseItem>
              ))}
            </Navbar.Collapse>
                  </Navbar>
        </div>
    )
}

export default Nav