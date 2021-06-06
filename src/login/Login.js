import React, { useState } from 'react'
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { getUser } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

const Login = ({ setToken }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  // const [wrongPassword, setWrongPassword] = useState(false);

  async function handleLogin() {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: login }))
      //console.log('userData', userData)
      if (userData.data.getUser.password === password)
        setToken({
          id: userData.data.getUser.id,
          department: userData.data.getUser.department,
          profile: userData.data.getUser.profile,
        })
      else setStatus('error')
    } catch (err) {
      console.log('error fetching User', err)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          {/* <Image src='/logo.png' />  */}
          <Icon name="users" color="blue" />
          Huddle
        </Header>
        <Form size="large" onSubmit={() => handleLogin()}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail de Usuário"
              onChange={(e, { name, value }) => setLogin(value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Senha"
              type="password"
              onChange={(e, { name, value }) => setPassword(value)}
              error={status === 'error'}
            />
            {/* {status === 'error' && <Message error content="Senha ou Login Incorreto" />} */}
            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        {/* <Message>
                    Novo Usuário? <a href='#'>Inscreva-se</a>
                </Message> */}
      </Grid.Column>
    </Grid>
  )
}

export default Login
