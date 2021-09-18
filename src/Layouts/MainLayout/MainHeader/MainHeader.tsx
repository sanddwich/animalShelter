import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './MainHeader.scss'

interface MainHeaderProps {}

interface MainHeaderState {}

class MainHeader extends React.Component<MainHeaderProps, MainHeaderState> {
  

  render() {
    return (
      <Container fluid className="MainHeader">
        <Row className="MainHeader__row m-0">
          <div className="MainHeader__menuEl"><NavLink to="/">Животные</NavLink></div>
          <div className="MainHeader__menuEl"><NavLink to="/types">Тип животного</NavLink></div>
        </Row>
      </Container>
    )
  }
}

export default MainHeader
