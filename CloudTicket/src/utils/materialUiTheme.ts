import { ButtonProps, createTheme } from "@mui/material";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
    "pr-medium": true;
  }
}
export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "pr-medium" },
          style: {
            textTransform: "none",
            border: "1px solid var(--primary-color)",
            background: "inherit",
            color: "var(--primary-color)",
            //   border: `2px dashed grey${blue[500]}`,
          },
        },
      ],
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          zIndex: 1301, // Higher than the default Modal zIndex (1300)
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 1300, // Default value is 1300
        },
      },
    },
  },
});
