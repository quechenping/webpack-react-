import React from "react";
import { Input, Icon, Row, Col, Button, Form, message } from "antd";
import { Link } from "react-router-dom";
import "./index.less";

const Login = ({ form, setRootUser }) => {
  const { getFieldDecorator } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (values.username === "admin" && values.password === "Admin@123") {
          setRootUser({ user: "admin", password: "Admin@123" });
          message.success("登录成功");
        } else {
          message.error("用户名或密码错误");
        }
      }
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>后台管理</h1>
      <div className="login">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            <Row>
              <Col span={10} offset={7}>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名" }],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={10} offset={7}>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码" }],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              <Button
                className="login-form-button"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setMenuType({ type: "1" });
                }}
              >
                <Link to="/">取消</Link>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Form.create()(Login);
