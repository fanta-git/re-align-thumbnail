import Aligned from "@/components/Aligned";
import Forms from "@/components/Forms";
import { Container } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container w={'100%'}>
      <Forms />
      <Suspense fallback={<>Loading...</>}>
        <Aligned />
      </Suspense>
    </Container>
  )
}
