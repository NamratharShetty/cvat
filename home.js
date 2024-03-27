import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  DownOutlined,
  AntCloudOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./home.css";
import ImgCrop from "antd-img-crop";
import { Upload, message, Dropdown, Menu } from "antd";
import Example from "./example";

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  cursor: "pointer",
};

const Home = ({ userId }) => {
  const [user, setUser] = useState();
  const [file, setFileList] = useState([]);
  const navigate = useNavigate();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://localhost:3002/api/users/${userId}`
          );
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    formdata.append("userId", userId);
    file.forEach((file, index) => {
      formdata.append(`file`, file.originFileObj);
    });
    try {
      const response = await axios.post(
        "http://localhost:3002/api/upload",
        formdata,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );

      const user = response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const logOut = () => {
    navigate("/");
  };

  const handleLinkClick = (image) => {
    navigate(`/image-view/${image._id}`);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div className="user-info">
          <UserOutlined style={{ marginRight: "5px" }} />
          {user?.username}
        </div>
      </Menu.Item>
      <Menu.Item onClick={logOut}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="homemain">
      <img src="/logo-white.png" lt="Logo" className="logo"></img>
      <header className="header">
        <nav>
          <ul>
            <li>
              {" "}
              <HomeOutlined />
              Home
            </li>

            <li>
              <PhoneOutlined />
              Contact
            </li>
            <li>About</li>
          </ul>

          <div>
            {/* <span>menu</span> */}
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <span>
                  {" "}
                  Menu
                  <MenuOutlined />
                </span>

                {/* <DownOutlined /> */}
              </a>
            </Dropdown>
          </div>
        </nav>
      </header>

      <div className="form-container">
        <form className="home" onSubmit={handleSubmit}>
          <ImgCrop rotationSlider>
            <Upload
              maxCount={5}
              listType="picture-card"
              fileList={file}
              onChange={onChange}
              onPreview={onPreview}
            >
              {file.length < 5 && "+ Upload"}
            </Upload>
          </ImgCrop>

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="tab">
        <table className="table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Image Name</th>
              <th>View Images</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.files.map((image, imageIndex) => (
                <tr key={imageIndex}>
                  <td style={{ textAlign: "center" }}>{imageIndex + 1}</td>
                  <td>
                    <p>{image.name}</p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <a style={linkStyle} onClick={() => handleLinkClick(image)}>
                      View Image
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <Example /> */}
    </div>
  );
};

export default Home;
