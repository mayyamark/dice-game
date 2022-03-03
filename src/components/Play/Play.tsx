import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  IAllDiceResults,
  IDiceFace,
  IGetAllDiceResponse,
} from "../../common/types";
import useFetch from "../../hook/useFetch";
import { getToken } from "../../services/manage-token";
import AppBar from "../common/AppBar/AppBar";
import { FullScreenLayout, Layout } from "../common/Layout/Layout";
import Dice from "../Dice/Dice";
import DiceOptions from "../DiceOptions/DiceOptions";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *": {
    marginBottom: theme.spacing(5),
  },
}));

const PlayBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(5),
}));

const YouWon = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  fontWeight: "bold",
  color: "success.main",
  marginBottom: theme.spacing(5),
}));

const Play = () => {
  const [options, setOptions] = useState<IGetAllDiceResponse | null>(null);
  const [selectedOption, setSelectedOption] =
    useState<IAllDiceResults | null>(null);
  const [face, setFace] = useState<IDiceFace | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const { loading, makeApiCall } = useFetch();

  useEffect(() => {
    makeApiCall(
      {
        route: "/dice",
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      },
      {
        callback: (data) => {
          console.log(data);
          setOptions(data as IGetAllDiceResponse);
        },
      }
    );
  }, []);

  const handleClick = () => {
    setIsRolling(true);
    setFace(null);

    if (selectedOption && selectedOption.diceFaces) {
      const result =
        selectedOption.diceFaces[
          Math.floor(Math.random() * selectedOption.diceFaces.length)
        ];

      setTimeout(() => {
        setFace(result);
        setIsRolling(false);
      }, 1000);
    }
  };

  if (loading) {
    return (
      <FullScreenLayout>
        <CircularProgress />
      </FullScreenLayout>
    );
  }

  return (
    <Layout>
      <AppBar linkHref="/dashboard" linkText="Create preset" />
      {selectedOption && (
        <PlayBox>
          <Wrapper>
            <Dice
              value={face?.value || ""}
              diceStyles={{ backgroundColor: face?.color }}
              faceStyles={{ backgroundColor: face?.color }}
            />
            {face?.winning === "true" && <YouWon>YOU WON!</YouWon>}
          </Wrapper>
          <Button
            variant="contained"
            disabled={isRolling}
            onClick={handleClick}
          >
            {isRolling ? "Rolling..." : "Roll Dice!"}
          </Button>
        </PlayBox>
      )}
      <DiceOptions
        options={options}
        selectedOption={selectedOption}
        onClick={(option) => {
          setSelectedOption(option);
          setFace(option.diceFaces[0]);
        }}
      />
    </Layout>
  );
};

export default Play;
