import React, { useState, useEffect } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react'
import { updatePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import 'moment/locale/pt-br' // without this line it didn't work
moment.locale('pt-br')

const EditModal = ({ visible, setVisible, pendency, pendencys, setPendencys }) => {
  const moment_format = 'LLL'

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [name, setName] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [equipment, setEquipment] = useState('')

  const [errorDeadline, setErrorDeadline] = useState(false)

  useEffect(() => {
    setDeadline(moment(pendency.deadline).format('LLL'))
    if (visible) {
      setSubmitting(false)
      setSuccess(false)
      setErrorDeadline(false)
    }
  }, [visible, pendency])

  const validateFields = () => {
    let isValid = true
    if (!moment(deadline, moment_format)._isValid) {
      setErrorDeadline(true)
      isValid = false
    } else {
      setErrorDeadline(false)
    }

    if (isValid) {
      handleSubmit()
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    let pendency_ = {
      id: pendency.id,
      name: name,
      local: local,
      description: description,
      deadline: moment(deadline, moment_format).toISOString(),
      equipment: equipment,
    }
    console.log(pendency_, name, local)
    try {
      let data = await API.graphql(graphqlOperation(updatePendency, { input: pendency_ }))
      let edited_pendency = data.data.updatePendency
      setPendencys({ ...pendencys, [edited_pendency.id]: edited_pendency })
      setSuccess(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    } catch (err) {
      console.log('error:', err)
    }
    setSubmitting(false)
  }

  return (
    <Modal closeIcon onClose={() => setVisible(false)} open={visible}>
      <Modal.Header>Gerenciar Pendência</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => validateFields()} loading={submitting}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              label="Nome"
              placeholder="Nome da Pendência"
              defaultValue={pendency.name}
              onChange={(e, { name, value }) => setName(value)}
            />
            <Form.Input
              fluid
              required
              label="Local"
              placeholder="Local da Pendência"
              defaultValue={pendency.local}
              onChange={(e, { name, value }) => setLocal(value)}
            />
          </Form.Group>
          <Form.Input
            fluid
            label="Descrição"
            placeholder="Descrição da Pendência"
            defaultValue={pendency.description}
            onChange={(e, { name, value }) => setDescription(value)}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              label="Prazo"
              placeholder="Prazo para resolver a Pendência"
              defaultValue={moment(pendency.deadline).format(moment_format)}
              onChange={(e, { name, value }) => setDeadline(value)}
              error={errorDeadline ? 'Data Inválida' : false}
            />
            <Form.Input
              fluid
              label="Equipamento"
              placeholder="Equipamento"
              defaultValue={pendency.equipment}
              onChange={(e, { name, value }) => setEquipment(value)}
            />
          </Form.Group>
          <Message positive hidden={!success} header="Salvo com Sucesso" />
          <Form.Button disabled={success} content="Salvar" />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EditModal
