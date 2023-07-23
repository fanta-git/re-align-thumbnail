import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Box color={"brand.50"} bgColor={"brand.900"}>
      <Container maxW="container.lg">
        <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <Heading as='h1' fontSize="2xl" cursor="pointer">
              Re:AlignThumbnail
            </Heading>
          </Link>
        </Flex>
      </Container>
  </Box>
  )
}
