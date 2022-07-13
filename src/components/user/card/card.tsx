/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Card(props: any) {
  const { variant, children, ...rest } = props;
  const bgColor = useColorModeValue("white", "#1F2733");
  const styles = {
    p: "22px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: "20px",
    backgroundClip: "border-box",
    boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
    bg: bgColor,
  };
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
