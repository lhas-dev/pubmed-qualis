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
  const [url, setUrl] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    (async () => {
      try {
        setError(false);
        setLoading(true);
        const req = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        const res = await req.json();
        setLoading(false);

        setData(res);
      } catch (e) {
        setError(true);
      }
    })();
  };
  return (
    <Box as="form" onSubmit={onSubmit} p="10">
      <Heading>PubMed Qualis</Heading>
      <HStack gap="10" mt="10">
        <FormControl>
          <FormLabel>PubMed URL</FormLabel>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <FormHelperText>
            e.g. https://pubmed.ncbi.nlm.nih.gov/36119826/
          </FormHelperText>
        </FormControl>
        <Button isLoading={loading} disabled={loading} type="submit">
          {loading ? "Pesquisando" : "Pesquisar"}
        </Button>
      </HStack>
      {error && <Text>Parece que ocorreu um erro. :/</Text>}
      {!loading && data.keyword && (
        <Box mt="10">
          <Text>
            <strong>Palavra-chave:</strong> {data.keyword}{" "}
          </Text>
          <Text
            mt="5"
            dangerouslySetInnerHTML={{
              __html:
                data.response[0] === null
                  ? "Esta revista não parece ser predatória."
                  : `Atenção, essa revista pode ser predatória. Suas classificações CAPES são: <strong>${data.response.join(
                      ", "
                    )}</strong>`,
            }}
          ></Text>
        </Box>
      )}
    </Box>
  );
}
