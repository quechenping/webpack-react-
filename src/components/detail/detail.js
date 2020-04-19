import React, { memo, useContext, useState, useEffect } from "react";
import { Row, Col, Button, List, message } from "antd";
import { ValueContext } from "../context";
import axios from "axios";
import "../index.less";
const arr = ["典藏重器", "仿古青花", "皇窑名瓷", "官窑粉彩", "名家作品"];

const Detail = ({ value }) => {
  const [data, setData] = useState({});
  const {
    user,
    setUser,
    setVisible,
    setMenuType,
    setType,
    setActiveKey,
  } = useContext(ValueContext);
  console.log(value);
  useEffect(() => {
    axios.get(`http://localhost:3000/data?id=${value}`).then((resp) => {
      console.log(resp);
      setData(resp.data[0]);
    });
  }, [value]);

  const handleClick = (e) => {
    e.stopPropagation();
    const shopArr = user.shopcart ? user.shopcart : [];
    if (JSON.stringify(user) === "{}") {
      message.warning("请先登录");
      setVisible(true);
      setType("login");
    } else {
      shopArr.push(data);
      setUser({ ...user, shopcart: shopArr });
      axios
        .patch(`http://localhost:3000/users/${user.id}`, { shopcart: shopArr })
        .then(() => {
          message.success("添加成功");
        });
    }
  };
  console.log(data);
  return (
    <div>
      <Row>
        <Col span={6} offset={1}>
          {JSON.stringify(data) !== "{}" ? (
            <img src={require(`../../img/${data.img}`).default} alt="加载中" />
          ) : null}
        </Col>
        <Col span={6} offset={2}>
          <span className="title_1">{data ? data.name : ""}</span>
          <br />
          <span className="title_2">
            分类：
            {data
              ? data.type
              : "" === 1
              ? "典藏重器"
              : data
              ? data.type
              : "" === 2
              ? "仿古青花"
              : data
              ? data.type
              : "" === 3
              ? "皇窑名瓷"
              : data
              ? data.type
              : "" === 4
              ? "官窑粉彩"
              : "名家作品"}
          </span>
          <br />
          <span className="title_2">介绍：{data ? data.val : ""}</span>
          <br />
          <span className="title_price">销量：{data ? data.discuss : ""}</span>
          <br />
          <span className="title_price">¥{data ? data.price : ""}</span>
          <br />
          <Button
            style={{ marginTop: 10 }}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            加入购物车
          </Button>
        </Col>
        <Col span={3} offset={5}>
          <List
            itemLayout="horizontal"
            dataSource={arr}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMenuType({ type: "2" });
                  setActiveKey(item);
                }}
              >
                {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(Detail);
