import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Config } from '../../../Config/Config'
import { RootState } from '../../../Redux'
import Animal from '../../../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalCardFields from '../../../Redux/interfaces/AdditionalInterfaces/AnimalCardFields'
import { AppState } from '../../../Redux/interfaces/interfaces'
import './AnimalCardElement.scss'

interface AnimalCardElementProps {
  animal: Animal
  field: AnimalCardFields
  app: AppState
}

const AnimalCardElement = (props: AnimalCardElementProps) => {
  const [fieldData, setFieldData] = useState<string>(() => {
    let returnData = ''
    Object.keys(props.animal).forEach((key) => {
      const objKey = key as keyof typeof props.animal
      if (props.field === key) {
        if (props.field !== 'type') {
          returnData = props.animal[objKey].toString()          
        } else {
          const type = props.app.animalTypes.find((animalType) => (animalType.id === props.animal.type))?.name
          type ? (returnData = type) : (returnData = 'тип не определен')
        }

        if (props.field === 'sex') {
          props.animal.sex ? (returnData = 'Муж.') : (returnData = 'Жен.')
        }
      }
    })
    return returnData
  })

  return (
    <div className="AnimalCardElement d-block">
      <div className="AnimalCardElement__title">{Config.tableFields.animals.get(props.field)}</div>
      <div className="AnimalCardElement__data">{fieldData}</div>
    </div>
  )
}

const mapDispatchToProps = {}

const mapStateToProps = (state: RootState) => {
  const app = state.app
  return {
    app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalCardElement)
