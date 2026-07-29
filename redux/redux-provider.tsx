"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from "./store";

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>{children}</PersistGate>
    </Provider>
  );
}
