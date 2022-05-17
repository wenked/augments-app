import React from "react";
import { Stat, StatHelpText, Button } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useSendMessageQuery } from "../graphql/generated";

interface UpdateProps {
	date: string;
}

const UpdateComponent: React.FC<UpdateProps> = ({ date }) => {
	const queryClient = useQueryClient();
	const [sendMessage, setSendMessage] = React.useState<boolean>(false);

	const { data, isLoading, isError } = useSendMessageQuery(
		{
			endpoint: "http://localhost:4000/",
			fetchParams: { headers: { "Content-Type": "application/json" } },
		},
		{},
		{ enabled: sendMessage }
	);

	return (
		<Stat width="200px">
			<Button colorScheme="blue" marginBottom={1} onClick={() => setSendMessage(true)}>
				Update DB
			</Button>
			{console.log(date)}
			<StatHelpText justifySelf="flex-end">Último update: {date}</StatHelpText>
		</Stat>
	);
};

export default UpdateComponent;
