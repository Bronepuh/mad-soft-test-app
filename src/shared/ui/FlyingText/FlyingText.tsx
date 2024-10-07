import { useEffect, useState } from "react";
import "./flyingText.css";

interface IFlyingTextProps {
	chars: string[];
}

export const FlyingText = ({ chars }: IFlyingTextProps) => {
	// Используем состояние для управления классом "hidden"
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Запускаем эффект, который через 500ms покажет текст
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		// Очищаем таймер при размонтировании компонента
		return () => clearTimeout(timer);
	}, []);

	if (!chars.length) {
		return null;
	}

	return (
		<ul className={`fly-in-text ${isVisible ? "" : "hidden"}`}>
			{chars.map((char, idx) => (
				<li key={idx}>{char}</li>
			))}
		</ul>
	);
};
