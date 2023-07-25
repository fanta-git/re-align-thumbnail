import { extendTheme } from "@chakra-ui/react";

const brand = {
    "50": "#FDFDFD",
    "100": "#e1ecf4",
    "200": "#c5dbea",
    "300": "#a9cbe1",
    "400": "#8dbad7",
    "500": "#70a9ce",
    "600": "#5498c4",
    "700": "#3888bb",
    "800": "#1c77b1",
    "900": "#2F6DA9",
}

export default extendTheme({
    colors: {
        brand,
    }
})
