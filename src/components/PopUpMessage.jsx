import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Image, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPopUpMessage } from "../toolkit/ProductsSlice";

const PopUpMessage = () => {
	const { popUp } = useSelector(state => state.products);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setOpen(false);
		const pop = JSON.parse(localStorage.getItem("popUp"));

		if (pop?.date !== popUp?.updateDate?.fns?.fns_P) {
			setOpen(true);
		}

		const fetch = async () => {
			if (popUp === null) {
				const url = `${process.env.REACT_APP_SERVER_URL}/control/get/popup`;
				await axios
					.get(url)
					.then(res => {
						dispatch(addPopUpMessage(res.data.popUp));
					})
					.catch(err => console.log(err.message, "controller error"));
			}
		};
		fetch();
	}, [dispatch, popUp]);

	return (
		<>
			{popUp !== null && (
				<Modal
					isOpen={open}
					onClose={() => {
						localStorage.setItem(
							"popUp",
							JSON.stringify({
								action: false,
								date: popUp?.updateDate?.fns?.fns_P,
							}),
						);
						setOpen(false);
					}}
					isCentered
				>
					<ModalOverlay />
					<ModalContent padding={"0px"} mx={{ base: "5", md: "0" }}>
						{/* <ModalHeader>Modal Title</ModalHeader> */}
						<ModalCloseButton
							onClick={() => {
								localStorage.setItem(
									"popUp",
									JSON.stringify({
										action: false,
										date: popUp?.updateDate?.fns?.fns_P,
									}),
								);
								setOpen(false);
							}}
							css={{
								"&:focus": {
									outline: "none",
									boxShadow: "none",
								},
								"&:active": {
									outline: "none",
									boxShadow: "none",
								},
								"&:hover": {
									outline: "none",
									boxShadow: "none",
								},
							}}
						/>
						<ModalBody padding={"0px"}>
							<Image
								src={popUp?.image}
								alt='pop up message here...'
								borderRadius='lg'
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default PopUpMessage;
