import { create } from "zustand";
import { produce } from "immer";
import { getInitialState } from "@/shared/utils/helpers";

interface IStepperStore {
	timeRemaining: number;
	setTimeRemaining: (timeRemaining: number) => void;
}

export const stepperStore = create<IStepperStore>((set) => ({
	timeRemaining: getInitialState("timeRemaining", 1 * 60),
	setTimeRemaining: (timeRemaining: number) => {
		set(
			produce((store: IStepperStore) => {
				store.timeRemaining = timeRemaining;
			}),
		);
	},
}));
