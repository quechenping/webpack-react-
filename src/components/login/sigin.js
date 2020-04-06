import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Button,
  message
} from "antd";
import axios from "axios";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];
const Sigin = ({ form, setType }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator, resetFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = {
          user: values.name,
          password: values.password,
          phone: values.phone,
          email: values.email,
          from: values.residence.join("-")
        };
        axios
          .get(`http://localhost:3000/users?user=${values.name}`)
          .then(resp => {
            const data = resp.data;
            if (data.length > 0) {
              message.warning("name重复");
            } else {
              axios.post("http://localhost:3000/users", user).then(resp => {
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

  const handleConfirmBlur = e => {
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
    initialValue: "86"
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
            Name&nbsp;
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
              message: "Please input your name!",
              whitespace: true
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item label="Habitual Residence">
        {getFieldDecorator("residence", {
          initialValue: ["zhejiang", "hangzhou", "xihu"],
          rules: [
            {
              type: "array",
              required: true,
              message: "Please select your habitual residence!"
            }
          ]
        })(<Cascader options={residences} />)}
      </Form.Item>
      <Form.Item label="Phone Number">
        {getFieldDecorator("phone", {
          rules: [
            { required: true, message: "Please input your phone number!" }
          ]
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
