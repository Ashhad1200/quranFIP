import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        drawerOpen: false,
        currentPage: 'home',
        navbarShrunk: false,
        toasts: []
    },
    reducers: {
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen
        },
        openDrawer: (state) => {
            state.drawerOpen = true
        },
        closeDrawer: (state) => {
            state.drawerOpen = false
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
            state.drawerOpen = false // Close drawer on page change
        },
        setNavbarShrunk: (state, action) => {
            state.navbarShrunk = action.payload
        },
        showToast: (state, action) => {
            state.toasts.push({
                id: Date.now(),
                message: action.payload.message,
                type: action.payload.type || 'info', // 'success', 'error', 'warning', 'info'
                duration: action.payload.duration || 3000
            })
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
        }
    }
})

export const {
    toggleDrawer,
    openDrawer,
    closeDrawer,
    setCurrentPage,
    setNavbarShrunk,
    showToast,
    removeToast
} = uiSlice.actions

// Selectors
export const selectDrawerOpen = (state) => state.ui.drawerOpen
export const selectCurrentPage = (state) => state.ui.currentPage
export const selectNavbarShrunk = (state) => state.ui.navbarShrunk
export const selectToasts = (state) => state.ui.toasts

export default uiSlice.reducer
