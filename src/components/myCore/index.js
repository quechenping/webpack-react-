import React, { memo, useEffect, useState, useContext } from "react";
import { Row, Col, Form, Divider, Input, Button, message } from "antd";
import { ValueContext } from "../context";
import axios from "axios";

const MyCore = ({ form }) => {
  const { getFieldDecorator, resetFields } = form;
  const { user } = useContext(ValueContext);
  const [data, setData] = useState([]);
  const [confirmDirty, setConfirmDirty] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:3000/users?id=${user.id}`).then((resp) => {
      const val = resp.data[0];
      console.log(resp);
      setData(val);
    });
  }, [user]);
  console.log(data);
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const handleSubmit = (val) => {
    if (JSON.stringify(user) !== "{}") {
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(val);
          console.log(values);
          if (val === "msg") {
            axios
              .put(`http://localhost:3000/users/${user.id}`, {
                ...data,
                username: values.username,
                phone: values.phone,
                from: values.from,
              })
              .then((resp) => {
                message.success("修改成功");
              });
          } else if (val === "psd") {
            axios
              .put(`http://localhost:3000/users/${user.id}`, {
                ...data,
                password: values.password,
              })
              .then((resp) => {
                message.success("修改成功");
              });
          }
        }
      });
    } else {
      message.warning("请先登录");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>个人中心</h2>
      <Form onSubmit={handleSubmit}>
        <h4>收货信息</h4>
        <Form.Item label="收货人">
          {getFieldDecorator("username", {
            initialValue: data ? data.user : "",
            rules: [{ required: true, message: "请输入收货人名称" }],
          })(<Input placeholder="收货人" style={{ width: 400 }} />)}
        </Form.Item>
        <Form.Item label="收货电话">
          {getFieldDecorator("phone", {
            initialValue: data ? data.phone : "",
            rules: [{ required: true, message: "请输入收货电话" }],
          })(<Input placeholder="收货电话" style={{ width: 400 }} />)}
        </Form.Item>
        <Form.Item label="收货地址">
          {getFieldDecorator("from", {
            initialValue: data ? data.from : "",
            rules: [{ required: true, message: "请输入收货地址" }],
          })(<Input placeholder="收货地址" style={{ width: 400 }} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              handleSubmit("msg");
            }}
          >
            提交
          </Button>
        </Form.Item>
        <div style={{ margin: "20px 0" }}>
          <Divider />
        </div>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password style={{ width: 400 }} />)}
        </Form.Item>
        <Form.Item label="重复密码" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password onBlur={handleConfirmBlur} style={{ width: 400 }} />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              handleSubmit("psd");
            }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(memo(MyCore));
