// src/pages/NotFoundPage.tsx
import React from "react";
import { Container, Paper, Text, Title, Center } from "@mantine/core";

const NotFoundPage: React.FC = () => {
	return (
		<Container size="xs" my="xl">
			<Paper shadow="md" radius="md" p="xl" withBorder>
				<Center>
					<Title order={2}>404 - Page Not Found</Title>
				</Center>
				<Text mt="md">The page you are looking for does not exist.</Text>
			</Paper>
		</Container>
	);
};

export default NotFoundPage;
