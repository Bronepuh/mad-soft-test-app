import i18n from "@/i18n";

export const isSecondQuestionCorrect = (selectedOptions: string[]) => {
	const correctOptions = ["react", "vue", "angular"]; // Правильные ответы на второй вопрос
	return correctOptions.every((option) => selectedOptions.includes(option)) && selectedOptions.length === correctOptions.length;
};

export const getInitialState = (key: string, defaultValue: any) => {
	const savedValue = localStorage.getItem(key);
	return savedValue ? JSON.parse(savedValue) : defaultValue;
};

export const formatTime = (seconds: number) => {
	const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
	const secs = String(seconds % 60).padStart(2, "0");
	return `${minutes}:${secs}`;
};

export const changeLanguage = (language: string | null) => {
	if (language) {
		i18n.changeLanguage(language); // Смена языка, если language не null
	} else {
		console.log("ошибка при смене языка...");
	}
};
