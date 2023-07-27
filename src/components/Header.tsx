import { REPOSITORY_URL } from "@/consts/page";
import { Box, Container, HStack, Heading, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
    <Box color={"brand.50"} bgColor={"brand.900"}>
      <Container maxW="container.lg">
        <HStack h={14}>
          <Heading as='h1' fontSize="2xl" cursor="pointer">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              Re:AlignThumbnail
            </Link>
          </Heading>
          <Spacer />
          <Link as={NextLink} href={REPOSITORY_URL} _hover={{ color: "brand.400" }}>
            GitHub
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}
