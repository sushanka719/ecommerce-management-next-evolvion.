export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_CATEGORY: 'ADD_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  ADD_PRODUCT: 'ADD_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  TOGGLE_WISHLIST: 'TOGGLE_WISHLIST',
  SET_SEARCH: 'SET_SEARCH',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
};

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const initialState = {
  auth: {
    isAuthenticated: false,
    user: null,
  },
  categories: [],
  products: [],
  wishlist: [],
  ui: {
    search: '',
    selectedCategoryId: null,
  },
};

export function ecommerceReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        auth: { isAuthenticated: true, user: action.payload },
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        auth: { isAuthenticated: false, user: null },
        wishlist: [],
      };

    case ACTIONS.ADD_CATEGORY: {
      const name = (action.payload?.name ?? '').trim();
      if (!name) return state;
      const id = generateId();
      return {
        ...state,
        categories: [...state.categories, { id, name }],
      };
    }

    case ACTIONS.EDIT_CATEGORY: {
      const { id, name } = action.payload || {}
      const trimmed = (name ?? '').trim()
      if (!id || !trimmed) return state
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, name: trimmed } : category,
        ),
      }
    }

    case ACTIONS.DELETE_CATEGORY: {
      const categoryId = action.payload;
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== categoryId),
        products: state.products.filter((p) => p.categoryId !== categoryId),
        ui: {
          ...state.ui,
          selectedCategoryId:
            state.ui.selectedCategoryId === categoryId
              ? null
              : state.ui.selectedCategoryId,
        },
        wishlist: state.wishlist.filter((productId) =>
          state.products.some(
            (product) => product.id === productId && product.categoryId !== categoryId,
          ),
        ),
      };
    }

    case ACTIONS.ADD_PRODUCT: {
      const { name, categoryId, price } = action.payload || {};
      const trimmedName = (name ?? '').trim();
      if (!trimmedName || !categoryId) return state;
      const id = generateId();
      return {
        ...state,
        products: [
          ...state.products,
          { id, name: trimmedName, categoryId, price: Number(price) || 0 },
        ],
      };
    }

    case ACTIONS.EDIT_PRODUCT: {
      const { id, name, categoryId, price } = action.payload || {}
      const trimmedName = (name ?? '').trim()
      if (!id || !trimmedName || !categoryId) return state
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === id
            ? { ...product, name: trimmedName, categoryId, price: Number(price) || 0 }
            : product,
        ),
      }
    }

    case ACTIONS.DELETE_PRODUCT: {
      const productId = action.payload;
      return {
        ...state,
        products: state.products.filter((p) => p.id !== productId),
        wishlist: state.wishlist.filter((id) => id !== productId),
      };
    }

    case ACTIONS.TOGGLE_WISHLIST: {
      if (!state.auth.isAuthenticated) return state;
      const productId = action.payload;
      const exists = state.wishlist.includes(productId);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      };
    }

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        ui: {
          ...state.ui,
          search: action.payload ?? '',
        },
      };

    case ACTIONS.SET_SELECTED_CATEGORY:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedCategoryId: action.payload ?? null,
        },
      };

    default:
      return state;
  }
}
