import { getListBase } from "@/foundations/getListBase";
import { isImageLoadingState, playlistBaseState } from "@/stores/playlist";
import { Box, Button, FormLabel, Input, InputGroup, InputRightAddon, Radio, RadioGroup, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

type FormContents = {
  url: string,
  columns: number,
  rows: number,
  width: number,
  height: number,
  outputWidth: number,
  outputHeight: number
}

export default function Forms() {
  const { handleSubmit, register } = useForm<FormContents>()
  const setPlaylistBase = useSetRecoilState(playlistBaseState)
  const isImageLoading = useRecoilValue(isImageLoadingState)

  const onSubmit = (data: FormContents) => {
    console.log(data);
    const { url } = data
    if (url == null) return

    const base = getListBase(url)
    if (base === undefined) return
    setPlaylistBase(base)
  }

  const [value, setValue] = useState('2')

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <VStack>
        <Box w={"100%"}>
          <FormLabel>KiiteプレイリストのURL</FormLabel>
          <Input placeholder="https://kiite.jp/playlist/xxxxxxxxxxx" {...register("url")} />
        </Box>
        <RadioGroup onChange={setValue} value={value}>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>固定</Th>
                  <Th>縦</Th>
                  <Th>横</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td><Radio value={'0'}>グリッド数</Radio></Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={10} min={1} {...register("columns")} />
                      <InputRightAddon>列</InputRightAddon>
                    </InputGroup>
                  </Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={10} min={1} {...register("rows")} />
                      <InputRightAddon>行</InputRightAddon>
                    </InputGroup>
                  </Td>
                </Tr>
              </Tbody>
              <Tbody>
                <Tr>
                  <Td><Radio value={'1'}>サムネイル</Radio></Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={90} min={1} {...register("width")} />
                      <InputRightAddon>px</InputRightAddon>
                    </InputGroup>
                  </Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={160} min={1} {...register("height")} />
                      <InputRightAddon>px</InputRightAddon>
                    </InputGroup>
                  </Td>
                </Tr>
              </Tbody>
              <Tbody>
                <Tr>
                  <Td><Radio value={'2'}>出力画像</Radio></Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={900} min={1} {...register("outputWidth")} />
                      <InputRightAddon>px</InputRightAddon>
                    </InputGroup>
                  </Td>
                  <Td>
                    <InputGroup>
                      <Input type={"number"} defaultValue={1600} min={1} {...register("outputHeight")} />
                      <InputRightAddon>px</InputRightAddon>
                    </InputGroup>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </RadioGroup>
        <Button type="submit" colorScheme={"cyan"} color={"white"} isLoading={isImageLoading}>生成</Button>
      </VStack>
    </form>
  )
}
