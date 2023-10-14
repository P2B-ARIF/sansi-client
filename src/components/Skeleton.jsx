import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const Skeleton = ({ noOfLines, spacing, circle }) => {
	return (
		<Box width={"full"} padding='6' boxShadow='lg' bg='white' borderRadius={'lg'}>
			{circle
				? circle === true && <SkeletonCircle size='10' mb='4' />
				: circle === undefined && <SkeletonCircle size='10' mb='4' />}
			<SkeletonText
				
				noOfLines={noOfLines}
				spacing={spacing ? spacing : "5"}
				skeletonHeight='2'
			/>
		</Box>
	);
};

export default Skeleton;
