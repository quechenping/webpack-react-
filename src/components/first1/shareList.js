import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  memo,
} from "react";
import { List, Avatar, message } from "antd";
import axios from "axios";
import { cloneDeep } from "lodash";
import { ValueContext } from "../context";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const ShareList = () => {
  const { setMenuType } = useContext(ValueContext);
  const [data, setData] = useState([]);
  const [shareNum, setShareNum] = useState({ like: [], star: [] });
  useEffect(() => {
    dataSync();
  }, []);

  const dataSync = useCallback(() => {
    axios
      .get("http://localhost:3000/list")
      .then((res) => {
        let data = res.data;
        setData(data);
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const patchDataSync = useCallback((id, type, data, value) => {
    const val = data.filter((item) => item.id === id)[0];
    console.log(id, data, val);
    const obj =
      type === 2
        ? { like: value ? val["like"] + 1 : val["like"] - 1 }
        : { star: value ? val["star"] + 1 : val["star"] - 1 };
    axios
      .patch(`http://localhost:3000/list/${id}`, obj)
      .then(() => {
        value
          ? message.success(type === 2 ? "点赞成功" : "收藏成功")
          : message.success(type === 2 ? "取消点赞成功" : "取消收藏成功");
        dataSync();
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const handleMessage = (id) => {
    setMenuType({ type: "12", value: id });
  };
  const handleLike = (id) => {
    const share = cloneDeep(shareNum);
    const a = share.like.indexOf(id);
    if (a > -1) {
      share.like.splice(a, 1);
      patchDataSync(id, 2, data, 0);
    } else {
      share.like.push(id);
      patchDataSync(id, 2, data, 1);
    }
    setShareNum(share);
  };

  const handleStar = (id) => {
    const share = cloneDeep(shareNum);
    const a = share.star.indexOf(id);
    if (a > -1) {
      share.star.splice(a, 1);
      patchDataSync(id, 3, data, 0);
    } else {
      share.star.push(id);
      patchDataSync(id, 3, data, 1);
    }
    setShareNum(share);
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 32 }}>分享你的高光时刻</span>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <span
                onClick={() => {
                  handleMessage(item.id);
                }}
              >
                <MessageOutlined style={{ fontSize: "16px", marginRight: 8 }} />
                <span>{item.message}</span>
              </span>,
              <span
                onClick={() => {
                  handleLike(item.id);
                }}
              >
                <LikeOutlined
                  style={{
                    fontSize: "16px",
                    marginRight: 8,
                    color: shareNum.like.indexOf(item.id) > -1 ? "yellow" : "",
                  }}
                />
                <span>{item.like}</span>
              </span>,
              <span>
                <StarOutlined
                  style={{
                    fontSize: "16px",
                    marginRight: 8,
                    color: shareNum.star.indexOf(item.id) > -1 ? "yellow" : "",
                  }}
                  onClick={() => {
                    handleStar(item.id);
                  }}
                />
                <span>{item.star}</span>
              </span>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={require("../../img/pro1.jpg").default}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default memo(ShareList);
