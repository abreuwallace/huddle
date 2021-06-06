import React from 'react'
import { Icon, Dropdown, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const NotIcon = styled(Icon)`
  margin-bottom: 4px !important;
`

const NotificationDropdown = ({ notifications }) => {
  const options = Object.values(notifications)
    .sort((a, b) => b.time.localeCompare(a.time))
    .map((each, id) => {
      return {
        key: id,
        text: each.name,
        value: id,
        content: <Header content={each.name} subheader={each.when} />, //icon={each.icon}
      }
    })

  return (
    <Dropdown trigger={<NotIcon name="alarm" size="big" />} icon={false} options={options} direction="left" scrolling />
  )
}

export default NotificationDropdown
