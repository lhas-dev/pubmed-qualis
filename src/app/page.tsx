"use client";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ keyword: "", response: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("ae");
  };
  return (
    <Box as="form" onSubmit={onSubmit} p="10">
      <Heading>PubMed Qualis</Heading>
      <HStack gap="10" mt="10">
        <FormControl>
          <FormLabel>PubMed URL</FormLabel>
          <Input type="text" />
          <FormHelperText>
            e.g. https://pubmed.ncbi.nlm.nih.gov/36119826/
          </FormHelperText>
        </FormControl>
        <Button type="submit">{loading ? "Pesquisando" : "Pesquisar"}</Button>
      </HStack>
      {data.keyword && (
        <Box mt="10">
          <Text>
            <strong>Palavra-chave:</strong> {data.keyword}{" "}
          </Text>
          <Text>
            {data.response.length === 0
              ? "Esta revista não parece ser predatória"
              : `Atenção, essa revista pode ser predatória. Suas classificações CAPES são: ${data.response.join(
                  ", "
                )}`}
          </Text>
        </Box>
      )}
    </Box>
  );
}
