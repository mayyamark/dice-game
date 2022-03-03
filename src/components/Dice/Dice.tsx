import { styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
  value?: string;
  diceStyles?: { [key: string]: string };
  faceStyles?: { [key: string]: string };
}

const Dice = styled(Box)(({ theme }) => ({
  width: 200,
  height: 200,
  backgroundColor: "#fff",
  border: "3px solid #000",
  borderRadius: theme.spacing(1.25),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Face = styled(Typography)({
  color: "#000",
  fontSize: 50,
  fontFamily: "Georgia",
});

const CustomDice: React.FC<IProps> = ({ value, diceStyles, faceStyles }) => {
  return (
    <Dice style={diceStyles}>
      {value ? <Face style={faceStyles}>{value}</Face> : <CircularProgress />}
    </Dice>
  );
};

export default CustomDice;
