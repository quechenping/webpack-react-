import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const Client = ({ setMenuType }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dataSync();
  }, []);
  const dataSync = useCallback(() => {
    axios.get("http://localhost:3000/users").then((resp) => {
      setData(resp.data);
    });
  }, []);
  const handleRest = (record) => {
    axios
      .patch(`http://localhost:3000/users/${record.id}`, {
        password: "123",
      })
      .then(() => {
        message.success("重置成功");
        dataSync();
      });
  };

  const handleDel = (record) => {
    axios.delete(`http://localhost:3000/users?id=${record.id}`).then(() => {
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
      title: "用户名",
      dataIndex: "user",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "地址",
      dataIndex: "from",
    },
    {
      title: "操作",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              handleRest(record);
            }}
          >
            重置密码
          </Button>
          <Button
            type="primary"
            style={{ margin: "0 5px" }}
            onClick={() => {
              setMenuType({ type: "7", value: record });
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

export default Client;
