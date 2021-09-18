import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { RootState } from '../../../../Redux'
import { AppState } from '../../../../Redux/interfaces/interfaces'
import './Main.scss'

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { Config } from '../../../../Config/Config'
import FirebaseService from '../../../../Services/FirebaseService'

interface MainProps {
  app: AppState
}

const Main = (props: MainProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  
  const getFirebase = async () => {
    const firebaseService = new FirebaseService()
    // const animals = await firebaseService.getAnimals(props.app.firebaseApp)
    const animal = await firebaseService.getAnimal(props.app.firebaseApp, '2tklZfQGIZbQN8SyMGPJ')
    // const updatedAnimal = await firebaseService.setAnimal(props.app.firebaseApp, '2tklZfQGIZbQN8SyMGPJ', {...animal, name: "Бобик"})
    // console.log(await firebaseService.addAnimal(props.app.firebaseApp, {...animal, name: "Новое животное"}))
    // console.log(await firebaseService.delAnimal(props.app.firebaseApp, 'ThPAAk3AXNzNdO7TZI0p'))
  }

  useEffect(() => {
    getFirebase()
  }, [])

  return (
    <Container fluid className="Main">
      <h1>Приют домашних животных:</h1>
    </Container>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = (state: RootState) => {
  const app = state.app
  return {
    app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
