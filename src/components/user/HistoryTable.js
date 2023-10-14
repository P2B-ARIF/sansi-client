import React from "react";
import { Th, TableContainer } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr } from "@chakra-ui/react";
import TableTr from "./TableTr";
import Skeleton from "../Skeleton";
import { Link } from "react-router-dom";

const HistoryTable = ({ orders, loading }) => {
	return (
		<TableContainer>
			<Table variant='simple' size='sm'>
				<Thead>
					<Tr>
						<Th>Date</Th>
						<Th>Details</Th>
						<Th>Address</Th>
						<Th>Payment</Th>
						<Th>Amount</Th>
						<Th>Status</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders &&
						!loading &&
						orders?.map((order, index) => (
							<TableTr key={index} order={order} />
						))}
				</Tbody>
			</Table>
			{loading && [0].map(i => <Skeleton key={i} noOfLines={4} />)}
			{orders?.length < 1 && !loading && (
				<div className='h-[200px] flex items-center justify-center flex-col gap-1'>
					<h2 className='font-bold text-slate-600'>History empty</h2>
					<Link
						to={"/collections/all"}
						className='flex gap-3 w-[250px] bg-teal-500 text-white border-none rounded-full py-2 text-center justify-center '
					>
						Continue Shopping
					</Link>
				</div>
			)}
		</TableContainer>
	);
};

export default HistoryTable;
