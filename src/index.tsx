import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as serviceWorker from 'src/serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="68944797193-teede529dnputbsl7aqpj1jqp22fc973.apps.googleusercontent.com">
      <HelmetProvider>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
