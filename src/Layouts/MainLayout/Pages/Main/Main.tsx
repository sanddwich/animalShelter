import React, { EffectCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { RootState } from '../../../../Redux'
import { AppState } from '../../../../Redux/interfaces/interfaces'
import './Main.scss'

import FirebaseService from '../../../../Services/FirebaseService'
import AnimalType from '../../../../Redux/interfaces/AdditionalInterfaces/AnimalType'
import Animal from '../../../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCard from '../../../../SharedComponents/AnimalCard/AnimalCard'

interface MainProps {
  app: AppState
}

const firebaseService = new FirebaseService()

const Main = (props: MainProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [animalTypes, setAnimalTypes] = useState<Array<AnimalType>>([])  
  const [animals, setAnimals] = useState<Array<Animal>>([])

  useEffect(() => {
    getFirebaseData()
  }, [])

  const getAnimalTypes = async ():Promise<any> => {    
    const animalTypes = await firebaseService.getAnimalTypes(props.app.firebaseApp)
    setAnimalTypes(animalTypes)
  }

  const getAnimals = async ():Promise<any> => {
    const animals = await firebaseService.getAnimals(props.app.firebaseApp)
    setAnimals(animals)
  }

  const getFirebaseData = async ():Promise<any> => {
    await getAnimalTypes()    
    await getAnimals()
    setLoading(true)
  }

  return (
    <Container fluid className="Main">
      <h1>Приют домашних животных:</h1>
      <h3>Животные:</h3>
      {animals.map((animal, index) => {
        return <AnimalCard key={index} animal={animal} cardNumber={index} />
      })}
      <p>Типы животных: {JSON.stringify(animalTypes)}</p>
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
