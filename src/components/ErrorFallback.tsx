import { getError } from "@/util/error";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback (props: FallbackProps) {
  const { error } = props
  const formattedError = getError(error)

  return (
    <Card w={"100%"} backgroundColor={"red.100"}>
      <CardHeader>
        <Heading size='md'>
          {formattedError.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text size={"xs"}>
          {formattedError.message}
        </Text>
      </CardBody>
    </Card>
  )
}
