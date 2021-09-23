import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import LoaderHorizontal from '../LoaderHorizontal/LoaderHorizontal'
import './AnimalForm.scss'

interface AnimalFormProps {}

const AnimalForm = (props: AnimalFormProps) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Animal>()

  const handleClick = (data: Animal): void => {
    console.log(data)
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
              pattern: { value: /^[0-9]+$/i, message: 'Только кириллические символы' },
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
          <Form.Label>Цвет</Form.Label>
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
            <Form.Check {...register('sex', {required: true})} label="Муж." id="1" type="radio" defaultChecked value={1}/>
            <Form.Check {...register('sex', {required: true})} label="Жен." id="0" type="radio" value={0} />
          </div>

          {errors.color && <Form.Text className="text-danger">{errors.color.message}</Form.Text>}
        </Form.Group>

        {buttonLoading ? (
          <LoaderHorizontal />
        ) : (
          <Button variant="primary" type="button" size="lg" onClick={handleSubmit((data) => handleClick(data))}>
            Добавить
          </Button>
        )}
      </Form>
    </Container>
  )
}

export default AnimalForm
