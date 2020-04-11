import React, { memo, useContext } from "react";
import { Tabs } from "antd";
import { ValueContext } from "../context";
import CommendList from "./commendList";
const { TabPane } = Tabs;

const Recommend = () => {
  const { activeKey, setActiveKey } = useContext(ValueContext);
  const handleChange = (Key) => {
    setActiveKey(Key);
  };
  return (
    <div>
      <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={handleChange}>
        <TabPane tab="典藏重器" key="典藏重器">
          <CommendList type="1" />
        </TabPane>
        <TabPane tab="仿古青花" key="仿古青花">
          <CommendList type="2" />
        </TabPane>
        <TabPane tab="皇窑名瓷" key="皇窑名瓷">
          <CommendList type="3" />
        </TabPane>
        <TabPane tab="官窑粉彩" key="官窑粉彩">
          <CommendList type="4" />
        </TabPane>
        <TabPane tab="名家作品" key="名家作品">
          <CommendList type="5" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default memo(Recommend);
