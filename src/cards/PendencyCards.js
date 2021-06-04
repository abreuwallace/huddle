import React from 'react'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'

const HuddleCard = styled(Card)`
  width: 16vw !important;
`

const PendencyCards = () => {
  return (
    <Card.Group itemsPerRow={5} centered>
      <HuddleCard color="red" />
      <HuddleCard color="orange" />
      <HuddleCard color="yellow" />
      <HuddleCard color="olive" />
      <HuddleCard color="green" />
      <HuddleCard color="teal" />
      <HuddleCard color="blue" />
      <HuddleCard color="violet" />
      <HuddleCard color="purple" />
      <HuddleCard color="pink" />
      <HuddleCard color="brown" />
      <HuddleCard color="grey" />
      <HuddleCard color="red" />
      <HuddleCard color="orange" />
      <HuddleCard color="yellow" />
    </Card.Group>
  )
}

export default PendencyCards
