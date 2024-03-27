import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
function Example() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Your Company Name. All rights reserved.</p>
          <div className="sociale">
            {" "}
            <FacebookOutlined></FacebookOutlined>
            <TwitterOutlined />
            <InstagramOutlined />
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Example;
