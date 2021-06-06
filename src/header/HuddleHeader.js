import React from 'react'
import { Menu, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

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

const HuddleHeader = () => {
  const newPendency = () => {
    console.log('newPendency')
  }
  return (
    <Menu color={'blue'} inverted fluid borderless size="tiny" icon="labeled">
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
        <Menu.Item position="right" onClick={() => newPendency()}>
          <Icon name="plus" />
          Novo
        </Menu.Item>

        <Menu.Item position="right">
          <Icon name="alarm" />
          Notificação
        </Menu.Item>
        <Menu.Item position="right">
          <Icon name="user" />
          Login
        </Menu.Item>
      </MenuIcons>
    </Menu>
  )
}

export default HuddleHeader
