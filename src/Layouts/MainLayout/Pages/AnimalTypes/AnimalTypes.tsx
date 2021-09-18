import React from 'react'
import { Container } from 'react-bootstrap'
import './AnimalTypes.scss'

interface AnimalTypesProps {}

const AnimalTypes = (props: AnimalTypesProps) => {
  return (
    <Container fluid className="AnimalTypes">
      <h1>Типы животных:</h1>
    </Container>
  )
}

export default AnimalTypes