import React, { useEffect } from "react";
import Layout from "../widgets/layout/Layout";
import MainRoutes from "./routes/MainRoutes";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { appStore } from "./store/appStore";

const App: React.FC = () => {
	const setUserData = appStore.getState().setUserData;
	const userNameInLocalStorage = localStorage.getItem("name");

	useEffect(() => {
		if (userNameInLocalStorage) {
			setUserData({ name: userNameInLocalStorage });
		}
	}, [userNameInLocalStorage]);

	return (
		<MantineProvider defaultColorScheme="dark">
			<BrowserRouter>
				<Layout>
					<MainRoutes />
				</Layout>
			</BrowserRouter>
		</MantineProvider>
	);
};

export default App;
