import React, { useState, useEffect } from 'react'
import { Button, Modal, Message } from 'semantic-ui-react'
import { deletePendency } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import _ from 'lodash'

const DeleteModal = ({visible, setVisible, pendency, pendencys, setPendencys }) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  useEffect(() => {
    if (visible) {
      setSubmitting(false)
      setSuccess(false)
    }
  }, [visible])

  async function handleSubmit() {
    setSubmitting(true)
    try {
      let pendency_ = {id: pendency.id}
      await API.graphql(graphqlOperation(deletePendency, { input: pendency_ }))
      setPendencys(_.omit(pendencys, pendency.id))
      setSuccess(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    } catch (err) {
      console.log('error removing pendencies:', err)
    }
    setSubmitting(false)
  }

  return (
    <Modal closeIcon onClose={() => setVisible(false)} open={visible} size="mini"> 
      <Modal.Header>Excluir Pendência</Modal.Header>
      <Modal.Content>
        <p>Tem certeza que deseja excluir a pendência</p>
        <Message positive attached hidden={!success} header='Pendência excluida'/>
      </Modal.Content>
      <Modal.Actions>
          <Button negative disabled={success||submitting} onClick={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button positive disabled={success||submitting} loading={submitting} onClick={() => handleSubmit()}>
            Excluir
          </Button>
        </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal