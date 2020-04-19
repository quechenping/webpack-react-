import React, { memo, useEffect, useState, useContext } from "react";
import { Row, Col, Button, message, Divider } from "antd";
import { ValueContext } from "../context";
import Delivery from "./delivery";
import { cloneDeep } from "lodash";
import axios from "axios";
import "../index.less";

const ShopCar = () => {
  const { user, setVisible, setType } = useContext(ValueContext);
  const [shopType, setShopType] = useState(1);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let a = 0;
    if (JSON.stringify(user) === "{}") {
      message.warning("请先登录");
      setVisible(true);
      setType("login");
    } else {
      const arr = user.shopcart;
      function getRepeatNum(arr) {
        var obj = [];
        arr.forEach((item) => {
          const a = obj.find((val) => val.id === item.id);
          if (a === undefined) {
            item.num = item.num ? item.num : 1;
            obj.push(item);
          } else {
            const index = obj.findIndex((a) => a.id === item.id);
            obj.splice(index, 1, { ...obj[index], num: obj[index].num + 1 });
          }
        });
        return obj;
      }
      setData(getRepeatNum(arr));
      axios.patch(`http://localhost:3000/users/${user.id}`, {
        shopcart: getRepeatNum(arr),
      });
      getRepeatNum(arr).forEach((item) => {
        a += item.price * item.num;
      });
      setPrice(a);
    }
  }, [user]);

  const handleClick = (type, id) => {
    const arr = cloneDeep(data);
    let a = 0;
    const index = arr.findIndex((a) => a.id === id);
    const obj = arr[index];
    if (type === "add") {
      arr.splice(index, 1, { ...obj, num: obj.num + 1 });
    } else if (type === "less") {
      if (obj.num > 1) {
        arr.splice(index, 1, { ...obj, num: obj.num - 1 });
      } else {
        arr.splice(index, 1);
      }
    } else if (type === "del") {
      arr.splice(index, 1);
    }
    axios.patch(`http://localhost:3000/users/${user.id}`, { shopcart: arr });
    setData(arr);
    arr.forEach((item) => {
      a += item.price * item.num;
    });
    setPrice(a);
  };
  console.log(data);
  return shopType === 1 ? (
    <div>
      <h1 style={{ fontSize: 32 }}>我的购物车</h1>
      <Row gutter={16}>
        {data.map((item) => (
          <Col span={12} key={item.id} style={{ marginTop: 20, padding: 30 }}>
            <Row>
              <Col span={10}>
                <img
                  src={require(`../../img/${item.img}`).default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={10} offset={2}>
                <div>
                  <span style={{ fontSize: 25 }}>{item.name}</span>
                  <br />
                  <span className="title_price">¥{item.price}</span>
                  <br />
                  <span className="title_price">数量：{item.num}</span>
                  <br />
                  <Button
                    style={{ margin: "10px 5px 0 5px" }}
                    onClick={() => {
                      handleClick("add", item.id);
                    }}
                  >
                    增加
                  </Button>
                  <Button
                    style={{ margin: "10px 5px 0 5px" }}
                    onClick={() => {
                      handleClick("less", item.id);
                    }}
                  >
                    减少
                  </Button>
                  <Button
                    style={{ margin: "10px 5px 0 5px" }}
                    onClick={() => {
                      handleClick("del", item.id);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <span style={{ fontSize: 28 }}>订单总金额：¥{price}</span>
        <Button
          type="primary"
          disabled={data.length === 0}
          style={{ position: "absolute", right: 120 }}
          onClick={() => {
            setShopType(2);
          }}
        >
          提交订单
        </Button>
      </div>
    </div>
  ) : (
    <Delivery price={price} />
  );
};

export default memo(ShopCar);
