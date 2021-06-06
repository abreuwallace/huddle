import React, { useState } from 'react'
import { Card, List, Icon, Grid, Dropdown, Label} from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/pt-br' // without this line it didn't work
import EditModal from '../Modals/EditModal'
import ChangeStatusModal from '../Modals/ChangeStatusModal'
import { deletePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import _ from 'lodash'
moment.locale('pt-br')

const ListItem = styled(List.Item)`
  margin-bottom: 3px;
`

const PendencyCards = ({ pendencys, setPendencys }) => {
  console.log(pendencys)
  const [visible, setVisible] = useState(false)
  const [visibleChangeStatus, setVisibleChangeStatus] = useState(false)
  const [pendency, setPendency] = useState({})

  function editPendency(pendency) {
    setPendency(pendency)
    setVisible(true)
  }
  function changeStatus(pendency) {
    setPendency(pendency)
    setVisibleChangeStatus(true)
  }

  async function removePendency(id) {
    try {
      await API.graphql(graphqlOperation(deletePendency, { input: { id } }))
      setPendencys(_.omit(pendencys, id))
    } catch (err) {
      console.log('error removing pendencies:', err)
    }
  }
  

  const cards = Object.values(pendencys).map((pendency) => {
    const Color = pendency.status === 0 ? 'red' : pendency.status === 1 ? 'yellow' : 'green'
    return {
      key: pendency.id,
      header: (
      <Grid>
        <Grid.Row columns="equal" width={12}>
          <Grid.Column>
            {pendency.name} 
          </Grid.Column>
          <Grid.Column width={6}  >
            <Label circular as='a' color = {Color}>
              {pendency.status === 0 ? 'Em Aberto' : pendency.status === 1 ? 'Em Andamento' : 'Concluído'}
            </Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      ),
      meta: pendency.local,
      description: (
        <List>
          <ListItem>
            Setor: {pendency.department}
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
      color: Color,
      extra: (
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Icon name="time" />
              {pendency.fineshedAt
                ? 'Concluído ' + moment(pendency.fineshedAt).fromNow()
                : 'Expiração do prazo ' + moment(pendency.deadline).fromNow()}
            </Grid.Column>
            <Grid.Column width={1} style={{ marginRight: '8px' }}>
              <Dropdown icon="ellipsis vertical">
                <Dropdown.Menu>
                  <Dropdown.Item icon="edit outline" text="Alterar Status" onClick={() => changeStatus(pendency)} />
                  <Dropdown.Item icon="edit" text="Editar Pendência" onClick={() => editPendency(pendency)} />
                  <Dropdown.Item icon="trash" text="Excluir Pendência" onClick={() => removePendency(pendency.id)} />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    }
  })

  return (
    // itemsPerRow={}
    <div>
      <EditModal visible={visible} setVisible={setVisible} pendency={pendency} pendencys={pendencys} setPendencys={setPendencys}></EditModal> 
      <ChangeStatusModal visible={visibleChangeStatus} setVisible={setVisibleChangeStatus} pendency={pendency} pendencys={pendencys} setPendencys={setPendencys}></ChangeStatusModal>
      <Card.Group centered items={cards} style={{ marginLeft: '4vw' }}></Card.Group>
    </div>
  )
}

export default PendencyCards
