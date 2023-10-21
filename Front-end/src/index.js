import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';

//REDUX
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// REDUX PERSIST
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//Don't forget setting devTools to false in production for security
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  </React.StrictMode>
);

export default store;