import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Statistics from "./Statistics";
import LineChart from "./LineChart";
import Feed from "./Feed";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import Appointments from "./Appointments";
import Projects from "./Projects";
import BarChart from "./BarChart";
import Table from '../../../components/Table'

// const Default = () => (
//   <Container fluid className="p-0">

//     <Row>
//       <Col lg="6" xl="12" className="d-flex">
//         <Projects />
//       </Col>

//     </Row>
//   </Container>
// );


const Default = () => {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState({ value: 10, label: 10 })
  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="6" xl="12" className="d-flex">
          <Table page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} />
        </Col>
      </Row>
    </Container>
  )
}

export default Default;
