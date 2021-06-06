import React, { useState, useEffect } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Login from './login/Login'
import HuddleHeader from './header/HuddleHeader'
import PendencyCards from './cards/PendencyCards'
import 'semantic-ui-css/semantic.min.css'
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
// import {
//   createPendency,
//   updatePendency,
//   createUser,
// } from './graphql/mutations'
import { listPendencys } from './graphql/queries'
import { onCreatePendency, onUpdatePendency, onDeletePendency } from './graphql/subscriptions'
import _ from 'lodash'
import moment from 'moment'

import awsExports from './aws-exports'

Amplify.configure(awsExports)

function App() {
  const [token, setToken] = useState()
  const [pendencys, setPendencys] = useState({})
  const [notifications, setNotifications] = useState({})

  useEffect(() => {
    fetchPendencys()
  }, [])

  useEffect(() => {
    const sub = API.graphql(graphqlOperation(onCreatePendency)).subscribe({
      next: ({ provider, value }) => {
        //console.log('createSub', { value, pendencys, provider })
        const newPendency = value.data.onCreatePendency
        if (!pendencys[newPendency.id]) setPendencys({ ...pendencys, [newPendency.id]: newPendency })
      },
      error: (error) => console.warn('error', error),
    })

    return () => sub.unsubscribe()
  }, [pendencys])

  useEffect(() => {
    const sub = API.graphql(graphqlOperation(onUpdatePendency)).subscribe({
      next: ({ provider, value }) => {
        //console.log('updateSub', { value, pendencys, provider })
        const newPendency = value.data.onUpdatePendency
        setPendencys({ ...pendencys, [newPendency.id]: newPendency })
      },
      error: (error) => console.warn('error', error),
    })

    return () => sub.unsubscribe()
  }, [pendencys])

  useEffect(() => {
    const sub = API.graphql(graphqlOperation(onDeletePendency)).subscribe({
      next: ({ provider, value }) => {
        //console.log('onDeletePendency', { value, pendencys, provider })
        const deletedPendency = value.data.onDeletePendency
        setPendencys(_.omit(pendencys, deletedPendency.id))
      },
      error: (error) => console.warn('error', error),
    })

    return () => sub.unsubscribe()
  }, [pendencys])

  async function fetchPendencys() {
    try {
      const todoData = await API.graphql(graphqlOperation(listPendencys))
      let startPendencys = {}
      let startNotifications = {}
      todoData.data.listPendencys.items.forEach((item) => {
        startPendencys[item.id] = item
        if (item.fineshedAt) {
          startNotifications[item.id] = {
            name: `Pendência ${item.name}`,
            when: `Concluída ${moment(item.fineshedAt).fromNow()}`,
            time: item.fineshedAt,
            icon: 'check',
          }
        } else {
          if (item.updatedAt !== item.createdAt) {
            startNotifications[item.id] = {
              //message: `Pendência ${item.name} Alterada ${moment(item.updatedAt).fromNow()}`,
              name: `Pendência ${item.name}`,
              when: `Alterada ${moment(item.updatedAt).fromNow()}`,
              time: item.updatedAt,
              icon: 'edit',
            }
          } else {
            startNotifications[item.id] = {
              //message: `Pendência ${item.name} Criada ${moment(item.createdAt).fromNow()}`,
              name: `Pendência ${item.name}`,
              when: `Criada ${moment(item.createdAt).fromNow()}`,
              time: item.createdAt,
              icon: 'plus',
            }
          }
        }
      })
      setPendencys(startPendencys)
      setNotifications(startNotifications)
    } catch (err) {
      console.log('error fetching Pendencies')
    }
  }

  if (!token?.id) {
    return <Login setToken={setToken} />
  }

  return (
    <Grid>
      <Grid.Row>
        <HuddleHeader
          setToken={setToken}
          pendencys={pendencys}
          setPendencys={setPendencys}
          notifications={notifications}
        />
      </Grid.Row>
      {token?.profile > 1 && (
        <Grid.Row centered>
          <Header as="h2" icon="address card outline" content={token.department} />
        </Grid.Row>
      )}
      {/* style={{ height: '80vh' }} */}
      <Grid.Row>
        {/* <h1 onClick={() => addPendency()}>{pendencys['2'].status}</h1>
        <br />
        <h1 onClick={() => editPendency()}>{pendencys['0'].status}</h1> */}
        <PendencyCards pendencys={pendencys} setPendencys={setPendencys} />
      </Grid.Row>
    </Grid>
  )
}

export default App
