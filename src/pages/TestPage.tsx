import React from "react";
import { Container, Paper, Text, Title, Center, Flex } from "@mantine/core";
import { appStore } from "@/app/store/appStore";
import { TestStepper } from "@/features/test-stepper/TestStepper";
import CountdownTimer from "@/entities/timer/Timer";

const TestPage: React.FC = () => {
	const user = appStore((state) => state.user);

	return (
		<Container size="md" my="xl">
			<Paper shadow="md" radius="md" p="xl" withBorder>
				<Center>
					<Flex justify="space-between" align="center" style={{ width: "100%" }}>
						<Title w={200} order={2}>
							Test Page
						</Title>
						<CountdownTimer initialSeconds={60} />
					</Flex>
				</Center>
				{!user && <Text mt="md">You need login and here will be the test questions...</Text>}
				{user && (
					<>
						<Title order={2} c={"green"}>
							{user.name}
						</Title>
						<Text mt="md" mb={"xl"}>
							Go-go-go!
						</Text>
						<TestStepper />
					</>
				)}
			</Paper>
		</Container>
	);
};

export default TestPage;
