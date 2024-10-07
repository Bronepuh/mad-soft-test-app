import { create } from "zustand";
import { produce } from "immer";

export interface IUserData {
	name: string;
	password?: string;
}

interface IAppStore {
	user: IUserData | null;
	result: number | null;
	setUserData: (data: IUserData | null) => void;
	setResult: (result: number | null) => void;
}

export const appStore = create<IAppStore>((set) => ({
	user: null,
	result: 0,
	setUserData: (data: IUserData | null) => {
		set(
			produce((store: IAppStore) => {
				store.user = data;
			}),
		);
	},
	setResult: (result: number | null) => {
		set(
			produce((store: IAppStore) => {
				store.result = result;
			}),
		);
	},
}));
