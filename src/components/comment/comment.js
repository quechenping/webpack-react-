import React, { useEffect, useState, useCallback, useContext } from "react";
import { Comment, List, message, Avatar, Form, Button, Input } from "antd";
import { ValueContext } from "../context";
import axios from "axios";
import moment from "moment";
import { cloneDeep } from "lodash";
const { TextArea } = Input;

const comment = ({ id }) => {
  const { setMenuType } = useContext(ValueContext);
  const [data, setData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    commentSync();
  }, []);

  const commentSync = useCallback(() => {
    axios
      .get(`http://localhost:3000/list?id=${id}`)
      .then((res) => {
        let data = res.data;
        console.log(res);
        setData(data);
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    const arr = data && data[0] ? cloneDeep(data[0]["comment"]) : [];
    arr.unshift({
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: value,
      datetime: moment().fromNow(),
    });
    axios
      .patch(`http://localhost:3000/list/${id}`, { comment: arr })
      .then(() => {
        setSubmitting(false);
        setValue("");
        commentSync();
      });
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src={require("../../img/5-1.jpg").default}
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
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <div>
            <Form.Item>
              <TextArea
                rows={6}
                onChange={handleChange}
                value={value}
                onPressEnter={handleSubmit}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
                type="primary"
                style={{ marginRight: 10 }}
              >
                发表评论
              </Button>
              <Button
                onClick={() => {
                  setMenuType({ type: "1" });
                }}
              >
                返回
              </Button>
            </Form.Item>
          </div>
        }
      />
      <List
        className="comment-list"
        header={(data && data[0] ? data[0]["comment"].length : 0) + "replies"}
        itemLayout="horizontal"
        dataSource={data && data[0] ? data[0]["comment"] : []}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </div>
  );
};
export default comment;
