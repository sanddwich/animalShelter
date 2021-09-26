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
import { setAnimalTypes, setAnimals } from '../../../../Redux/actions/app'

interface MainProps {
  app: AppState
  setAnimals: (animals: Animal[]) => void
  setAnimalTypes: (animals: AnimalType[]) => void
}

const firebaseService = new FirebaseService()

const Main = (props: MainProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [addModal, setAddModal] = useState<boolean>(false)
  const [redactAnimal, setRedactAnimal] = useState<Animal | undefined>(undefined)
  const [updateParam, setUpdateParam] = useState<string>(Math.random().toString())

  useEffect(() => {
    getFirebaseData()
  }, [])

  const getAnimalTypes = async (): Promise<any> => {
    const animalTypes = await firebaseService.getAnimalTypes(props.app.firebaseApp)
    props.setAnimalTypes(animalTypes)
  }

  const getAnimals = async (): Promise<any> => {
    const animals = await firebaseService.getAnimals(props.app.firebaseApp)
    props.setAnimals(animals)
  }

  const getFirebaseData = async (): Promise<any> => {
    await getAnimalTypes()
    await getAnimals()
    setLoading(false)
  }

  const deleteAnimal = async (id: string): Promise<any> => {
    // console.log(id)
    const delAnimal = (await firebaseService.delAnimal(props.app.firebaseApp, id)) as Animal
    if (delAnimal.id) {
      const animals = props.app.animals.filter((animal) => animal.id !== delAnimal.id)
      console.log('Удалено животное: ' + JSON.stringify(delAnimal))
      props.setAnimals(animals)
    }
  }

  return (
    <Container fluid className="Main">
      {addModal && (
        <ModalWindow title="Зарегистрировать животное" closeHandler={() => setAddModal(false)}>
          <AnimalForm closeHandler={() => setAddModal(false)} />
        </ModalWindow>
      )}

      <h1>Приют домашних животных:</h1>
      <h3>Животные:</h3>

      {props.app.animals[0] ? (
          <Row id={updateParam} className="Main__Header m-0">
            {props.app.animals.map((animal, index) => {
              // console.log(animal)
              return (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  cardNumber={index}
                  onDeleteClick={(id: string) => deleteAnimal(id)}
                />
              )
            })}
          </Row>
        ) : (
          <h2 className="text-danger">Не зарегистрировано животных</h2>
        )}

      <Row className="Main__addButton m-0">
        <IconButton
          bgColor="#198754"
          height={50}
          title="Добавить карточку"
          width={250}
          icon="/icons/delete.svg"
          borderRadius="5px"
          bgIconColor="#146f44"
          onClickHandler={() => setAddModal(true)}
        />
      </Row>
      {/* <p>Типы животных: {JSON.stringify(props.app.animalTypes)}</p> */}
    </Container>
  )
}

const mapDispatchToProps = {
  setAnimals,
  setAnimalTypes,
}

const mapStateToProps = (state: RootState) => {
  const app = state.app
  return {
    app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
