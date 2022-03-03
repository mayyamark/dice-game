import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
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

const OptionsWrapper = styled(Paper)(({ theme }) => ({
  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const OptionWrapper = styled(Box)({
  cursor: "pointer",
  "& :hover": {
    backgroundColor: "#bbdefb",
    "& > *": {
      backgroundColor: "#bbdefb",
    },
  },
});

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
            {face?.winning === "true" && (
              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "success.main",
                  marginBottom: 5,
                }}
              >
                YOU WON!
              </Typography>
            )}
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
      <OptionsWrapper elevation={3}>
        <Typography variant="h2" textAlign="center">
          Dice options
        </Typography>

        {options?.[0]?.map((option, index) => (
          <OptionWrapper
            sx={{
              border:
                selectedOption?.id === option.id ? "2px solid #1976d2" : "none",
            }}
            onClick={() => {
              setSelectedOption(option);
              setFace(option.diceFaces[0]);
            }}
            key={option.id}
          >
            <Box p={3}>
              <Typography variant="h5">
                Dice No <b>{index + 1}</b>
              </Typography>
              <Typography>
                Dice shape: <b>{option.shape}</b>
              </Typography>
              <Typography>
                Number of faces: <b>{option.faces}</b>
              </Typography>
              <Typography>Faces:</Typography>
              <Box pl={3}>
                {option.diceFaces.map((face) => (
                  <Box mb={2}>
                    <Typography>
                      Color: <b>{face.color}</b>
                    </Typography>
                    <Typography>
                      Value: <b>{face.value}</b>
                    </Typography>
                    {face.winning === "true" ? (
                      <Typography
                        sx={{ color: "success.main", fontWeight: "bold" }}
                      >
                        WINNING FACE!
                      </Typography>
                    ) : null}
                  </Box>
                ))}
              </Box>
            </Box>
          </OptionWrapper>
        ))}
      </OptionsWrapper>
    </Layout>
  );
};

export default Play;
