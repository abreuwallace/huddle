import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react'
import { createPendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

const CreateModal = ({visible, setVisible, pendencys, setPendencys }) => {
  const moment_format = 'LLL'

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [equipment, setEquipment] = useState('')
  const [status, setStatus] = useState(0)

  const [errorDeadline, setErrorDeadline] = useState(false)

  const department_options = [
    { text: 'Enfermaria', value:'Enfermaria' },
    { text: 'Manutenção', value:'Manutenção' },
    { text: 'Administração ', value:'Administração ' },
    { text: 'Refeitório', value:'Refeitório' },
    { text: 'Outros', value:'Outros' },
  ]

  const status_options = [
    { text: 'Aberto', value:0 },
    { text: 'Em Andamento', value:1 },
    // { text: 'Concluído', value:2 },
  ]

  useEffect(() => {
    if (visible) {
      setSubmitting(false)
      setSuccess(false)
      setErrorDeadline(false)
      setDeadline(moment().add(1,'day').format(moment_format))
    }
  }, [visible])

  const validateFields = () => {
    let isValid = true

    if (!moment(deadline,moment_format)._isValid){
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
      name: name,
      description: description,
      department: department,
      local: local,
      description: description,
      deadline: moment(deadline, moment_format).toISOString(),
      equipment: equipment,
      status: status,
      createdBy: 'admin', // pegar o usuário
    }
    try {
      let data = await API.graphql(graphqlOperation(createPendency, { input: pendency_ }))
      let new_pendency = data.data.createPendency
      setPendencys({ ...pendencys, [new_pendency.id]: new_pendency })
      setSuccess(true)
    } catch (err) {
      console.log('error:', err)
    }
    setSubmitting(false)
  }

  return (
    <Modal closeIcon onClose={() => setVisible(false)} open={visible}>
      <Modal.Header>Nova Pendência</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => validateFields()} loading={submitting}>
          <Form.Group widths='equal'>
            <Form.Input fluid required
              label='Nome'
              placeholder='Nome da Pendência'
              onChange={(e, { name, value }) => setName(value)}
            />
          <Form.Select fluid required
            label='Setor'
            options={department_options}
            placeholder='Setor da Pendência'
            onChange={(e, { name, value }) => setDepartment(value)}
          />
          <Form.Input fluid required
            label='Local'
            placeholder='Local da Pendência'
            onChange={(e, { name, value }) => setLocal(value)}
          />
        </Form.Group>
        <Form.Input fluid
            label='Descrição'
            placeholder='Descrição da Pendência'
            onChange={(e, { name, value }) => setDescription(value)}
        />
        <Form.Group widths='equal'>
          <Form.Input fluid required
            label='Prazo'
            placeholder='Prazo para resolver a Pendência'
            defaultValue={deadline}
            onChange={(e, { name, value }) => setDeadline(value)}
            error={errorDeadline ? 'Data Inválida' : false}
          />
          <Form.Input fluid 
            label='Equipamento'
            placeholder='Equipamento'
            onChange={(e, { name, value }) => setEquipment(value)}
          />
          <Form.Select fluid
            label='Status'
            options={status_options}
            defaultValue={status}
            onChange={(e, { name, value }) => setStatus(value)}
          />
        </Form.Group>
        <Message positive hidden={!success} header='Criado com Sucesso'/>
        <Form.Button content='Criar' />
      </Form>
      </Modal.Content>
    </Modal>
  )
}

export default CreateModal