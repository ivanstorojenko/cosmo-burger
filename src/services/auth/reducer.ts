import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registration, login, logout, changeInfo } from './actions';
import { TAuthRes, TUserData, TUserInfoRes } from '@/utils/api';

type TAuthState = {
	user: null | Pick<TUserData, 'name' | 'email'>;
	isAuthChecked: boolean;
	loading: boolean;
	error: null | string;
};

type TAuthFulfilledAction = PayloadAction<TAuthRes | TUserInfoRes>;

export const initialState: TAuthState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: null,
};

const handlePending = (state: TAuthState): void => {
	state.loading = true;
	state.error = null;
};

const handleFulfilled = (
	state: TAuthState,
	action: TAuthFulfilledAction
): void => {
	state.loading = false;

	if (action.payload?.success) {
		state.user = action.payload.user;
	} else {
		state.error = 'Unknown error occurred';
	}
};

const handleRejected = (
	state: TAuthState,
	action: PayloadAction<string | undefined>
) => {
	state.loading = false;
	state.error = action.payload || 'Unknown error occurred';
};

type TSetUserAction = PayloadAction<
	{ success: boolean; user: Pick<TUserData, 'name' | 'email'> } | undefined
>;
type TSetAuthCheckedAction = PayloadAction<boolean>;

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: TSetUserAction) => {
			if (action.payload?.success) {
				state.user = action.payload.user;
			} else {
				state.user = null;
			}
		},
		setIsAuthChecked: (state, action: TSetAuthCheckedAction) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUserInfo: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
		getLoading: (state) => state.loading,
		getError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, handlePending)
			.addCase(registration.fulfilled, handleFulfilled)
			.addCase(registration.rejected, handleRejected)
			.addCase(login.pending, handlePending)
			.addCase(login.fulfilled, handleFulfilled)
			.addCase(login.rejected, handleRejected)
			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.error = action.payload || 'Unknown error occurred';
				}
				state.user = null;
			})
			.addCase(changeInfo.pending, handlePending)
			.addCase(changeInfo.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload?.success) {
					state.user = action.payload.user;
				} else {
					state.error = 'Unknown error occurred';
				}
			})
			.addCase(changeInfo.rejected, handleRejected);
	},
});

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const { getUserInfo, getIsAuthChecked, getLoading, getError } =
	authSlice.selectors;

export type TAuthSlice = {
	[authSlice.name]: TAuthState;
};
