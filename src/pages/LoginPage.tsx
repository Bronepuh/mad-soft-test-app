import React, { useEffect } from "react";
import { Container, Paper, Button, Title, TextInput, Center, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { appStore, IUserData } from "@/app/store/appStore";
import { useNavigate } from "react-router-dom";
import { RoutsEnum } from "@/app/routes/constants";

const LoginPage: React.FC = () => {
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
			name: (value) => (value.length < 2 ? "First name is too short" : null),
			password: (value) => (value.length < 2 ? "Last name is too short" : null),
		},
	});

	const handleSubmit = (data: IUserData) => {
		console.log("DATA: ", data);
		setUserData(data);
		localStorage.setItem("name", data.name);
	};

	return (
		<Container size="xs" my="xl">
			<Paper shadow="md" radius="md" p="xl" withBorder>
				<Center>
					<Title order={2}>Login</Title>
				</Center>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput label="Name" placeholder="Name" key={form.key("name")} {...form.getInputProps("name")} />
					<PasswordInput label="Password" placeholder="Password" key={form.key("password")} {...form.getInputProps("password")} />

					<Button type="submit" mt="sm">
						Submit
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default LoginPage;
