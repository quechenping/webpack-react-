import React, { useState, useEffect, useCallback } from "react";
import { Collapse, Table, Button, message } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
import "./index.less";
const { Panel } = Collapse;

const Order = ({ setMenuType }) => {
  const [data, setData] = useState([]);

  const dataSync = useCallback(() => {
    axios.get("http://localhost:3000/users").then((resp) => {
      setData(resp.data);
    });
  }, []);
  useEffect(() => {
    dataSync();
  }, []);

  const handleDel = (record) => {
    const arr = data.find((item) => item.user === record.username);
    const a = arr.delivery.findIndex((item) => item.num === record.num);
    arr.delivery.splice(a, 1);
    console.log(arr);
    axios
      .patch(`http://localhost:3000/users/${arr.id}`, {
        delivery: arr.delivery,
      })
      .then(() => {
        message.success("删除成功");
        dataSync();
      });
  };
  const columns = [
    {
      title: "订单号",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "总价",
      dataIndex: "price",
    },
    {
      title: "商品详情",
      render: (text, record) =>
        record.data.map((item, index) => (
          <p key={index}>{`${item.name}(${item.price})x${item.num}`}</p>
        )),
    },
    {
      title: "收货信息",
      dataIndex: "from",
    },
    {
      title: "订单状态",
      dataIndex: "paytype",
      render: (text, record) => (
        <span style={{ color: record.paytype ? "red" : "gray" }}>
          {record.paytype ? "已支付" : "未支付"}
        </span>
      ),
    },
    {
      title: "支付方式",
      dataIndex: "paytype",
      render: (text) => (
        <span>
          {text === 1
            ? "微信支付"
            : text === 2
            ? "支付宝支付"
            : text === 3
            ? "到付"
            : ""}
        </span>
      ),
    },
    {
      title: "订单位置",
      dataIndex: "place",
      render: (text, record) => <span>{text ? "已送达" : "运输中"}</span>,
    },
    {
      title: "下单时间",
      dataIndex: "creatTime",
    },
    {
      title: "操作",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setMenuType({ type: "6", value: record });
              console.log(2);
            }}
          >
            修改
          </Button>
          <Button
            type="danger"
            style={{ marginLeft: 5 }}
            onClick={() => {
              handleDel(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {data.map((item) =>
          item.delivery ? (
            <Panel
              header={item.user}
              key={item.id}
              className="site-collapse-custom-panel"
            >
              <Table
                columns={columns}
                dataSource={item.delivery}
                pagination={false}
              />
            </Panel>
          ) : null
        )}
      </Collapse>
    </div>
  );
};

export default Order;
