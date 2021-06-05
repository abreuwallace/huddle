import React from 'react'
import { Card, List, Icon, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/pt-br' // without this line it didn't work
moment.locale('pt-br')

const ListItem = styled(List.Item)`
  margin-bottom: 3px;
`

const PendencyCards = ({ pendencys }) => {
  console.log('pendency', pendencys)

  const cards = Object.values(pendencys).map((pendency) => {
    return {
      header: pendency.name,
      meta: pendency.local,
      description: (
        <List>
          <ListItem>
            Status: {pendency.status === 0 ? 'Em Aberto' : pendency.status === 1 ? 'Em Andamento' : 'Concluído'}
          </ListItem>
          <ListItem>Criado em: {moment(pendency.createdAt).format('LLL')}</ListItem>
          <ListItem>
            {pendency.fineshedAt
              ? 'Conclusão: ' + moment(pendency.fineshedAt).format('LLL')
              : 'Prazo: ' + moment(pendency.deadline).format('LLL')}
          </ListItem>
          {/* <List.Item>Oranges</List.Item> */}
        </List>
      ),
      color: pendency.status === 0 ? 'red' : pendency.status === 1 ? 'yellow' : 'green',
      extra: (
        <Grid>
          <Grid.Column width={14}>
            <Icon name="time" />
            {pendency.fineshedAt
              ? 'Concluído ' + moment(pendency.fineshedAt).fromNow()
              : 'Expiração do prazo ' + moment(pendency.deadline).fromNow()}
          </Grid.Column>
          <Grid.Column floated="right" style={{ marginRight: '8px' }}>
            <Icon name="ellipsis vertical" />
          </Grid.Column>
        </Grid>
      ),
    }
  })

  return (
    // itemsPerRow={}
    <Card.Group centered items={cards} style={{ marginLeft: '4vw' }}></Card.Group>
  )
}

export default PendencyCards
