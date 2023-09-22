import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Base from '../../Component/Base'
import CategorySideMenu from '../../Component/CategorySideMenu'

const UserCategory = () => {

  return (
    <Base>
      <Container className="mt">
          <Row className="mt-2">
              <Col md={3} className='pt-3 mt-4'>
                  <CategorySideMenu />
              </Col>
              <Col md={9}>
                  
              </Col>
          </Row>
      </Container>
    </Base>

  )
}

export default UserCategory