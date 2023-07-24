import { Box, Container, HStack, Heading, Icon, Spacer, Center, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { IoLogoGithub, IoMdHelpCircleOutline } from 'react-icons/io';

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
          <Link as={NextLink} href={"/"} _hover={{ color: "brand.400" }}>
            <LabelOrIcon label={"使い方"} icon={IoMdHelpCircleOutline} />
          </Link>
          <Link as={NextLink} href={"/"} _hover={{ color: "brand.400" }}>
            <LabelOrIcon label={"GitHub"} icon={IoLogoGithub} />
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

function LabelOrIcon(props: { icon: IconType, label: string }) {
  const { icon, label } = props

  return (
    <>
      <Center display={["block", "none"]}>
        <Icon as={icon} boxSize={8} />
      </Center>
      <Box display={["none", "block"]} fontWeight={"bold"}>
        {label}
      </Box>
    </>
  )
}
