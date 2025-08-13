import { createSlice } from "@reduxjs/toolkit";

const saveToStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const getItemsFromStorage = () => {
  return getFromStorage("items") || [];
};

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        items: getItemsFromStorage(),
        itemCreationError: null,
        currentItem: {},
    },
    reducers: {
        createItem: (state, action) => {
            if (!state.items.find(item => item.name === action.payload.name)) {
                state.items.push(state.currentItem);
                saveToStorage("items", state.items);
            }
        },
        beginCreation: (state, action) => {
            const newItem = {
                title: action.payload.title,
                image: action.payload.images,
                additionalViews: action.payload.additionalViews,
                description: action.payload.description,
                tradeOptions: action.payload.tradeOptions,
                category: action.payload.category,
                ownerEmail: action.payload.ownerEmail,
                ownerName: action.payload.ownerName,
                price: action.payload.price,
            }
            state.currentItem = newItem;
        }
    }
})

export const { createItem, beginCreation } = itemsSlice.actions;
export default itemsSlice.reducer;