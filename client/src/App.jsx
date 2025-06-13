import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Spin, Menu, Avatar, Dropdown, Typography, Button, Divider } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  FileOutlined, 
  TeamOutlined, 
  BulbOutlined,
  BulbFilled,
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/user/Profile';
import AdminDashboard from './components/admin/AdminDashboard';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

// Navbar component
const NavbarComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, getColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const isDarkMode = theme === 'dark';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ 
      background: isDarkMode ? '#001529' : '#092e5d', 
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'fixed',
      width: '100%',
      zIndex: 2
    }}>
      {/* Company Logo/Name */}
      <div>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <span style={{ fontWeight: 300 }}>Doc</span><span style={{ fontWeight: 600 }}>Hub</span>
          </Link>
        </Title>
      </div>

      {/* Theme Toggle and User Info */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Theme Toggle Switch */}
        <Button 
          type="text" 
          icon={isDarkMode ? <BulbFilled style={{ color: '#f8e71c' }} /> : <BulbOutlined style={{ color: '#f8e71c' }} />}
          onClick={toggleTheme}
          style={{ color: 'white', marginRight: '16px' }}
        />
        
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              padding: '6px 12px',
              borderRadius: '4px',
              transition: 'background 0.3s',
              '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
            }}>
              <Avatar 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: isDarkMode ? '#177ddc' : '#1890ff',
                  boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
                }} 
              />
              <span style={{ 
                color: 'white', 
                marginLeft: '8px',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {user.username}
              </span>
            </div>
          </Dropdown>
        ) : (
          <div>
            <Button 
              type="link" 
              style={{ color: 'white' }} 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              type="primary" 
              ghost 
              onClick={() => navigate('/register')}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)'
              }}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
};

// Sidebar component
const SidebarComponent = () => {
  const { user } = useContext(AuthContext);
  const { theme, getColor } = useContext(ThemeContext);
  const location = useLocation();
  
  const isDarkMode = theme === 'dark';

  // Ensure sidebar colors match the theme
  const sidebarStyle = {
    background: getColor('level01'),
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 64, // Height of the Header
    boxShadow: isDarkMode ? '2px 0 8px rgba(0, 0, 0, 0.3)' : '2px 0 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1
  };

  return (
    <Sider
      width={220}
      style={sidebarStyle}
      theme={isDarkMode ? "dark" : "light"}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ 
          borderRight: 0, 
          height: 'calc(100% - 180px)',
          background: getColor('level01')
        }}
        theme={isDarkMode ? "dark" : "light"}
      >
        <Menu.ItemGroup key="main">
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          {user && (
            <>
              <Menu.Item key="/documents" icon={<FileOutlined />}>
                <Link to="/documents">Documents</Link>
              </Menu.Item>
              
              <Menu.Item key="/profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            </>
          )}
        </Menu.ItemGroup>

        {user && user.role === 'admin' && (
          <Menu.ItemGroup key="admin" title="Administration">
            <Menu.Item key="/admin" icon={<DashboardOutlined />}>
              <Link to="/admin">Admin Panel</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
      </Menu>

      <div style={{ 
        position: 'absolute', 
        bottom: '16px', 
        width: '100%',
        padding: '0 16px',
        boxSizing: 'border-box'
      }}>
        <Divider style={{ margin: '8px 0' }} />
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ 
            fontSize: '12px',
            color: isDarkMode ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)'
          }}>
            DocHub v1.0.0
          </Text>
        </div>
      </div>
    </Sider>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: isDarkMode ? '#1f1f1f' : '#ffffff'
      }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Admin route component
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: isDarkMode ? '#1f1f1f' : '#ffffff'
      }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
};

// App content with router
const AppContent = () => {
  const { user } = useContext(AuthContext);
  const { theme, getColor } = useContext(ThemeContext);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <NavbarComponent />
        
        {user && <SidebarComponent />}
        
        <Layout style={{ 
          marginLeft: user ? 220 : 0, 
          marginTop: 64, // Height of the Header
          transition: 'margin-left 0.3s',
          background: getColor('level00')
        }}>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            background: getColor('level01'), 
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            minHeight: 'calc(100vh - 64px - 48px - 69px)'
          }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/documents" element={
                <ProtectedRoute>
                  <DocumentsPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Content>
          <Footer style={{ 
            textAlign: 'center',
            background: 'transparent',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)'
          }}>
            DocHub ©{new Date().getFullYear()} - Your Document Management Solution
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

// Main App with AuthProvider and ThemeProvider
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;