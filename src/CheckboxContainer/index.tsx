import React from "react";
import { Augment } from "../graphql/generated";
import { Checkbox, Stack } from "@chakra-ui/react";

interface CheckboxContainerProps {
	data: Augment[];
	setData: React.Dispatch<React.SetStateAction<Augment[]>>;
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({ data, setData }) => {
	const [checked, setChecked] = React.useState<string[]>(["silver", "gold", "prismatic"]);

	const handleChange = (value: string) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		const filteredData = data.filter((item) => newChecked.includes(item.tier.toLowerCase()));

		setData(filteredData);
		setChecked(newChecked);
	};

	return (
		<Stack spacing={[1, 5]} direction={["column", "row"]}>
			<Checkbox value="silver" onChange={(e) => handleChange(e.target.value)} defaultChecked>
				Silver
			</Checkbox>
			<Checkbox value="gold" onChange={(e) => handleChange(e.target.value)} defaultChecked>
				Gold
			</Checkbox>
			<Checkbox value="prismatic" onChange={(e) => handleChange(e.target.value)} defaultChecked>
				Prismatic
			</Checkbox>
		</Stack>
	);
};

export default CheckboxContainer;
