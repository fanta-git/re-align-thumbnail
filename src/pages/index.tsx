import Aligned from "@/components/Aligned";
import Forms from "@/components/Forms";
import { Container, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container w={'100%'}>
      <VStack>
        <Forms />
        <Aligned />
      </VStack>
    </Container>
  )
}
