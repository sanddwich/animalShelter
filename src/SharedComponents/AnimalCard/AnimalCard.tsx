import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { RootState } from '../../Redux'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import { AppState } from '../../Redux/interfaces/interfaces'
import AnimalForm from '../AnimalForm/AnimalForm'
import IconButton from '../IconButton/IconButton'
import ModalWindow from '../ModalWindow/ModalWindow'
import './AnimalCard.scss'

interface AnimalCardProps {
  cardNumber: number
  animal: Animal
  app: AppState
  onDeleteClick: (id: string) => void
}

const AnimalCard = (props: AnimalCardProps) => {
  const getTypeName = (id: string): string => {
    const typeName = props.app.animalTypes.find((type) => type.id === id)?.name
    if (typeName) {
      return typeName
    }
    return 'Тип не определен'
  }

  const [animal, setAnimal] = useState<Animal>(props.animal)
  const [redactAnimal, setRedactAnimal] = useState<boolean>(false)

  const onUpdateAnimal = (animalRedact: Animal): void => {
    setAnimal(animalRedact)
  }

  return (
    <Container fluid className="AnimalCard">
      {redactAnimal && (
        <ModalWindow title="Изменить животное" closeHandler={() => setRedactAnimal(false)}>
          <AnimalForm
            animal={animal}
            closeHandler={() => setRedactAnimal(false)}
            onUpdateAnimal={(animalRedact: Animal) => onUpdateAnimal(animalRedact)}
          />
        </ModalWindow>
      )}

      <Row className="AnimalCard__row m-0">
        <Col md={1} xs={2} className="AnimalCard__num">
          <div className="AnimalCard__numCont d-flex justify-content-center align-items-center">
            № {props.cardNumber + 1}
          </div>
        </Col>
        <Col md={11} xs={10} className="p-0">
          <Row className="AnimalCard__animalFields d-flex m-0">
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">Возраст: </div>
              <div className="AnimalCardElement__data">{animal.age}</div>
            </div>
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">цвет: </div>
              <div className="AnimalCardElement__data">{animal.color}</div>
            </div>
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">Имя: </div>
              <div className="AnimalCardElement__data">{animal.name}</div>
            </div>
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">Пол: </div>
              <div className="AnimalCardElement__data">{animal.sex ? 'Муж.' : 'Жен.'}</div>
            </div>
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">Тип: </div>
              <div className="AnimalCardElement__data">{getTypeName(animal.type)}</div>
            </div>
            <div className="AnimalCardElement d-block">
              <div className="AnimalCardElement__title">Вес: </div>
              <div className="AnimalCardElement__data">{animal.weight}</div>
            </div>
          </Row>

          <Row className="AnimalCard__cardActions m-0">
            <div className="AnimalCard__redact pr-2 pb-2">
              <IconButton
                bgColor="#328ed5"
                height={50}
                title="Редактировать карточку"
                width={250}
                icon="/icons/redact.svg"
                borderRadius="5px"
                bgIconColor="#2c7bb8"
                onClickHandler={() => setRedactAnimal(true)}
              />
            </div>
            <div className="AnimalCard__remove">
              <IconButton
                bgColor="#dc3545"
                height={50}
                title="Удалить карточку"
                width={250}
                icon="/icons/delete.svg"
                borderRadius="5px"
                bgIconColor="#b62e3b"
                onClickHandler={() => props.onDeleteClick(props.animal.id)}
              />
            </div>
          </Row>
        </Col>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnimalCard)
