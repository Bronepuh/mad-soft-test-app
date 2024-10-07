import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import TestPage from "@/pages/TestPage";
import ResultsPage from "@/pages/ResultsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { RoutsEnum } from "./constants";

const MainRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path={RoutsEnum.login} element={<LoginPage />} />
			<Route path={RoutsEnum.test} element={<TestPage />} />
			<Route path={RoutsEnum.results} element={<ResultsPage />} />
			<Route path={RoutsEnum.other} element={<NotFoundPage />} />
		</Routes>
	);
};

export default MainRoutes;
