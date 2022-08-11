import useSWR from "swr";

export default function LanguageCodeList() {
  const { data } = useSWR("https://strapi.subcloud.app/api/supported-language");
  if (!data || !data.data) return undefined;
  return data.data.attributes.body;
}
