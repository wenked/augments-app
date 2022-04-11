import React, { useState } from "react";
import { Input, Stack, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Augment } from "../graphql/generated";

interface SearchBoxContainerProps {
	data: Augment[];
	setData: React.Dispatch<React.SetStateAction<Augment[]>>;
}

const SearchBox: React.FC<SearchBoxContainerProps> = ({ data, setData }) => {
	const [search, setSearch] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputText = e.target.value.toLowerCase();

		const filteredData = data.filter((item) => item.name.toLowerCase().includes(inputText));
		setSearch(inputText);
		setData(filteredData);
	};

	return (
		<Stack>
			<InputGroup>
				<InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
				<Input width="300px" placeholder="Pesquisar" onChange={handleChange} value={search} />
			</InputGroup>
		</Stack>
	);
};

export default SearchBox;
