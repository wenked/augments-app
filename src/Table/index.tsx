import React, { useState } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Stack,
} from "@chakra-ui/react";
//import { useQuery } from "react-query";
import CheckboxContainer from "../CheckboxContainer";
//import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import SearchBox from "../SearchBox";
import { useGetAugmentsQuery, Augment } from "../graphql/generated";

moment.locale("pt-br");
/* export interface Augment {
	id: number;
	name: string;
	tier: string;
	pickrate: string;
	placement: string;
	top4: string;
	winrate: string;
	stage14: string;
	stage33: string;
	stage46: string;
	updatedAt: string;
} */

interface AugmentsTableProps {
	setUpdate: React.Dispatch<React.SetStateAction<string>>;
}

const AugmentTable: React.FC<AugmentsTableProps> = ({ setUpdate }) => {
	const [augmentData, setAugmentData] = useState<Augment[]>([]);
	const { data, isLoading, isError } = useGetAugmentsQuery(
		{
			endpoint: "http://localhost:4000/",
			fetchParams: { headers: { "Content-Type": "application/json" } },
		},
		{},
		{
			onSuccess: (data) => {
				setAugmentData(data?.Augments);

				const myMoment = moment(data.Augments[0]?.updatedAt).subtract(3, "hours").format("LLLL");
				console.log(myMoment);
				setUpdate(myMoment);
			},
		}
	);

	if (isError) {
		return <div>Failed to fetch data</div>;
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<TableContainer height="100%">
			<Stack spacing={4} direction={["column", "row"]} justifyContent="space-between">
				<CheckboxContainer data={data.Augments} setData={setAugmentData} />
				<SearchBox data={data.Augments} setData={setAugmentData} />
			</Stack>

			<Table variant="simple">
				<TableCaption>Imperial to metric conversion factors</TableCaption>
				<Thead>
					<Tr>
						<Th>Nome</Th>
						<Th>Tier</Th>
						<Th>Pickrate</Th>
						<Th>Placement</Th>
						<Th>Top 4</Th>
						<Th>Winrate</Th>
						<Th>Stage 1-4</Th>
						<Th>Stage 3-3</Th>
						<Th>Stage 4-6</Th>
					</Tr>
				</Thead>
				<Tbody>
					{augmentData?.map((augment: Augment, index) => (
						<Tr key={index}>
							<Td>{augment.name}</Td>
							<Td>{augment.tier}</Td>
							<Td>{augment.pickrate}</Td>
							<Td>{augment.placement}</Td>
							<Td>{augment.top4}</Td>
							<Td>{augment.winrate}</Td>
							<Td>{augment.stage14}</Td>
							<Td>{augment.stage33}</Td>
							<Td>{augment.stage46}</Td>
						</Tr>
					))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th>Nome</Th>
						<Th>Tier</Th>
						<Th>Pickrate</Th>
						<Th>Placement</Th>
						<Th>Top 4</Th>
						<Th>Winrate</Th>
						<Th>Stage 1-4</Th>
						<Th>Stage 3-3</Th>
						<Th>Stage 4-6</Th>
					</Tr>
				</Tfoot>
			</Table>
		</TableContainer>
	);
};

export default AugmentTable;
