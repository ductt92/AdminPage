import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";
import { toastr } from 'react-redux-toastr'

import avatar from "../../assets/img/avatars/avatar.jpg";

const SignIn = () => {
  const [userName, setUserName] = useState("")
  const [pass, setPassWord] = useState("")
  const handleLogin = () => {
    // const dataConfig ={
    //   type: "ADMIN",
    //   "password": "Abc@123",
    //   "username": "admindev"
    // }
    const dataConfig = {
      type: "ADMIN",
      password: pass,
      username: userName
    }
    axios.post(`${BASE_URL}/login`, dataConfig)
      .then(res => {
        res.data && toastr.success("Thông báo", "Đăng nhập thành công")
        console.log(res, "s")
        localStorage.setItem("token", res.data?.data?.accessToken)
        window.location.replace('/')
      })
      .catch(err => toastr.error("Cảnh báo", "Đăng nhập không hợp lệ vui lòng thử lại"))
  }
  return (
    < React.Fragment >
      <Card>
        <CardBody>
          <div className="m-sm-4">
            <Form>
              <FormGroup>
                <Label>Tên đăng nhập</Label>
                <Input
                  bsSize="lg"
                  placeholder="Nhập tên đăng nhập "
                  defaultValue={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Mật khẩu</Label>
                <Input
                  bsSize="lg"
                  type="password"
                  name="password"
                  defaultValue={pass}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassWord(e.target.value)}

                />

              </FormGroup>

              <div className="text-center mt-3">
                <Button color="primary" size="lg" onClick={handleLogin}>
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </React.Fragment >
  )

}





export default SignIn;
