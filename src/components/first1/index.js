import React, { memo } from "react";
import { Carousel, Row, Col, Button, Divider, Card } from "antd";
import ShareList from "./shareList";
import "../index.less";
const { Meta } = Card;

const Products = ({ setMenuType }) => {
  const handleknow = (i) => {
    console.log(i);
  };

  return (
    <div className="product">
      {/* <Carousel autoplay effect="fade">
        <div>
          <img src={require("../../img/app1.jpg").default} alt="加载中" />
        </div>
        <div>
          <img src={require("../../img/app1.jpg").default} alt="加载中" />
        </div>
        <div>
          <img src={require("../../img/app1.jpg").default} alt="加载中" />
        </div>
        <div>
          <img src={require("../../img/app1.jpg").default} alt="加载中" />
        </div>
      </Carousel>
      <Divider /> */}
      <div style={{ marginTop: 20 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-1.jpg").default}
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
                      setMenuType({ type: "7", value: 6 });
                    }}
                  >
                    了解更多
                  </Button>
                }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-2.jpg").default}
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
                      setMenuType({ type: "7", value: 7 });
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
          <span style={{ fontSize: 32 }}>新品预览</span>
        </div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 6 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-1.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 粉彩四季花鸟杯" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 7 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-2.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 福在眼前对杯" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 8 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-3.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 粉彩鸡缸杯" />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 9 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-4.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 观山复水笔筒" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 10 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-5.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 五福四海品茗杯" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              onClick={() => {
                setMenuType({ type: "7", value: 11 });
              }}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  src={require("../../img/5-6.jpg").default}
                  alt="加载中"
                  style={{ width: "100%" }}
                />
              }
            >
              <Meta title="名家作品 > 薄胎四季花鸟杯" />
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
