import Aligned from "@/components/Aligned";
import ErrorBoundary from "@/components/ErrorBoundary";
import Forms from "@/components/Forms";
import { Container, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container w={'100%'}>
      <VStack>
        <Forms />
        <ErrorBoundary>
          <Suspense fallback={<>Loading...</>}>
            <Aligned />
          </Suspense>
        </ErrorBoundary>
      </VStack>
    </Container>
  )
}
