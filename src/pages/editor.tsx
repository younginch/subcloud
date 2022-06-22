import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import YouTube from "react-youtube";
import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Subtitle {
  data: {
    start: number;
    end: number;
    text: string;
  }[];
}

const dataExample = [
  {
    start: 0,
    end: 11234,
    text: "Hello World",
  },
];

const srtExample = `
1
00:00:15,563 --> 00:00:18,052
The club isn't the best place
to find a lover

2
00:00:18,052 --> 00:00:20,673
So the bar is where I go
(Mmmmm)

3
00:00:20,673 --> 00:00:22,902
Me and my friends
at the table doing shots

4
00:00:22,902 --> 00:00:25,455
Drinking fast and then we talk slow 
(Mmmmm)

5
00:00:25,455 --> 00:00:28,241
Come over and start up
a conversation with just me

6
00:00:28,241 --> 00:00:30,653
And trust me
I'll give it a chance now (Mmmmm)

`;

function miliToString(mili: number): string {
  return `${dayjs.duration(mili).format("HH:mm:ss,SSS")}`;
}

export default function Editor() {
  const [subtitle, setSubtitle] = useState<Subtitle>({ data: dataExample });

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
        {subtitle?.data.map((value, index) => {
          return (
            <HStack key={index}>
              <Text>{index + 1}</Text>
              <Stack>
                <Editable defaultValue={miliToString(value.start)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue={miliToString(value.end)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Stack>
              <Textarea noOfLines={2} defaultValue={value.text} />
            </HStack>
          );
        })}
      </ReflexElement>
    </ReflexContainer>
  );
}

Editor.options = { auth: false } as PageOptions;
