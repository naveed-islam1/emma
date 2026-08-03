"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// No PersistGate: it renders nothing until client-side rehydration, which
// blanks every page during SSR. persistStore still rehydrates; auth-dependent
// UI updates as soon as the persisted "auth" slice loads.
export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
