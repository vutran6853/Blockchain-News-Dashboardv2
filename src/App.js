import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';
import routes from './routes';
import Navbar from './components/navbar/Navbar';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <Navbar/>
            { routes }
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
