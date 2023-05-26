import Forms from "@/components/Forms";
import useAlign from "@/hooks/useAlign";
import { Container, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  const { aligned, align, isLoading } = useAlign();

  return (
    <Container w={'100%'}>
      <VStack>
        <Forms align={align} isLoading={isLoading} />
        {aligned && <Image width={1600} height={900} alt={""} src={aligned} />}
      </VStack>
    </Container>
  )
}
