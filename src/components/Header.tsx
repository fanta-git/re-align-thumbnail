import { REPOSITORY_URL } from "@/consts/page";
import { Box, Center, Container, HStack, Heading, Icon, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { IoLogoGithub } from 'react-icons/io';

export default function Header() {
  return (
    <Box color={"brand.50"} bgColor={"brand.900"}>
      <Container maxW="container.lg">
        <HStack spacing={[5, 10]}>
          <Box py="4">
            <NextLink href="/">
              <Heading as='h1' fontSize="2xl" cursor="pointer">
                Re:AlignThumbnail
              </Heading>
            </NextLink>
          </Box>
          <Spacer />
          <Link as={NextLink} href={REPOSITORY_URL} _hover={{ color: "brand.400" }}>
            <Center display={["block", "none"]} h={8}>
              <Icon as={IoLogoGithub} boxSize={"full"} />
            </Center>
            <Box display={["none", "block"]} fontWeight={"bold"}>
              GitHub
            </Box>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}
