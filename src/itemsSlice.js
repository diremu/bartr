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
            if (!state.items.find(item => item.title === state.currentItem.title && item.ownerEmail === state.currentItem.ownerEmail)) {
                state.items.push(state.currentItem);
                saveToStorage("items", state.items);
            }
        },
        beginCreation: (state, action) => {
            const itemName = (title) => {
                return title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            };
            
            const convertTradeOptions = (tradeOptions) => {
                const optionsArray = [];
                if (tradeOptions.electronics) optionsArray.push("Electronics");
                if (tradeOptions.furniture) optionsArray.push("Furniture");
                if (tradeOptions.technology) optionsArray.push("Technology");
                if (tradeOptions.automobiles) optionsArray.push("Automobiles");
                if (tradeOptions.clothing) optionsArray.push("Clothing");
                return optionsArray.length > 0 ? optionsArray : ["Only Cash"];
            };
            
            const newItem = {
                title: action.payload.title,
                image: action.payload.image,
                additionalViews: action.payload.additionalViews || [],
                description: action.payload.description,
                tradeOptions: convertTradeOptions(action.payload.tradeOptions),
                category: action.payload.category,
                ownerEmail: action.payload.ownerEmail,
                ownerName: action.payload.ownerName,
                price: action.payload.price,
                item: itemName(action.payload.title), 
                subtitle: "User Listed",
                alt: action.payload.description || action.payload.title
            }
            state.currentItem = newItem;
        }
    }
})

export const { createItem, beginCreation } = itemsSlice.actions;
export default itemsSlice.reducer;