import React, { useState, memo, useEffect } from "react";
import { Form, Select, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import { cloneDeep } from "lodash";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Admin = ({ menuType, setMenuType, form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const obj = cloneDeep(menuType.value);
        axios
          .put(`http://localhost:3000/users/${obj.id}`, {
            ...obj,
            ...values,
          })
          .then(() => {
            message.success("编辑成功");
            setMenuType({ type: "2" });
          });
      }
    });
  };
  console.log(menuType);
  return (
    <div>
      <h1>{menuType.value.user}客户编辑</h1>
      <Form onSubmit={handleSubmit} {...formItemLayout} className="login-form">
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="用户名">
              {getFieldDecorator("user", {
                initialValue: menuType.value.user,
                rules: [{ required: true, message: "请输入用户名" }],
              })(<Input placeholder="用户名" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="密码">
              {getFieldDecorator("password", {
                initialValue: menuType.value.password,
                rules: [{ required: true, message: "请输入密码" }],
              })(<Input placeholder="密码" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="电话">
              {getFieldDecorator("phone", {
                initialValue: menuType.value.phone,
              })(<Input placeholder="电话" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="邮箱">
              {getFieldDecorator("email", {
                initialValue: menuType.value.email,
              })(<Input placeholder="邮箱" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="地址">
              {getFieldDecorator("from", {
                initialValue: menuType.value.from,
              })(<Input placeholder="地址" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="login-form-button"
              >
                修改
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setMenuType({ type: "2" });
                }}
                className="login-form-button"
              >
                取消
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Form.create()(memo(Admin));
