import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import './AnimalCard.scss'
import AnimalCardElement from './AnimalCardElement/AnimalCardElement'

interface AnimalCardProps {
  cardNumber: number
  animal: Animal
}

const AnimalCard = (props: AnimalCardProps) => {
  const [animal, setAnimal] = useState<Animal>(props.animal)

  return (
    <Container fluid className="AnimalCard p-0">
      <Row className="AnimalCard__row m-0">
        <Col lg={8} xs={12} className="AnimalCard__infoCont">
          <Container fluid className="p-0">
            <Row className="m-0">
              <Col xs={2} className="AnimalCard__number">
                {props.cardNumber}
              </Col>
              <Col xs={10} className="AnimalCard__animalInfo d-flex justify-content-start">
                <AnimalCardElement animal={props.animal} field={'name'}/>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={4} xs={12} className="AnimalCard__actionCont"></Col>
      </Row>
    </Container>
  )
}

export default AnimalCard