import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import Order from "./order";
import Client from "./client";
import Commodity from "./commodity";
import Password from "./password";
import Edit from "./edit";

const { Header, Content, Footer } = Layout;

const Admin = () => {
  const [menuType, setMenuType] = useState({ type: "1", value: "" }); //主页面选择的是哪个menu,显示什么页面

  const menuClick = (e) => {
    setMenuType({ type: e.key });
  };
  console.log(menuType);
  return (
    <div>
      <Header>
        <div className="logo" />
        <Menu
          defaultOpenKeys="1"
          defaultSelectedKeys="1"
          selectedKeys={[menuType.type]}
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
          onClick={menuClick}
        >
          <Menu.Item key="1">订单管理</Menu.Item>
          <Menu.Item key="2">客户管理</Menu.Item>
          <Menu.Item key="3">商品管理</Menu.Item>
          <Menu.Item key="4">修改密码</Menu.Item>
          <Menu.Item key="5">
            <Link to="/">退出</Link>
          </Menu.Item>
        </Menu>
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
            <Order setMenuType={setMenuType} />
          ) : menuType.type === "2" ? (
            <Client />
          ) : menuType.type === "3" ? (
            <Commodity />
          ) : menuType.type === "4" ? (
            <Password />
          ) : menuType.type === "6" ? (
            <Edit menuType={menuType} setMenuType={setMenuType} />
          ) : null}
        </div>
      </Content>
    </div>
  );
};

export default Admin;
