import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Group, Button, Text } from "@mantine/core";
import { appStore } from "@/app/store/appStore";
import { RoutsEnum } from "@/app/routes/constants";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const navigate = useNavigate();

	const user = appStore((state) => state.user);
	const result = appStore((state) => state.result);
	const setUserData = appStore.getState().setUserData;

	const handleLogout = () => {
		setUserData(null);
		localStorage.clear();
		navigate(RoutsEnum.login);
	};

	return (
		<>
			<Container h={60} p="xs">
				<Container>
					<Group>
						<Text style={{ fontSize: 14 }}>Educational Testing</Text>
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
					</Group>
				</Container>
			</Container>
			<main>{children}</main>
		</>
	);
};

export default Layout;
