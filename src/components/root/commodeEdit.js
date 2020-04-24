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
          .put(`http://localhost:3000/data/${obj.id}`, {
            ...obj,
            ...values,
          })
          .then(() => {
            message.success("编辑成功");
            setMenuType({ type: "3" });
          });
      }
    });
  };
  console.log(menuType);
  return (
    <div>
      <h1>{menuType.value.name}商品编辑</h1>
      <Form onSubmit={handleSubmit} {...formItemLayout} className="login-form">
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="名称">
              {getFieldDecorator("name", {
                initialValue: menuType.value.name,
                rules: [{ required: true, message: "请输入名称" }],
              })(<Input placeholder="名称" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="介绍">
              {getFieldDecorator("val", {
                initialValue: menuType.value.val,
                rules: [{ required: true, message: "请输入介绍" }],
              })(<Input.TextArea placeholder="介绍" rows={4} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="价格">
              {getFieldDecorator("price", {
                initialValue: menuType.value.price,
              })(<Input placeholder="价格" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="成色">
              {getFieldDecorator("chense", {
                initialValue: menuType.value.chense,
              })(<Input placeholder="成色" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="类目">
              {getFieldDecorator("type", {
                initialValue: menuType.value.type,
              })(<Input placeholder="类目" />)}
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
                  setMenuType({ type: "3" });
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
