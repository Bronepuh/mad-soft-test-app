import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Group, Button, Select } from "@mantine/core";
import { appStore } from "@/app/store/appStore";
import { RoutsEnum } from "@/app/routes/constants";
import { FlyingText } from "@/shared/ui/FlyingText/FlyingText";
import i18n from "@/i18n";
import { changeLanguage } from "@/shared/utils/helpers";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const navigate = useNavigate();

	const user = appStore((state) => state.user);
	const result = appStore((state) => state.result);
	const setUserData = appStore.getState().setUserData;

	// Локальное состояние для хранения выбранного языка
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

	const handleLogout = () => {
		setUserData(null);
		localStorage.clear();
		navigate(RoutsEnum.login);
	};

	// Следим за изменениями языка в i18n и обновляем состояние
	useEffect(() => {
		const handleLanguageChange = () => {
			setSelectedLanguage(i18n.language);
		};

		i18n.on("languageChanged", handleLanguageChange); // Подписываемся на событие смены языка

		return () => {
			i18n.off("languageChanged", handleLanguageChange); // Отписываемся от события при размонтировании компонента
		};
	}, []);

	const handleLanguageSelect = (language: string | null) => {
		changeLanguage(language);
		setSelectedLanguage(language || "en"); // Обновляем локальное состояние при выборе языка
	};

	return (
		<>
			<Container h={60} p="xs">
				<Container>
					<Group
						style={{
							alignItems: "baseline",
						}}
					>
						<FlyingText chars={["T", "e", "s", "t", "i", "n", "g"]} />
						<Group>
							{user && (
								<Button variant="subtle" color="dark" onClick={handleLogout}>
									Logout
								</Button>
							)}
							{!user && (
								<NavLink to="/">
									{({ isActive }) => (
										<Button variant="subtle" color={isActive ? "blue" : "dark"}>
											Login
										</Button>
									)}
								</NavLink>
							)}

							{!result && (
								<NavLink to="/test">
									{({ isActive }) => (
										<Button variant="subtle" color={isActive ? "blue" : "dark"}>
											Test
										</Button>
									)}
								</NavLink>
							)}

							{result && user && (
								<NavLink to="/results">
									{({ isActive }) => (
										<Button variant="subtle" color={isActive ? "blue" : "dark"}>
											Results
										</Button>
									)}
								</NavLink>
							)}
						</Group>
						<Select
							placeholder="Choose"
							value={selectedLanguage} // Используем локальное состояние для выбранного языка
							data={[
								{ value: "en", label: "English" },
								{ value: "ru", label: "Русский" },
							]}
							onChange={handleLanguageSelect} // Используем обработчик для изменения языка
							mt="md"
						/>
					</Group>
				</Container>
			</Container>
			<main>{children}</main>
		</>
	);
};

export default Layout;
