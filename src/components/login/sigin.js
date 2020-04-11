import React, { useState } from "react";
import { Form, Input, Tooltip, Icon, Select, Button, message } from "antd";
import axios from "axios";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Sigin = ({ form, setType }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator, resetFields } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = {
          user: values.name,
          password: values.password,
          phone: values.phone,
          email: values.email,
          from: values.residence.join("-"),
        };
        axios
          .get(`http://localhost:3000/users?user=${values.name}`)
          .then((resp) => {
            const data = resp.data;
            if (data.length > 0) {
              message.warning("name重复");
            } else {
              axios.post("http://localhost:3000/users", user).then((resp) => {
                if (resp.status >= 200) {
                  message.success("注册成功");
                  resetFields();
                  setType("login");
                }
              });
            }
          });
      }
    });
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

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "86",
  })(
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
        label={
          <span>
            用户名&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "请输入用户名",
              whitespace: true,
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "请输入邮箱",
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="密码" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "请输入密码",
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="重复密码" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "请再次输入密码",
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item label="收货人">
        {getFieldDecorator("people", {
          rules: [{ required: true, message: "请输入收货人名称" }],
        })(<Input style={{ width: "100%" }} />)}
      </Form.Item>
      <Form.Item label="地址">
        {getFieldDecorator("residence", {
          rules: [
            {
              required: true,
              message: "请输入收货地址",
            },
          ],
        })(<Input style={{ width: "100%" }} />)}
      </Form.Item>
      <Form.Item label="手机号">
        {getFieldDecorator("phone", {
          rules: [{ required: true, message: "请输入收货手机号" }],
        })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          onClick={() => {
            setType("login");
          }}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(Sigin);
