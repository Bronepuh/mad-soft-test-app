import React from "react";
import { Container, Paper, Text, Button, Title, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { appStore } from "@/app/store/appStore";
import { RoutsEnum } from "@/app/routes/constants";

const ResultsPage: React.FC = () => {
	const navigate = useNavigate();

	const user = appStore((state) => state.user);
	const result = appStore((state) => state.result);
	const setUserData = appStore.getState().setUserData;
	const setResult = appStore.getState().setResult;

	const handleLogout = () => {
		setUserData(null);
		setResult(null);
		localStorage.clear();
		navigate(RoutsEnum.login);
	};

	return (
		<Container size="md" my="xl">
			<Paper shadow="md" radius="md" p="xl" withBorder>
				<Center>
					<Title order={2}>Results Page</Title>
				</Center>
				{!user && <Text mt="md">You need login and your test results will appear here</Text>}
				{user && (
					<>
						{result === 3 && (
							<Container style={{ textAlign: "center", padding: "50px" }}>
								<Text
									size="xl"
									w={700}
									style={{
										marginTop: "20px",
										marginLeft: "auto",
										marginRight: "auto",
										fontSize: 40,
										fontWeight: 700,
									}}
									c={"green"}
								>
									{`${result}/3`}
								</Text>
								<Text size="xl" w={700} style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto" }} c={"orange"}>
									Congratulations!
								</Text>
								<Text size="lg" style={{ marginTop: "10px" }}>
									You have successfully completed the test!
								</Text>
							</Container>
						)}
						{(result && result < 3) ||
							(result === 0 && (
								<Text
									size="xl"
									w={700}
									style={{
										marginTop: "20px",
										marginLeft: "auto",
										marginRight: "auto",
										fontSize: 40,
										fontWeight: 700,
										textAlign: "center",
									}}
									c={"green"}
								>
									{`${result}/3`}
								</Text>
							))}
						<Button fullWidth mt="xl" onClick={handleLogout}>
							Logout and Go back to Login
						</Button>
					</>
				)}
			</Paper>
		</Container>
	);
};

export default ResultsPage;
