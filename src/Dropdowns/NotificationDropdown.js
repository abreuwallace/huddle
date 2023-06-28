import React from 'react'
import { Icon, Dropdown, Header, Label } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'

const NotIcon = styled(Icon)`
  margin-bottom: 4px !important;
`

const NotificationDropdown = ({ notifications, newsCount, setNewsCount }) => {
  const options = Object.values(notifications)
    .sort((a, b) => b.time.localeCompare(a.time))
    .map((each, id) => {
      return {
        key: id,
        text: each.name,
        value: id,
        content: <Header content={each.name} subheader={each.action + ' ' + moment(each.time).fromNow()} />, //icon={each.icon}
      }
    })

  console.log(`newsCount`, newsCount)

  return (
    <Dropdown
      trigger={
        <NotIcon name="alarm" size="big">
          {newsCount > 0 && (
            <Label color="red" floating size="mini">
              {newsCount}
            </Label>
          )}
        </NotIcon>
      }
      icon={false}
      options={options}
      direction="left"
      scrolling
      onClick={() => setNewsCount(0)}
    />
  )
}

export default NotificationDropdown
