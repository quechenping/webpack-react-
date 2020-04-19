import React, { useState, memo, useEffect } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import axios from "axios";
const { Option } = Select;

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

const formItemLayout1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const Admin = ({ menuType, setMenuType, form }) => {
  const [data, setData] = useState([]);
  const { getFieldDecorator } = form;

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((resp) => {
      setData(resp.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let arr = data.find((item) => item.user === menuType.value.username); // user值
        console.log("arr", arr);
        let a = arr.delivery.findIndex(
          // 位置
          (item) => item.num === menuType.value.num
        );
        for (const key in values) {
          if (key.indexOf("_num") > -1) {
            const id = key.slice(0, -4);
            const Val = arr.delivery[a];
            const n = Val.data.findIndex((item) => item.id === id);
            Val.data[n].num = values[key];
          }
        }
        const obj = {
          ...arr.delivery[a],
          price: values.price,
          from: values.from,
          paytype:
            values.status === "2"
              ? 0
              : arr.delivery[a].paytype
              ? arr.delivery[a].paytype
              : 3,
          place: values.place,
        };
        arr.delivery.splice(a, 1, obj);
        console.log("arr2", arr);
        axios
          .patch(`http://localhost:3000/users/${arr.id}`, {
            delivery: arr.delivery,
          })
          .then(() => {
            message.success("编辑成功");
            setMenuType({ type: "1" });
          });
      }
    });
  };

  return (
    <div>
      <h1>{menuType.user}订单编辑</h1>
      <Form onSubmit={handleSubmit} {...formItemLayout} className="login-form">
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="总价">
              {getFieldDecorator("price", {
                initialValue: menuType.value.price,
                rules: [{ required: true, message: "请输入总价" }],
              })(<Input placeholder="总价" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="商品详情">
              {menuType.value.data.map((item) => (
                <Row key={item.id}>
                  <Col span={24}>
                    <Form.Item label={item.name} {...formItemLayout1}>
                      {getFieldDecorator(`${item.id}_num`, {
                        initialValue: item.num,
                      })(<InputNumber min={1} />)}
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="收货信息">
              {getFieldDecorator("from", {
                initialValue: menuType.value.from,
                rules: [{ required: true, message: "请输入地址" }],
              })(<Input placeholder="收货地址" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="订单状态">
              {getFieldDecorator("status", {
                initialValue: menuType.value.paytype ? "1" : "2",
              })(
                <Select>
                  <Option value="1">已支付</Option>
                  <Option value="2">未支付</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={7}>
            <Form.Item label="订单位置">
              {getFieldDecorator("place", {
                initialValue: menuType.value.place ? menuType.value.place : "1",
              })(
                <Select>
                  <Option value="1">运输中</Option>
                  <Option value="2">已送达</Option>
                </Select>
              )}
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
                  setMenuType({ type: "1" });
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
