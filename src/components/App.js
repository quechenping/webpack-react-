import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Input,
  Icon,
  Row,
  Col,
  Button,
  Dropdown,
  Modal,
  Avatar,
  Badge,
} from "antd";
import Products from "./first1/index";
import Discuss from "./discuss";
import Recommend from "./recommend/recommend";
import SelectData from "./selectData";
import Login from "./login/login";
import Sigin from "./login/sigin";
import Detail from "./detail/detail";
import Comment from "./comment/comment";
import { ValueContext } from "./context";
import "./index.less";
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const menu = (
  <Menu style={{ width: 100 }}>
    <Menu.Item key="3">使用条款</Menu.Item>
    <Menu.Item key="4">销售条款</Menu.Item>
    <Menu.Item key="5">隐私政策</Menu.Item>
    <Menu.Item key="6">联系我们</Menu.Item>
    <Menu.Item key="7">网站反馈</Menu.Item>
  </Menu>
);

const App = () => {
  const [menuType, setMenuType] = useState({ type: "1", value: "" }); //主页面选择的是哪个menu,显示什么页面
  const [searchShow, setSearchShow] = useState(false); //点击搜索icon展现搜索框
  const [searchValue, setSearchValue] = useState(""); //搜索框内容
  const [visible, setVisible] = useState(false); //登录注册框是否展现
  const [user, setUser] = useState({}); //登录的用户信息
  const [type, setType] = useState(""); //login or sigin
  const [activeKey, setActiveKey] = useState("典藏重器"); // 产品系列tab页位置

  useEffect(() => {
    menuType.type === "10" ? setUser({}) : "";
  }, [menuType]);

  const menuClick = (e) => {
    setMenuType({ type: e.key });
  };

  const handleSearch = (e) => {
    setSearchShow(true);
  };

  const loginMenu = (
    <Menu
      style={{ width: 100 }}
      onClick={({ key }) => {
        setMenuType({ type: key });
      }}
    >
      <Menu.Item key="8">我的订单</Menu.Item>
      <Menu.Item key="9">上传商品</Menu.Item>
      <Menu.Item key="10">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <ValueContext.Provider
      value={{
        menuType,
        setMenuType,
        user,
        setUser,
        setVisible,
        setType,
        activeKey,
        setActiveKey,
      }}
    >
      <Layout className="layout">
        <div style={{ height: 50, lineHeight: "50px" }}>
          <Row>
            <Col span={4}>Logo</Col>
            <Col span={1} offset={15}>
              <Icon type="search" onClick={handleSearch} />
            </Col>
            <Col span={1}>
              <Badge count={user && user.shopcart ? user.shopcart.length : 0}>
                <Icon type="shopping" theme="filled" />
              </Badge>
            </Col>
            <Col span={1}>
              {JSON.stringify(user) !== "{}" ? (
                <Dropdown overlay={loginMenu}>
                  <Avatar
                    style={{
                      backgroundColor: "#7265e6",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {user.user}
                  </Avatar>
                </Dropdown>
              ) : (
                <Button
                  type="link"
                  ghost
                  style={{ color: "rgb(123, 119, 119)" }}
                  onClick={() => {
                    setVisible(true);
                    setType("login");
                  }}
                >
                  登录
                </Button>
              )}
            </Col>
            <Col span={1}>
              <Button
                type="link"
                ghost
                style={{ color: "rgb(123, 119, 119)" }}
                onClick={() => {
                  setVisible(true);
                  setType("sigin");
                }}
              >
                注册
              </Button>
            </Col>
            <Col span={1}>
              <Dropdown overlay={menu}>
                <Button
                  type="link"
                  ghost
                  style={{ color: "rgb(123, 119, 119)" }}
                >
                  帮助
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <Header>
          {!searchShow ? (
            <>
              <div className="logo" />
              <Menu
                defaultOpenKeys="1"
                defaultSelectedKeys="1"
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
                onClick={menuClick}
              >
                <Menu.Item key="1">首页</Menu.Item>
                <Menu.Item key="2">产品系列</Menu.Item>
                <Menu.Item key="3">热销</Menu.Item>
                <Menu.Item key="4">新品</Menu.Item>
                <Menu.Item key="5">我的订单</Menu.Item>
                <Menu.Item key="6">个人中心</Menu.Item>
              </Menu>
            </>
          ) : (
            <Row>
              <Col span={10} offset={6}>
                <Search
                  onSearch={(value) => {
                    setSearchValue(value);
                    setMenuType({ type: "11" });
                    setSearchShow(false);
                  }}
                  onBlur={() => {
                    setSearchShow(false);
                  }}
                />
              </Col>
            </Row>
          )}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{
              background: "#fff",
              color: "#313131",
              padding: 24,
              minHeight: 280,
            }}
          >
            {menuType.type === "1" ? (
              <Products setMenuType={setMenuType} />
            ) : menuType.type === "2" ? (
              <Recommend />
            ) : menuType.type === "3" ? (
              <Discuss />
            ) : menuType.type === "11" ? (
              <SelectData value={searchValue} />
            ) : menuType.type === "12" ? (
              <Comment id={menuType.value} />
            ) : menuType.type === "7" ? (
              <Detail value={menuType.value} />
            ) : null}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          QueChenping ©2020 Created
        </Footer>
      </Layout>
      <Modal
        centered
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
        title={type === "login" ? "登录" : "注册"}
        visible={visible}
      >
        {type === "login" ? (
          <Login setUser={setUser} setVisible={setVisible} setType={setType} />
        ) : type === "sigin" ? (
          <Sigin setType={setType} />
        ) : null}
      </Modal>
    </ValueContext.Provider>
  );
};

export default App;
