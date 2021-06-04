import React, { useState } from 'react'
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    // const [wrongPassword, setWrongPassword] = useState(false);
    
    const handleLogin = () => {
        console.log(user, password);
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    {/* <Image src='/logo.png' />  */}
                    <Icon name='users' color='blue' />
                    Huddle
                </Header>
                <Form size='large' onSubmit={handleLogin}>
                    <Segment stacked>
                        <Form.Input 
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='E-mail de Usuário'
                            onChange={(e, { name, value }) => setUser(value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Senha'
                            type='password'
                            onChange={(e, { name, value }) => setPassword(value)}
                            // error={{ content: 'Senha Incorreta' }}
                        />
                        <Button color='blue' fluid size='large'>
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