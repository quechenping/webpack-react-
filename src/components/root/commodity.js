import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const Commodity = ({ setMenuType }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dataSync();
  }, []);
  const dataSync = useCallback(() => {
    axios.get("http://localhost:3000/data").then((resp) => {
      setData(resp.data);
    });
  }, []);

  const handleDel = (record) => {
    axios.delete(`http://localhost:3000/data?id=${record.id}`).then(() => {
      message.success("删除成功");
      dataSync();
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "图片",
      dataIndex: "img",
      width: 120,
      render: (text) => (
        <img
          src={require(`../../img/${text}`).default}
          alt="加载中"
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "介绍",
      width: "40%",
      dataIndex: "val",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "成色",
      dataIndex: "chense",
    },
    {
      title: "类目",
      dataIndex: "type",
      render: (text) => (
        <span>
          {text === "1"
            ? "典藏重器"
            : text === "2"
            ? "仿古青花"
            : text === "3"
            ? "皇窑名瓷"
            : text === "4"
            ? "官窑粉彩"
            : text === "5"
            ? "名家作品"
            : ""}
        </span>
      ),
    },
    {
      title: "操作",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ margin: "0 5px" }}
            onClick={() => {
              setMenuType({ type: "8", value: record });
            }}
          >
            修改
          </Button>
          <Button
            type="danger"
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
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Commodity;
