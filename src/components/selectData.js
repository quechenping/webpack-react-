import React, { memo, useEffect, useState, useContext } from "react";
import { Row, Col, Card, Button, message } from "antd";
import axios from "axios";
import { ValueContext } from "./context";
import "./index.less";
const { Meta } = Card;

const SelectData = ({ value }) => {
  const [data, setData] = useState([]);
  const { setMenuType } = useContext(ValueContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/data`)
      .then((res) => {
        let data = res.data;
        const arr = data.filter((item) => item.name.indexOf(value) > -1);
        console.log(arr, data, value);
        setData(arr);
      })
      .catch((err) => {
        message.error(err);
      });
  }, [value]);

  return (
    <div className="product">
      <Row gutter={16}>
        {data.map((item) => (
          <Col span={6} key={item.id} style={{ marginTop: 20 }}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: item.id });
              }}
              style={{ width: "100%", cursor: "pointer" }}
              cover={
                <img
                  src={require(`../img/${item.img}`).default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta
                title={
                  <>
                    <span style={{ fontSize: 16 }}>{item.name}</span>
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

export default memo(SelectData);
