import { REPOSITORY_URL } from "@/consts/page";
import { Box, Container, HStack, Heading, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
    <Box color={"brand.50"} bgColor={"brand.900"}>
      <Container maxW="container.lg">
        <HStack spacing={[5, 10]} h={14}>
          <Link as={NextLink} href="/">
            <Heading as='h1' fontSize="2xl" cursor="pointer">
              Re:AlignThumbnail
            </Heading>
          </Link>
          <Spacer />
          <Link as={NextLink} href={REPOSITORY_URL} _hover={{ color: "brand.400" }}>
            GitHub
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}
