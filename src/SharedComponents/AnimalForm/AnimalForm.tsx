import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { RootState } from '../../Redux'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import { AppState } from '../../Redux/interfaces/interfaces'
import FirebaseService from '../../Services/FirebaseService'
import LoaderHorizontal from '../LoaderHorizontal/LoaderHorizontal'
import { setAnimals } from '../../Redux/actions/app'
import './AnimalForm.scss'
import AnimalToFB from '../../Redux/interfaces/AdditionalInterfaces/AnimalToFB'

interface AnimalFormProps {
  animal?: Animal
  app: AppState
  setAnimals: (animals: Animal[]) => void
  closeHandler: () => void
  onUpdateAnimal?: (animal: Animal) => void
}

const firebaseService = new FirebaseService()

const AnimalForm = (props: AnimalFormProps) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   console.log(props.animal)
  // },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Animal>({
    defaultValues: {
      id: props.animal ? props.animal.id : '',
      age: props.animal ? props.animal.age : 0,
      color: props.animal ? props.animal.color : '',
      name: props.animal ? props.animal.name : '',
      sex: props.animal ? props.animal.sex : true,
      weight: props.animal ? props.animal.weight : '',
      type: props.animal ? props.animal.type : '',
    },
  })

  const bodyUnBlock = (): void => {
    document.querySelector('body')?.classList.remove('modal-open')
  }

  const addHandleClick = async (data: Animal): Promise<any> => {
    // console.log(data)
    setButtonLoading((prevState) => {
      return !prevState
    })
    const addAnimalToFB: AnimalToFB = {...data}
    const addedAnimal = (await firebaseService.addAnimal(props.app.firebaseApp, addAnimalToFB)) as Animal
    if (addedAnimal.id) {
      let animals: Animal[] = props.app.animals
      animals.push(addedAnimal)
    }

    setButtonLoading((prevState) => {
      return !prevState
    })

    bodyUnBlock()
    
    props.closeHandler()
  }

  const redactHandleClick = async (data: Animal): Promise<any> => {
    setButtonLoading((prevState) => {
      return !prevState 
    })
    
    const redactAnimal = (await firebaseService.setAnimal(props.app.firebaseApp, data.id, data)) as Animal
    if (redactAnimal.id) {
      const animals: Animal[] = props.app.animals.map(animal => {
        if (animal.id === redactAnimal.id) {
          return redactAnimal
        } else {
          return animal
        }
      })

      props.onUpdateAnimal && props.onUpdateAnimal(redactAnimal)

      setAnimals(animals)
    }

    setButtonLoading((prevState) => {
      return !prevState
    })

    bodyUnBlock()
    props.closeHandler()
  }

  return (
    <Container className="AnimalForm">
      <Form>
        <Form.Group controlId="ageID">
          <Form.Label>Возраст</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите возраст"
            {...register('age', {
              required: { value: true, message: 'Обязательное для заполнения поле' },
              minLength: { value: 1, message: 'Минимальная длина строки 1 символ' },
              pattern: { value: /^[0-9]+$/i, message: 'Только целое положительное число' },
            })}
          />

          {errors.age && <Form.Text className="text-danger">{errors.age.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="colorID">
          <Form.Label>Цвет</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите цвет"
            {...register('color', {
              required: { value: true, message: 'Обязательное для заполнения поле' },
              minLength: { value: 5, message: 'Минимальная длина строки 5 символов' },
              pattern: { value: /^[\s-а-яА-Я]+$/i, message: 'Только кириллические символы' },
            })}
          />

          {errors.color && <Form.Text className="text-danger">{errors.color.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="nameID">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            {...register('name', {
              required: { value: true, message: 'Обязательное для заполнения поле' },
              minLength: { value: 3, message: 'Минимальная длина строки 3 символа' },
              pattern: { value: /^[\s-а-яА-Я]+$/i, message: 'Только кириллические символы' },
            })}
          />

          {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="radioID">
          <Form.Label>Пол животного</Form.Label>
          <div key={`radio`} className="mb-3">
            <Form.Check
              {...register('sex', { required: true })}
              label="Муж."
              id="1"
              type="radio"
              defaultChecked
              value={1}
            />
            <Form.Check {...register('sex', { required: true })} label="Жен." id="0" type="radio" value={0} />
          </div>
        </Form.Group>

        <Form.Group controlId="typeID">
          <Form.Label>Тип жтвотного</Form.Label>
          <select className="form-control" {...register('type', { required: true })} defaultChecked>
            {props.app.animalTypes.map((animalType, index) => {
              return (
                <option key={index} value={`${animalType.id}`}>
                  {animalType.name}
                </option>
              )
            })}
          </select>
        </Form.Group>

        <Form.Group controlId="weightID">
          <Form.Label>Вес</Form.Label>
          <Form.Control
            type="text"
            placeholder="Укажите вес"
            {...register('weight', {
              required: { value: true, message: 'Обязательное для заполнения поле' },
              minLength: { value: 1, message: 'Минимальная длина строки 1 символ' },
              pattern: { value: /^[\s.0-9]+$/i, message: 'Только цифры и "."' },
            })}
          />

          {errors.weight && <Form.Text className="text-danger">{errors.weight.message}</Form.Text>}
        </Form.Group>

        {buttonLoading ? (
          <LoaderHorizontal />
        ) : (
          <div className="buttonContainer">
            {props.animal ? (
              <Button variant="primary" type="button" size="lg" onClick={handleSubmit((data) => redactHandleClick(data))}>
                Изменить
              </Button>
            ) : (
              <Button variant="primary" type="button" size="lg" onClick={handleSubmit((data) => addHandleClick(data))}>
                Добавить
              </Button>
            )}
          </div>
        )}
      </Form>
    </Container>
  )
}

const mapDispatchToProps = {
  setAnimals,
}

const mapStateToProps = (state: RootState) => {
  const app = state.app
  return {
    app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalForm)
