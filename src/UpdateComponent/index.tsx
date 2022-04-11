import React from "react";
import { Stat, StatHelpText, Button } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface UpdateProps {
	date: string;
}

const UpdateComponent: React.FC<UpdateProps> = ({ date }) => {
	const queryClient = useQueryClient();

	const handleUpdateRequest = async () => {
		try {
			const data = await queryClient.fetchQuery("updateDb", async () => {
				const response = await axios.post("http://127.0.0.1:8000/updatedb");
				return response?.data;
			});

			toast.success(`${data?.message}`);
			setTimeout(() => {
				console.log("estou sendo executado");
				queryClient.invalidateQueries("GetAugments");
			}, 60000);
		} catch (error) {
			toast.error("Erro ao realizar update");
			console.log(error);
		}
	};

	return (
		<Stat width="200px">
			<Button colorScheme="blue" marginBottom={1} onClick={handleUpdateRequest}>
				Update DB
			</Button>
			{console.log(date)}
			<StatHelpText justifySelf="flex-end">Último update: {date}</StatHelpText>
		</Stat>
	);
};

export default UpdateComponent;
