import React, { useEffect } from "react";
import { Container, Paper, Button, Title, TextInput, Center, PasswordInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { appStore, IUserData } from "@/app/store/appStore";
import { useNavigate } from "react-router-dom";
import { RoutsEnum } from "@/app/routes/constants";
import { useTranslation } from "react-i18next"; // Импортируем хук для перевода

const LoginPage: React.FC = () => {
	const { t } = useTranslation(); // Хук для доступа к функциям перевода
	const navigate = useNavigate();

	const user = appStore((state) => state.user);
	const setUserData = appStore.getState().setUserData;

	useEffect(() => {
		if (user) {
			navigate(RoutsEnum.test);
		}
	}, [user]);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: { name: "", password: "" },
		validate: {
			name: (value) => (value.length < 2 ? t("nameError") : null),
			password: (value) => (value.length < 2 ? t("passwordError") : null),
		},
	});

	const handleSubmit = (data: IUserData) => {
		setUserData(data);
		localStorage.setItem("name", data.name);
	};

	return (
		<Container size="xs" my="xl">
			<Paper shadow="md" radius="md" p="xl" withBorder>
				<Center>
					<Title order={2}>{t("login")}</Title>
				</Center>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label={t("name")} placeholder={t("name")} key={form.key("name")} {...form.getInputProps("name")} />
					<PasswordInput
						label={t("password")}
						placeholder={t("password")}
						key={form.key("password")}
						{...form.getInputProps("password")}
					/>
					<Button type="submit" mt="sm">
						{t("submit")}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default LoginPage;
