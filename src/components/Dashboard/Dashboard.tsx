import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RiMenuFoldFill } from "react-icons/ri";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaFileMedicalAlt } from "react-icons/fa";
import { GiDoctorFace } from "react-icons/gi";
import { IoMdBody } from "react-icons/io";
import { Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="w-[80%] mx-auto flex items-center justify-between">
            {!collapsed && <div className="text-white">Medic-Gpt</div>}
            {collapsed ? (
              <div>
                <AiOutlineMenuFold
                  onClick={() => setCollapsed(!collapsed)}
                  className="trigger text-center text-white text-[1.5rem] cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <RiMenuFoldFill
                  onClick={() => setCollapsed(!collapsed)}
                  className="trigger text-center text-white text-[1.5rem] cursor-pointer"
                />
              </div>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <CiMedicalClipboard />,
                label: <Link to="/">nav</Link>,
              },
              {
                key: "2",
                icon: <IoMdBody />,
                label: <Link to="/bodydiagnosis">nav2</Link>,
              },
              {
                key: "3",
                icon: <FaFileMedicalAlt />,
                label: <Link to="/specialisation">nav3</Link>,
              },
              {
                key: "4",
                icon: <GiDoctorFace />,
                label: <Link to="/issues">nav4</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashBoard;
