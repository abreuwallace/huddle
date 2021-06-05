import React, { useState } from 'react'
import { Card, List, Icon, Grid, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/pt-br' // without this line it didn't work
import EditModal from './EditModal'
moment.locale('pt-br')

const ListItem = styled(List.Item)`
  margin-bottom: 3px;
`

const PendencyCards = ({ pendencys }) => {
  const [visible, setVisible] = useState(false)
  const [pendency, setPendency] = useState({})
  
  async function editPendency(pendency) {
    setPendency(pendency)
    setVisible(true)
    // gambiarra maxima
    await setTimeout(() => {
      setVisible(false)
    }, 100)
  }

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
          <Grid.Row  columns='equal' >
            <Grid.Column>
              <Icon name="time"/>
              {pendency.fineshedAt
                ? 'Concluído ' + moment(pendency.fineshedAt).fromNow()
                : 'Expiração do prazo ' + moment(pendency.deadline).fromNow()}
            </Grid.Column>
            <Grid.Column width={1}>
              <Button basic compact icon='ellipsis vertical' size='mini' floated='right' onClick={()=>editPendency(pendency)}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    }
  })

  return (
    // itemsPerRow={}
    <div>
      <EditModal visible={visible} pendency={pendency}></EditModal> 
      <Card.Group centered items={cards} style={{ marginLeft: '4vw' }}></Card.Group>
    </div>
  )
}

export default PendencyCards
