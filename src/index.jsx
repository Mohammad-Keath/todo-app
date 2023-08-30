import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.jsx';

class Main extends React.Component {
  render() {
    return <App />;
  }
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Main />);
