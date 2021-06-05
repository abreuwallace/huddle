import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { updatePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'

const EditModal = ({visible, pendency}) => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const [name, setName] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState(0)

  const status_options = [
    { text: 'Aberto', value:0 },
    { text: 'Em Andamento', value:1 },
    { text: 'Concluído', value:2 },
  ]

  useEffect(() => {
    if (visible) {
      setOpen(true)
      setSubmitting(false)
      setName(pendency.name)
      setLocal(pendency.local)
      setDescription(pendency.description)
      setDeadline(pendency.deadline)
      setStatus(pendency.status)
    }
  }, [visible])

  async function handleSubmit() {
    setSubmitting(true)
    let pendency_ = {
      id: pendency.id,
      name: name,
      local: local,
      description: description,
      deadline: deadline,
      status: status
    }
    try {
      let data = await API.graphql(graphqlOperation(updatePendency, { input: pendency_ }))
      console.log('data:',data)
      // SINALIZAR Q FOI SALVO E ATUALIZAR O MURAL DPS
      setOpen(false)
    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <Modal closeIcon onClose={() => setOpen(false)} open={open}>
      <Modal.Header>Gerenciar Pendência</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => handleSubmit()}>
          <Form.Group widths='equal'>
            <Form.Input fluid
              id='form-subcomponent-shorthand-input-name'
              label='Nome'
              placeholder='Nome da Pendência'
              defaultValue={name}
              onChange={(e, { name, value }) => setName(value)}
            />
          <Form.Input fluid
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
          <Form.Input fluid
            id='form-subcomponent-shorthand-input-deadline'
            label='Prazo'
            placeholder='Prazo para resolver a Pendência'
            defaultValue={deadline}
            // onChange={(e, { name, value }) => setDeadline(value)}
          />
          <Form.Select fluid
            id='form-subcomponent-shorthand-input-status'
            label='Status'
            options={status_options}
            defaultValue={status}
            onChange={(e, { name, value }) => setStatus(value)}
          />
        </Form.Group>
        <Form.Button content='Salvar' loading={submitting} disabled={submitting} />
      </Form>
      </Modal.Content>
      {/* <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Salvar"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions> */}
    </Modal>
  )
}

export default EditModal