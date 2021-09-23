import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCardFields from '../../Redux/interfaces/AdditionalInterfaces/AnimalCardFields'
import IconButton from '../IconButton/IconButton'
import './AnimalCard.scss'
import AnimalCardElement from './AnimalCardElement/AnimalCardElement'

interface AnimalCardProps {
  cardNumber: number
  animal: Animal
}

const onDeleteClick = (id: string): void => {
  console.log(id)
}

const AnimalCard = (props: AnimalCardProps) => {
  const [animal, setAnimal] = useState<Animal>(props.animal)

  return (
    <Container fluid className="AnimalCard">
      <Row className="AnimalCard__row m-0">
        <Col md={1} xs={2} className="AnimalCard__num">
          <div className="AnimalCard__numCont d-flex justify-content-center align-items-center">
            № {props.cardNumber+1}
          </div>
        </Col>
        <Col md={11} xs={10} className="p-0">
          <Row className="AnimalCard__animalFields d-flex m-0">
            {Object.keys(props.animal).map((key, index) => {
              const field = key as AnimalCardFields
              if (field !== 'id') {
                return <AnimalCardElement key={index} animal={props.animal} field={field} />
              }
            })}
          </Row>
          <Row className="AnimalCard__cardActions m-0">
            <IconButton
              bgColor="#dc3545"
              height={50}
              title="Удалить карточку"
              width={250}
              icon="/icons/delete.svg"
              borderRadius="5px"
              bgIconColor="#b62e3b"
              onClickHandler={() => onDeleteClick(props.animal.id)}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default AnimalCard
