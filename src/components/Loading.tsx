import { Spinner } from "@chakra-ui/spinner";

export default function Loading () {
  return (
    <Spinner
      thickness={"4px"}
      emptyColor="brand.300"
      color="brand.900"
      size={"lg"}
    />
  )
}
