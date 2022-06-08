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
  const bgColor = useColorModeValue(
    "linear-gradient(127.09deg, rgba(226, 240, 217, 0.4) 19.41%, rgba(169, 269, 142, 0.25) 76.65%)",
    "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(42, 52, 139, 0.49) 76.65%)"
  );
  const styles = {
    p: "22px",
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(120px)",
    width: "100%",
    borderRadius: "20px",
    bg: bgColor,
    backgroundClip: "border-box",
  };
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
