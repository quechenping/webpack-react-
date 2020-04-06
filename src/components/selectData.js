import React, { memo, useEffect, useState } from "react";
import { Table, message } from "antd";
import axios from "axios";
import "./index.less";

const SelectData = value => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then(res => {
        console.log(res);
        let data = res.data;
        setData(data);
      })
      .catch(err => {
        message.error(err);
      });
  }, []);
  const columns = [
    {
      dataIndex: "img",
      width: "10%",
      render: index => (
        <img
          src={require("../img/" + index + ".jpg").default}
          alt="加载中"
          style={{ width: 60, height: 60 }}
        />
      )
    },
    {
      title: "介绍",
      dataIndex: "val",
      width: "30%"
    },
    {
      width: "10%",
      title: "价格",
      dataIndex: "price"
    },
    {
      width: "10%",
      title: "成色",
      dataIndex: "chense"
    },
    {
      width: "10%",
      title: "区域",
      dataIndex: "from"
    },
    {
      title: "发布时间",
      width: "15%",
      dataIndex: "time"
    },
    {
      title: "处理",
      width: "10%",
      render: () => (
        <>
          <span style={{ marginRight: 10 }}>
            <a>购买</a>
          </span>
          <span>
            <a>加入购物车</a>
          </span>
        </>
      )
    }
  ];

  return (
    <div className="product">
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default memo(SelectData);
