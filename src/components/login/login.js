import React, { useState } from "react";
import { Input, Icon, Row, Col, Button, Form, Checkbox, message } from "antd";
import axios from "axios";
import "../index.less";

const Login = ({ form, setUser, setVisible, handleSign }) => {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, resetFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .get(
            `http://localhost:3000/users?user=${values.username}&&password=${values.password}`
          )
          .then(resp => {
            const data = resp.data;
            if (data.length === 0) {
              message.error("密码或用户名错误");
            } else {
              message.success("登录成功");
              resetFields();
              setVisible(false);
              setUser(data[0]);
            }
          })
          .catch(err => {
            message.error(err, "登录失败");
          });
        setLoading(false);
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Row>
          <Col span={8}>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
          </Col>
          <Col span={4} offset={8}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              className="login-form-button"
              onClick={handleSign}
            >
              注册
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(Login);
