import React, { memo } from "react";
import { Carousel, Row, Col, Button, Divider, Card } from "antd";
import ShareList from "./shareList";
import "../index.less";
const { Meta } = Card;

const Products = () => {
  const handleknow = i => {
    console.log(i);
  };

  return (
    <div className="product">
      <Carousel autoplay effect="fade">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta
                title={
                  <Button
                    type="link"
                    onClick={() => {
                      handleknow(1);
                    }}
                  >
                    了解更多
                  </Button>
                }
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta
                title={
                  <Button
                    type="link"
                    onClick={() => {
                      handleknow(2);
                    }}
                  >
                    了解更多
                  </Button>
                }
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta
                title={
                  <Button
                    type="link"
                    onClick={() => {
                      handleknow(3);
                    }}
                  >
                    了解更多
                  </Button>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 32 }}>类别浏览</span>
        </div>
        <Row gutter={16}>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="项链" />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="耳环" />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="手链" />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="套装" />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="戒指" />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/pro1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="其他" />
            </Card>
          </Col>
        </Row>
      </div>
      <Divider />
      <ShareList />
    </div>
  );
};

export default memo(Products);
