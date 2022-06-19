import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import YouTube from "react-youtube";
import { HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";

interface Subtitle {
  data: {
    start: number;
    end: number;
    text: string;
  }[];
}

export default function Editor() {
  const [subtitle, setSubtitle] = useState("");

  return (
    <ReflexContainer
      style={{ width: "100vw", height: "50vh" }}
      orientation="vertical"
    >
      <ReflexElement minSize={100}>
        <YouTube />
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane">
        <>
          <HStack>
            <Text>1</Text>
            <Input></Input>
            <Textarea noOfLines={2} defaultValue="Take some chakra" />
          </HStack>
        </>
      </ReflexElement>
    </ReflexContainer>
  );
}

Editor.options = { auth: false } as PageOptions;
