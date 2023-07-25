import AlignField from "@/components/AlignField";
import Forms from "@/components/Forms";
import { Container, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW={'container.sm'} marginTop="4" marginBottom="16">
      <VStack>
        <Forms />
        <AlignField />
      </VStack>
    </Container>
  )
}
