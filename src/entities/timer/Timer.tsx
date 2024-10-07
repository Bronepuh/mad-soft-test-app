import React, { useState, useEffect } from "react";
import { Text } from "@mantine/core";

interface CountdownTimerProps {
	initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialSeconds }) => {
	const [secondsLeft, setSecondsLeft] = useState<number>(() => {
		// Попытка извлечь оставшееся время из localStorage
		const savedTime = localStorage.getItem("countdown-timer");
		const currentTime = new Date().getTime();

		if (savedTime) {
			const { savedSeconds, savedTimestamp } = JSON.parse(savedTime);
			const elapsed = Math.floor((currentTime - savedTimestamp) / 1000);
			return Math.max(savedSeconds - elapsed, 0);
		}

		return initialSeconds;
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					localStorage.removeItem("countdown-timer"); // Очищаем таймер по завершению
					return 0;
				}
				const newTime = prev - 1;
				const currentTime = new Date().getTime();

				// Сохраняем в localStorage оставшееся время и текущий timestamp
				localStorage.setItem("countdown-timer", JSON.stringify({ savedSeconds: newTime, savedTimestamp: currentTime }));

				return newTime;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
	};

	return (
		<Text size="xl" w={700} ta="end" c={"orange"}>
			{secondsLeft > 0 ? `Time: ${formatTime(secondsLeft)}` : "Time is up!"}
		</Text>
	);
};

export default CountdownTimer;
