import React, { memo, useEffect, useState, useContext } from "react";
import { Table } from "antd";
import { ValueContext } from "../context";
import axios from "axios";

const Order = () => {
  const { user } = useContext(ValueContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/users?id=${user.id}`).then((resp) => {
      const val = resp.data[0]["delivery"];
      console.log(resp);
      setData(val);
    });
  }, []);

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
      render: () => <span style={{ color: "red" }}>已支付</span>,
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
      title: "下单时间",
      dataIndex: "creatTime",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default memo(Order);
