import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Config } from '../../../Config/Config'
import Animal from '../../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCardFields from '../../../Redux/interfaces/AdditionalInterfaces/AnimalCardFields'
import './AnimalCardElement.scss'

interface AnimalCardElementProps {
  animal: Animal
  field: AnimalCardFields
}

const AnimalCardElement = (props: AnimalCardElementProps) => {
  const [fieldData, setFieldData] = useState<string>(() => {    
    let returnData = ''
    Object.keys(props.animal).forEach(key => {
      const objKey = key as keyof typeof props.animal
      if (props.field === key) {
        returnData = props.animal[objKey].toString()
      }
    })
    return returnData
  })


  return (
    <Container fluid className="AnimalCardElement p-0 d-flex justify-content-start align-items-center">
      <div className="AnimalCardElement__title">{Config.tableFields.animals.get(props.field)}</div>
      <div className="AnimalCardElement__data">{fieldData}</div>
    </Container>
  )
}

export default AnimalCardElement