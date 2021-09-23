import React, { EffectCallback, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { RootState } from '../../../../Redux'
import { AppState } from '../../../../Redux/interfaces/interfaces'
import './Main.scss'

import FirebaseService from '../../../../Services/FirebaseService'
import AnimalType from '../../../../Redux/interfaces/AdditionalInterfaces/AnimalType'
import Animal from '../../../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCard from '../../../../SharedComponents/AnimalCard/AnimalCard'
import IconButton from '../../../../SharedComponents/IconButton/IconButton'
import ModalWindow from '../../../../SharedComponents/ModalWindow/ModalWindow'
import AnimalForm from '../../../../SharedComponents/AnimalForm/AnimalForm'

interface MainProps {
  app: AppState
}

const firebaseService = new FirebaseService()

const Main = (props: MainProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [animalTypes, setAnimalTypes] = useState<Array<AnimalType>>([])
  const [animals, setAnimals] = useState<Array<Animal>>([])
  const [addModal, setAddModal] = useState<boolean>(true)

  useEffect(() => {
    getFirebaseData()
  }, [])

  const getAnimalTypes = async (): Promise<any> => {
    const animalTypes = await firebaseService.getAnimalTypes(props.app.firebaseApp)
    setAnimalTypes(animalTypes)
  }

  const getAnimals = async (): Promise<any> => {
    const animals = await firebaseService.getAnimals(props.app.firebaseApp)
    setAnimals(animals)
  }

  const getFirebaseData = async (): Promise<any> => {
    await getAnimalTypes()
    await getAnimals()
    setLoading(true)
  }

  const onAddClick = (): void => {
    console.log('onAddClick')
  }

  const emptyAnimal: Animal = {
    id: '',
    age: 0,
    color: '',
    name: '',
    sex: true,
    type: '',
    weight: '',
  }

  return (
    <Container fluid className="Main">

      {addModal && (<ModalWindow title="Зарегистрировать животное" closeHandler={() => setAddModal(false)}>
        <AnimalForm />
      </ModalWindow>)}

      <h1>Приют домашних животных:</h1>
      <h3>Животные:</h3>
      <Row className="Main__Header m-0">
        {animals.map((animal, index) => {
          // console.log(animal)
          return <AnimalCard key={index} animal={animal} cardNumber={index} />
        })}
      </Row>
      <Row className="Main__addButton m-0">
        <IconButton
          bgColor="#198754"
          height={50}
          title="Добавить карточку"
          width={250}
          icon="/icons/delete.svg"
          borderRadius="5px"
          bgIconColor="#146f44"
          onClickHandler={() => onAddClick()}
        />
      </Row>
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
