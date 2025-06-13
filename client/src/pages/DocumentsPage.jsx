import React, { useContext } from 'react';
import { Typography, Card } from 'antd';
import { ThemeContext } from '../context/ThemeContext';

const { Title } = Typography;

const DocumentsPage = () => {
  const { theme, getColor } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 0',
      backgroundColor: getColor('level01')
    }}>
      <Card 
        style={{ 
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: getColor('level02'),
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Title 
          level={1} 
          style={{ 
            color: isDarkMode ? '#fff' : 'inherit',
            marginBottom: '24px'
          }}
        >
          Hello World
        </Title>
        
        <div style={{ padding: '20px', backgroundColor: getColor('level03'), borderRadius: '4px' }}>
          <p style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }}>
            This is a simple component showing different background levels in the 
            {isDarkMode ? ' dark' : ' light'} theme.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DocumentsPage;