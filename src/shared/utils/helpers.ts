export const isSecondQuestionCorrect = (selectedOptions: string[]) => {
	const correctOptions = ["react", "vue", "angular"]; // Правильные ответы на второй вопрос
	return correctOptions.every((option) => selectedOptions.includes(option)) && selectedOptions.length === correctOptions.length;
};

export const getInitialState = (key: string, defaultValue: any) => {
	const savedValue = localStorage.getItem(key);
	return savedValue ? JSON.parse(savedValue) : defaultValue;
};
