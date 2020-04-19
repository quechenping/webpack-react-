import React, { memo, useEffect, useState, useContext } from "react";
import { Row, Col, Card, Button, message } from "antd";
import { ValueContext } from "../context";
import axios from "axios";
const { Meta } = Card;

const Discuss = () => {
  const { user, setUser, setMenuType, setVisible, setType } = useContext(
    ValueContext
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/data?_limit=8&_sort=discuss&_order=desc`)
      .then((resp) => {
        const data = resp.data;
        console.log(data);
        setData(data);
      });
  }, []);

  const handleClick = (e, item) => {
    e.stopPropagation();
    if (JSON.stringify(user) === "{}") {
      message.warning("请先登录");
      setVisible(true);
      setType("login");
    } else {
      const shopArr = user.shopcart ? user.shopcart : [];
      shopArr.push(item);
      setUser({ ...user, shopcart: shopArr });
      axios
        .patch(`http://localhost:3000/users/${user.id}`, { shopcart: shopArr })
        .then(() => {
          message.success("添加成功");
        });
    }
  };

  return (
    <div>
      <Row gutter={16}>
        {data.map((item) => (
          <Col span={6} key={item.id} style={{ marginTop: 20, padding: 30 }}>
            <Card
              hoverable
              onClick={() => {
                setMenuType({ type: "7", value: item.id });
              }}
              style={{ width: "100%", cursor: "pointer" }}
              cover={
                <img
                  src={require(`../../img/${item.img}`).default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta
                title={
                  <>
                    <span style={{ fontSize: 16 }}>{item.name}</span>
                    <span style={{ position: "absolute", right: 10 }}>
                      销量：{item.discuss}
                    </span>
                    <br />
                    <span>¥{item.price}</span>
                    <Button
                      style={{ position: "absolute", right: 10 }}
                      onClick={(e) => {
                        handleClick(e, item);
                      }}
                    >
                      加入购物车
                    </Button>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default memo(Discuss);
