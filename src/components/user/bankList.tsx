import {
  Box,
  Wrap,
  WrapItem,
  Text,
  useRadioGroup,
  useRadio,
  UseRadioProps,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Image, { StaticImageData } from "next/image";
import HanaIcon from "../../../public/banks/hana.png";
import IbkIcon from "../../../public/banks/ibk.png";
import KakaoIcon from "../../../public/banks/kakao.png";
import KbIcon from "../../../public/banks/kb.png";
import KbankIcon from "../../../public/banks/kbank.png";
import NonghyupIcon from "../../../public/banks/nonghyup.png";
import Saemaul from "../../../public/banks/saemaul.png";
import ScIcon from "../../../public/banks/sc.png";
import ShinhanIcon from "../../../public/banks/shinhan.png";
import TossIcon from "../../../public/banks/toss.png";
import WooriIcon from "../../../public/banks/woori.png";

const list: [string, StaticImageData][] = [
  ["kb", KbIcon],
  ["shinhan", ShinhanIcon],
  ["hana", HanaIcon],
  ["woori", WooriIcon],
  ["ibk", IbkIcon],
  ["nonghyup", NonghyupIcon],
  ["sc", ScIcon],
  ["kakao", KakaoIcon],
  ["kbank", KbankIcon],
  ["toss", TossIcon],
  ["saemaul", Saemaul],
];

type RadioCardProps = {
  children: React.ReactNode;
} & UseRadioProps;

function RadioCard(props: RadioCardProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const { children } = props;

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        borderWidth={1}
        borderRadius={12}
        w={20}
        h={32}
        p={3}
        cursor="pointer"
        justifyContent="space-between"
        dir="column"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

type BankListProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function BankList({ onChange, value }: BankListProps) {
  const { t } = useTranslation("banks");
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "bankName",
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <Wrap {...group}>
      {list.map((value) => {
        const radio = getRadioProps({ value: value[0] });
        return (
          <WrapItem key={value[0]}>
            <RadioCard key={value[0]} {...radio}>
              <Image src={value[1]} alt={value[0]} />
              <Text fontSize={10} fontWeight="bold">
                {t(value[0])}
              </Text>
            </RadioCard>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
