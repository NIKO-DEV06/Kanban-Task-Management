import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uiReducer from "./UiSlice";
import boardReducer from "./BoardSlice";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUiReducer = persistReducer(persistConfig, uiReducer);
const persistedBoardReducer = persistReducer(persistConfig, boardReducer);

const store = configureStore({
  reducer: {
    ui: persistedUiReducer,
    board: persistedBoardReducer,
  },
  middleware: [thunk],
});

const persistedStore = persistStore(store);

export { store, persistedStore };
