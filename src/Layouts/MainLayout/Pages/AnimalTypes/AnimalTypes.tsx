import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import FirebaseService from '../../../../Services/FirebaseService'
import { setAnimalTypes } from '../../../../Redux/actions/app'
import './AnimalTypes.scss'
import AnimalType from '../../../../Redux/interfaces/AdditionalInterfaces/AnimalType'
import { AppState } from '../../../../Redux/interfaces/interfaces'
import { connect } from 'react-redux'
import { RootState } from '../../../../Redux'
import IconButton from '../../../../SharedComponents/IconButton/IconButton'
import { useForm } from 'react-hook-form'
import LoaderHorizontal from '../../../../SharedComponents/LoaderHorizontal/LoaderHorizontal'

interface AnimalTypesProps {
  setAnimalTypes: (animals: AnimalType[]) => void
  app: AppState
}

const firebaseService = new FirebaseService()

const AnimalTypes = (props: AnimalTypesProps) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalType>()

  useEffect(() => {
    getFirebaseData()
  }, [])

  const getAnimalTypes = async (): Promise<any> => {
    const animalTypes = await firebaseService.getAnimalTypes(props.app.firebaseApp)
    props.setAnimalTypes(animalTypes)
  }

  const getFirebaseData = async (): Promise<any> => {
    await getAnimalTypes()
    setLoading(false)
  }

  const removeType = async (id: string): Promise<any> => {
    const removeType = await firebaseService.delAnimalType(props.app.firebaseApp, id)
    const animalTypes = props.app.animalTypes.filter(at => at.id !== removeType.id)
    console.log('Удалён тип животного: ' + JSON.stringify(removeType))
      props.setAnimalTypes(animalTypes)
  }

  const addHandleClick = async (data: AnimalType): Promise<any> => {
    // console.log(data)
    const animalType = await firebaseService.addAnimalType(props.app.firebaseApp, data) as AnimalType
    if(animalType.id) {
      let animalTypes = props.app.animalTypes
      animalTypes.push(animalType)
      props.setAnimalTypes(animalTypes)
    }
  }

  return (
    <Container fluid className="AnimalTypes">
      <h1>Типы животных:</h1>

      {props.app.animalTypes[0] ? (
        <Container fluid className="p-0">
          {props.app.animalTypes.map((animalType, index) => {
            return (
              <Row key={index} className="AnimalTypes__Row m-0 align-items-center">
                <div className="AnimalTypes__name">{animalType.name}</div>
                <div className="AnimalTypes__action">
                  <IconButton
                    bgColor="#dc3545"
                    height={50}
                    title="Удалить тип"
                    width={250}
                    icon="/icons/delete.svg"
                    borderRadius="5px"
                    bgIconColor="#b62e3b"
                    onClickHandler={() => removeType(animalType.id)}
                  />
                </div>
              </Row>
            )
          })}
        </Container>
      ) : (
        <h2 className="text-danger">Не зарегистрировано типов животных</h2>
      )}

      <Row className="AnimalTypes__formCont m-0">
        <Form className="AnimalTypes__form">
          <Form.Group controlId="ageID">
            <Form.Label>Наименование типа животного:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите наименование типа животного"
              {...register('name', {
                required: { value: true, message: 'Обязательное для заполнения поле' },
                minLength: { value: 3, message: 'Минимальная длина строки 3 символ' },
                pattern: { value: /^[-_а-яА-Я]+$/i, message: 'Только кириллические символы' },
              })}
            />

            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
          </Form.Group>

          {buttonLoading ? (
            <LoaderHorizontal />
          ) : (
            <Button variant="primary" type="button" size="lg" onClick={handleSubmit((data) => addHandleClick(data))}>
              Добавить
            </Button>
          )}
        </Form>
      </Row>
    </Container>
  )
}

const mapDispatchToProps = {
  setAnimalTypes,
}

const mapStateToProps = (state: RootState) => {
  const app = state.app
  return {
    app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalTypes)
