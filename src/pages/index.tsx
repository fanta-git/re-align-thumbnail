import AlignField from "@/components/AlignField";
import Forms from "@/components/Forms";
import { FormContents } from "@/types/form";
import { Container, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<FormContents>()

  return (
    <Container w={'100%'}>
      <VStack>
        <Forms isLoading={false} setFormData={setFormData} />
        {formData && <AlignField formData={formData} />}
      </VStack>
    </Container>
  )
}
