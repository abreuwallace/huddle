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

import awsExports from './aws-exports'

Amplify.configure(awsExports)

function App() {
  const [token, setToken] = useState()
  const [pendencys, setPendencys] = useState({})

  useEffect(() => {
    //console.log('useEffect')
    fetchPendencys()
  }, [])

  async function fetchPendencys() {
    try {
      const todoData = await API.graphql(graphqlOperation(listPendencys))
      let pendencys = {}
      todoData.data.listPendencys.items.forEach((item) => {
        pendencys[item.id] = item
      })
      setPendencys(pendencys)
      // setPendencys(todoData.data.listPendencys.items)
    } catch (err) {
      console.log('error fetching Pendencies')
    }
  }

  // async function addPendency() {
  //   try {
  //     const pendency = {
  //       id: '2',
  //       name: 'test02',
  //       department: 'Adm',
  //       createdBy: 'admin',
  //       // createdAt: new Date().toISOString(),
  //       status: 0,
  //     } // required schema example
  //     setPendencys({ ...pendencys, [pendency.id]: pendency })
  //     await API.graphql(graphqlOperation(createPendency, { input: pendency }))
  //   } catch (err) {
  //     console.log('error creating pendencies:', err)
  //   }
  // }

  // async function addUser() {
  //   try {
  //     const user = {
  //       login: "admin",
  //       id: "admin",
  //       password: "huddleAdmin!",
  //       department: "admin",
  //       profile: "0",
  //     }; // required schema example
  //     await API.graphql(graphqlOperation(createUser, { input: user }));
  //   } catch (err) {
  //     console.log("error creating User:", err);
  //   }
  // }

  // async function editPendency() {
  //   try {
  //     const pendency = {
  //       id: '2',
  //       //name: "test02",
  //       status: pendencys['2'].status + 1,
  //     } // required schema example
  //     setPendencys({ ...pendencys, [pendency.id]: pendency })
  //     await API.graphql(graphqlOperation(updatePendency, { input: pendency }))
  //   } catch (err) {
  //     console.log('error update pendency:', err)
  //   }
  // }

  if (!token?.id) {
    return <Login setToken={setToken} />
  }

  return (
    <Grid>
      <Grid.Row>
        <HuddleHeader setToken={setToken} pendencys={pendencys} setPendencys={setPendencys}/>
      </Grid.Row>
      {token?.profile > 1 && (
        <Grid.Row centered fluid>
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

/* src/App.js */

// import React, { useEffect, useState } from 'react'
// import Amplify, { API, graphqlOperation } from 'aws-amplify'
// import { createTodo } from './graphql/mutations'
// import { listTodos } from './graphql/queries'
// import { withAuthenticator } from '@aws-amplify/ui-react'

// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

// const initialState = { name: '', description: '' }

// const App = () => {
//   const [formState, setFormState] = useState(initialState)
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value })
//   }

//   async function fetchTodos() {
//     try {
//       const todoData = await API.graphql(graphqlOperation(listTodos))
//       const todos = todoData.data.listTodos.items
//       setTodos(todos)
//     } catch (err) { console.log('error fetching todos') }
//   }

//   async function addTodo() {
//     try {
//       if (!formState.name || !formState.description) return
//       const todo = { ...formState }
//       setTodos([...todos, todo])
//       setFormState(initialState)
//       await API.graphql(graphqlOperation(createTodo, {input: todo}))
//     } catch (err) {
//       console.log('error creating todo:', err)
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Amplify Todos</h2>
//       <input
//         onChange={event => setInput('name', event.target.value)}
//         style={styles.input}
//         value={formState.name}
//         placeholder="Name"
//       />
//       <input
//         onChange={event => setInput('description', event.target.value)}
//         style={styles.input}
//         value={formState.description}
//         placeholder="Description"
//       />
//       <button style={styles.button} onClick={addTodo}>Create Todo</button>
//       {
//         todos.map((todo, index) => (
//           <div key={todo.id ? todo.id : index} style={styles.todo}>
//             <p style={styles.todoName}>{todo.name}</p>
//             <p style={styles.todoDescription}>{todo.description}</p>
//           </div>
//         ))
//       }
//     </div>
//   )
// }

// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

// export default withAuthenticator(App)
