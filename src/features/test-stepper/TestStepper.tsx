import React, { useEffect, useState } from "react";
import { Button, Title, Stepper, Group, Radio, Checkbox, Textarea } from "@mantine/core";
import { appStore } from "@/app/store/appStore";
import { getInitialState, isSecondQuestionCorrect } from "@/shared/utils/helpers";
import { useNavigate } from "react-router-dom";
import { RoutsEnum } from "@/app/routes/constants";

export const TestStepper: React.FC = () => {
	const navigate = useNavigate();

	const setResult = appStore.getState().setResult;

	const [active, setActive] = useState<number>(getInitialState("activeStep", 0));
	const [selectedAnswer, setSelectedAnswer] = useState<string>(getInitialState("selectedAnswer", "option1"));
	const [selectedOptions, setSelectedOptions] = useState<string[]>(getInitialState("selectedOptions", []));
	const [longAnswer, setLongAnswer] = useState<string>(getInitialState("longAnswer", ""));

	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	useEffect(() => {
		localStorage.setItem("activeStep", JSON.stringify(active));
	}, [active]);

	useEffect(() => {
		localStorage.setItem("selectedAnswer", JSON.stringify(selectedAnswer));
	}, [selectedAnswer]);

	useEffect(() => {
		localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
	}, [selectedOptions]);

	useEffect(() => {
		localStorage.setItem("longAnswer", JSON.stringify(longAnswer));
	}, [longAnswer]);

	const handleSubmitAnswers = () => {
		let count = 0;

		if (selectedAnswer === "option1") {
			count++;
		}

		const isSecondAnswerRight = isSecondQuestionCorrect(selectedOptions);

		if (isSecondAnswerRight) {
			count++;
		}

		if (longAnswer.length > 0) {
			count++;
		}

		setResult(count);
		navigate(RoutsEnum.results);
	};

	return (
		<>
			<Stepper active={active} onStepClick={setActive}>
				<Stepper.Step label="First step" description="Answer the question">
					<Title order={3} mb={10}>
						Question 1: What is JSX?
					</Title>
					<Radio.Group
						value={selectedAnswer}
						onChange={setSelectedAnswer}
						name="question1"
						label="Choose one of the following options:"
						withAsterisk
					>
						<Radio value="option1" label="A JavaScript syntax extension for React" mb={10} mt={10} />
						<Radio value="option2" label="A CSS framework" mb={10} />
						<Radio value="option3" label="A database management tool" mb={10} />
					</Radio.Group>
				</Stepper.Step>

				<Stepper.Step label="Second step" description="Select correct answers">
					<Title order={3}>Question 2: Which of the following are JavaScript frameworks?</Title>
					<Checkbox.Group value={selectedOptions} onChange={setSelectedOptions} label="Choose all that apply:" withAsterisk>
						<Checkbox value="react" label="React" mb={10} mt={10} />
						<Checkbox value="vue" label="Vue.js" mb={10} />
						<Checkbox value="django" label="Django" mb={10} />
						<Checkbox value="angular" label="Angular" mb={10} />
					</Checkbox.Group>
				</Stepper.Step>

				<Stepper.Step label="Final step" description="Write your answer">
					<Title order={3}>
						Question 3: Please provide a detailed answer on why you chose React as your preferred framework?
					</Title>
					<Textarea
						placeholder="Your detailed answer here..."
						label="Your Answer"
						withAsterisk
						minRows={4}
						value={longAnswer}
						onChange={(event) => setLongAnswer(event.currentTarget.value)}
						mb={10}
						mt={10}
					/>
				</Stepper.Step>
			</Stepper>
			<Group justify="center" mt="xl">
				{active !== 0 && <Button onClick={prevStep}>Back</Button>}
				{active !== 3 && <Button onClick={nextStep}>Next step</Button>}
				{active === 3 && <Button onClick={handleSubmitAnswers}>Submit Answers</Button>}
			</Group>
		</>
	);
};
