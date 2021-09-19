import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Animal from '../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCardFields from '../../Redux/interfaces/AdditionalInterfaces/AnimalCardFields'
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
        <Col lg={11} xs={12} className="AnimalCard__infoCont">
          <Container fluid className="p-0">
            <Row className="m-0">
              <Col xs={1} className="AnimalCard__number p-0 d-flex justify-content-start align-items-center">
                {props.cardNumber}
              </Col>
              <Col xs={11} className="AnimalCard__animalInfo p-0">
                <div className="AnimalCard__animalInfoCont d-flex justify-content-start">
                  {Object.keys(props.animal).map((key, index) => {
                    const field = key as AnimalCardFields
                    return <AnimalCardElement key={index} animal={props.animal} field={field} />
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={1} xs={12} className="AnimalCard__actionCont"></Col>
      </Row>
    </Container>
  )
}

export default AnimalCard
