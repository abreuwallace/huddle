import React, { useState, useEffect } from 'react'
import { Modal, Form, Message } from 'semantic-ui-react'
import { updatePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

const ChangeStatusModal = ({ visible, setVisible, pendency, pendencys, setPendencys }) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState(0)

  const status_options = [
    { text: 'Aberto', value: 0 },
    { text: 'Em Andamento', value: 1 },
    { text: 'Concluído', value: 2 },
  ]

  useEffect(() => {
    setStatus(pendency.status)
    if (visible) {
      setSubmitting(false)
      setSuccess(false)
    }
  }, [visible, pendency])

  async function handleSubmit() {
    setSubmitting(true)

    let pendency_ = {
      id: pendency.id,
      status: status,
      fineshedAt: pendency.fineshedAt,
    }

    if (pendency.status < status && status === 2) {
      pendency_.fineshedAt = moment().toISOString()
    } else if (pendency.status > status && status !== 2) {
      pendency_.fineshedAt = null
    }

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
    <Modal closeIcon onClose={() => setVisible(false)} open={visible} size="mini">
      <Modal.Header>Alterar Status</Modal.Header>
      <Modal.Content>
        <Form onSubmit={() => handleSubmit()} loading={submitting}>
          <Form.Select
            fluid
            label="Status"
            options={status_options}
            defaultValue={pendency.status}
            onChange={(e, { name, value }) => setStatus(value)}
          />
          <Message positive hidden={!success} header="Status alterado com Sucesso" />
          <Form.Button content="Alterar" disabled={status === pendency.status || success} />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ChangeStatusModal
