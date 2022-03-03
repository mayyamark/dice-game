import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useFetch from "../../hook/useFetch";
import { getToken } from "../../services/manage-token";
import AppBar from "../common/AppBar/AppBar";
import { Layout } from "../common/Layout/Layout";

const DEFAULT_FACE_VALUES = {
  color: "",
  value: "",
  winning: false,
};

const DEFAULT_DICE_VALUES = {
  faces: 1,
  shape: "",
  diceFaces: [DEFAULT_FACE_VALUES],
};

const ModeratorDashboard = () => {
  const [newDice, setNewDice] = useState(DEFAULT_DICE_VALUES);

  const { loading, makeApiCall } = useFetch();

  return (
    <Layout>
      <AppBar linkHref="/play" linkText="Roll Dice" />

      <Typography variant="h2" textAlign="center">
        Create a dice preset
      </Typography>
      <Box mb={4}>
        <Typography sx={{ fontSize: 24, marginBottom: 2 }}>
          Generic options
        </Typography>
        <Box p={2} mb={2} sx={{ border: "1px dashed #1976d2" }}>
          <TextField
            error={newDice.faces === 0}
            required
            value={newDice.faces}
            disabled={loading}
            sx={{ width: "100%", marginBottom: 3 }}
            label="Number of faces"
            variant="outlined"
            type="number"
            onChange={(ev) =>
              setNewDice((prevState) => ({
                ...prevState,
                faces: +ev.target.value,
              }))
            }
          />

          <TextField
            required
            disabled={loading}
            sx={{ width: "100%", marginBottom: 3 }}
            label="Shape type"
            variant="outlined"
            value={newDice.shape}
            onChange={(ev) =>
              setNewDice((prevState) => ({
                ...prevState,
                shape: ev.target.value,
              }))
            }
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: 24, marginBottom: 2 }}>Faces</Typography>
          {newDice.diceFaces.map((face, index) => {
            return (
              <Box
                p={2}
                mb={2}
                key={index}
                sx={{ border: "1px dashed #1976d2" }}
              >
                <Box
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Face No {index + 1}</Typography>
                </Box>
                <TextField
                  value={newDice.diceFaces[index].color}
                  required
                  disabled={loading}
                  sx={{ width: "100%", marginBottom: 3 }}
                  label="Color"
                  variant="outlined"
                  onChange={(ev) => {
                    const updatedFace = { ...face };
                    updatedFace.color = ev.target.value;

                    const updatedFaces = [...newDice.diceFaces];
                    updatedFaces[index] = updatedFace;

                    setNewDice((prevState) => ({
                      ...prevState,
                      diceFaces: updatedFaces,
                    }));
                  }}
                />
                <TextField
                  required
                  value={newDice.diceFaces[index].value}
                  disabled={loading}
                  sx={{ width: "100%", marginBottom: 3 }}
                  label="Value"
                  variant="outlined"
                  onChange={(ev) => {
                    const updatedFace = { ...face };
                    updatedFace.value = ev.target.value;

                    const updatedFaces = [...newDice.diceFaces];
                    updatedFaces[index] = updatedFace;

                    setNewDice((prevState) => ({
                      ...prevState,
                      diceFaces: updatedFaces,
                    }));
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      disabled={loading}
                      onChange={(ev) => {
                        const updatedFace = { ...face };
                        updatedFace.winning = ev.target.value === "on";

                        const updatedFaces = [...newDice.diceFaces];
                        updatedFaces[index] = updatedFace;

                        setNewDice((prevState) => ({
                          ...prevState,
                          diceFaces: updatedFaces,
                        }));
                      }}
                    />
                  }
                  label="Is winning face?"
                />
              </Box>
            );
          })}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setNewDice((prevState) => ({
                ...prevState,
                diceFaces: [...prevState.diceFaces, DEFAULT_FACE_VALUES],
              }));
            }}
            disabled={loading}
          >
            Add Face
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => {
            makeApiCall(
              {
                route: "/dice",
                options: {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newDice),
                },
              },
              {
                callback: (data) => {
                  console.log(data);
                  setNewDice(DEFAULT_DICE_VALUES);
                },
                message: "Successfully created a new preset!",
              }
            );
          }}
          disabled={loading}
        >
          Submit Dice
        </Button>
        <Button onClick={() => setNewDice(DEFAULT_DICE_VALUES)}>
          Clear form
        </Button>{" "}
      </Box>
    </Layout>
  );
};

export default ModeratorDashboard;
