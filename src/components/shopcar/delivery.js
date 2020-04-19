import React, { memo, useEffect, useState, useContext } from "react";
import { Row, Col, message, Divider, Form, Input } from "antd";
import { ValueContext } from "../context";
import moment from "moment";
import axios from "axios";
import "../index.less";

const ShopCar = ({ price, form }) => {
  const { user, setUser, setMenuType } = useContext(ValueContext);
  const a = Math.random().toString().slice(2);
  const { getFieldDecorator } = form;
  const handleSubmit = (type) => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(user);
        axios.get(`http://localhost:3000/users/${user.id}`).then((resp) => {
          console.log(1, resp);
          const arr = [
            ...resp.data.delivery,
            {
              data: resp.data.shopcart,
              price,
              creatTime: moment().format("YYYY-MM-DD HH:mm:ss"),
              num: a,
              paytype: type,
              ...values,
            },
          ];
          axios
            .patch(`http://localhost:3000/users/${user.id}`, {
              shopcart: [],
            })
            .then(() => {
              console.log("arr", arr);
              axios
                .patch(`http://localhost:3000/users/${user.id}`, {
                  delivery: arr,
                })
                .then(() => {
                  message.success("提交成功");
                  setMenuType({ type: "5" });
                  setUser({ ...user, shopcart: [] });
                });
            });
        });
      }
    });
  };

  return (
    <div>
      <h1 style={{ fontSize: 32 }}>确认收货信息</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item label="收货人">
          {getFieldDecorator("username", {
            initialValue: user.user,
            rules: [{ required: true, message: "请输入收货人" }],
          })(<Input placeholder="收货人" />)}
        </Form.Item>
        <Form.Item label="收货电话">
          {getFieldDecorator("phone", {
            initialValue: user.phone,
            rules: [{ required: true, message: "请输入收货电话" }],
          })(<Input placeholder="收货电话" />)}
        </Form.Item>
        <Form.Item label="收货地址">
          {getFieldDecorator("from", {
            initialValue: user.from,
            rules: [{ required: true, message: "请输入收货地址" }],
          })(<Input placeholder="收货地址" />)}
        </Form.Item>
      </Form>
      <Divider style={{ margin: "40px 0px" }} />
      <div>
        <h1 style={{ fontSize: 32 }}>选择支付方式</h1>
        <span style={{ fontSize: "1.5em" }}>订单编号：{a}</span>
        <br />
        <span style={{ fontSize: "1.5em" }}>订单总金额：¥{price}</span>
        <Row gutter={32}>
          <Col span={4}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmit(1);
              }}
            >
              <img
                src={require(`../../img/wechat.jpg`).default}
                alt="加载中"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
          <Col span={4}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmit(2);
              }}
            >
              <img
                src={require(`../../img/alipay.jpg`).default}
                alt="加载中"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
          <Col span={4}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmit(3);
              }}
            >
              <img
                src={require(`../../img/offline.jpg`).default}
                alt="加载中"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Form.create()(memo(ShopCar));
