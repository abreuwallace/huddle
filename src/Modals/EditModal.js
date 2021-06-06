import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react'
import { updatePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import 'moment/locale/pt-br' // without this line it didn't work
moment.locale('pt-br')

const EditModal = ({visible, setVisible, pendency}) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [name, setName] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState(0)

  const [errorDeadline, setErrorDeadline] = useState(false)

  const status_options = [
    { text: 'Aberto', value:0 },
    { text: 'Em Andamento', value:1 },
    { text: 'Concluído', value:2 },
  ]

  useEffect(() => {
    if (visible) {
      setSubmitting(false)
      setSuccess(false)
      setErrorDeadline(false)
      setName(pendency.name)
      setLocal(pendency.local)
      setDescription(pendency.description)
      setDeadline(moment(pendency.deadline).format('LLL'))
      setStatus(pendency.status)
    }
  }, [visible])

  const validateFields = () => {
    let isValid = true

    if (!moment(deadline,'LLL')._isValid){
      setErrorDeadline(true)
      isValid = false
    } else{
      setErrorDeadline(false)
    }

    if (isValid){
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
      deadline: moment(deadline,'LLL'),
      status: status,
      // fineshedAt:
    }
    try {
      let data = await API.graphql(graphqlOperation(updatePendency, { input: pendency_ }))
      console.log('data:',data)
      // SINALIZAR Q FOI SALVO E ATUALIZAR O MURAL DPS
      setSuccess(true)
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
          <Form.Group widths='equal'>
            <Form.Input fluid required
              id='form-subcomponent-shorthand-input-name'
              label='Nome'
              placeholder='Nome da Pendência'
              defaultValue={name}
              onChange={(e, { name, value }) => setName(value)}
            />
          <Form.Input fluid required
            id='form-subcomponent-shorthand-input-local'
            label='Local'
            placeholder='Local da Pendência'
            defaultValue={local}
            onChange={(e, { name, value }) => setLocal(value)}
          />
        </Form.Group>
        <Form.Input fluid
            id='form-subcomponent-shorthand-input-description'
            label='Descrição'
            placeholder='Descrição da Pendência'
            defaultValue={description}
            onChange={(e, { name, value }) => setDescription(value)}
        />
        <Form.Group widths='equal'>
          <Form.Input fluid required
            id='form-subcomponent-shorthand-input-deadline'
            label='Prazo'
            placeholder='Prazo para resolver a Pendência'
            defaultValue={deadline}
            onChange={(e, { name, value }) => setDeadline(value)}
            error={errorDeadline ? 'Data Inválida' : false}
          />
          <Form.Select fluid
            id='form-subcomponent-shorthand-input-status'
            label='Status'
            options={status_options}
            defaultValue={status}
            onChange={(e, { name, value }) => setStatus(value)}
          />
        </Form.Group>
        <Message positive hidden={!success} header='Salvo com Sucesso'/>
        <Form.Button content='Salvar' />
      </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EditModal