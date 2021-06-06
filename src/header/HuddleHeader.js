import React, { useState } from 'react'
import { Menu, Icon, Header, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import CreateModal from '../Modals/CreateModal'

const MenuHeader = styled(Menu.Menu)`
  width: 82vw;
`
const HeaderItem = styled(Menu.Item)`
  padding-top: 1.3vw !important;
  margin-left: 47vw;
`

const MenuIcons = styled(Menu.Menu)`
  width: 18vw;
`

const HuddleHeader = ({ token, setToken, pendencys, setPendencys }) => {
  const [visible, setVisible] = useState(false)

  function logout(){
    setToken()
    setPendencys({})
  }

  return (
    <Menu color={'blue'} inverted fluid borderless size="tiny" icon="labeled">
      <CreateModal token={token} visible={visible} setVisible={setVisible} pendencys={pendencys} setPendencys={setPendencys}/>
      <MenuHeader>
        <HeaderItem
        //active={activeItem === 'messages'}
        //onClick={this.handleItemClick}
        >
          <Header inverted as="h1">
            HUDDLE
          </Header>
        </HeaderItem>
      </MenuHeader>
      <MenuIcons>
        <Menu.Item position="right" onClick={() => setVisible(true)}>
          <Icon name="plus" />
          Novo
        </Menu.Item>

        <Menu.Item position="right">
          <Icon name="alarm" />
          Notificação
        </Menu.Item>
          <Dropdown item button direction='left' icon='user' >
            <Dropdown.Menu>
              <Dropdown.Item icon="sign-out" text="Logout" onClick={() => logout()} />
            </Dropdown.Menu>
          </Dropdown>

      </MenuIcons>
    </Menu>
  )
}

export default HuddleHeader
