import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";

const MAX_RECORDING_TIME = 60000; // 1 minute

const GetStarted = () => {
  const [input, setInput] = useState("");
  const [intent, setIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  /* 🎙️ Speech Recognition */
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (e) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }

        console.log("🎙️ Transcribed Voice:", transcript);
        setInput((prev) => prev + " " + transcript);
      };

      recognition.onend = () => {
        clearTimeout(timeoutRef.current);
        setRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  /* ▶️ Start Recording */
  const startRecording = () => {
    if (!recognitionRef.current) return;

    setInput("");
    setRecording(true);
    recognitionRef.current.start();

    timeoutRef.current = setTimeout(() => {
      stopRecording();
    }, MAX_RECORDING_TIME);
  };

  /* ⏹️ Stop Recording */
  const stopRecording = () => {
    recognitionRef.current?.stop();
    clearTimeout(timeoutRef.current);
    setRecording(false);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setIntent(null);

    try {
      const res = await axios.post("https://steam-server.onrender.com/api/intent", {
        text: input,
      });
      setIntent(res.data);
    } catch (error) {
      console.error(error);
      setIntent({
        tasks: [],
        reminders: [],
        decisions: [],
        questions: [],
        suggestions: []
      });
    }

    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSubmit();
  };

  return (
    <div
      id="getStartedSection"
      className="flex flex-col border-t py-20 border-neutral-700"
    >
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Speak or Type →{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Intent
        </span>
      </h2>

      <div className="mt-[5vh] flex flex-grow flex-wrap">
        {/* LEFT PANEL */}
        <div className="w-full sm:w-1/2 lg:w-[30%] p-2">
          <div className="p-10 border border-neutral-700 rounded-xl h-full flex flex-col justify-between">
            <Typography variant="body2" gutterBottom>
              Speak freely or type your thoughts.
              We’ll convert them into clear intent.
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              margin="normal"
              label="Say anything..."
              value={input}
              color="secondary"
              focused
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{ style: { color: "white" } }}
            />

            <div className="flex gap-3 mt-4">
              {!recording ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<MicIcon />}
                  onClick={startRecording}
                >
                  Voice
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<StopIcon />}
                  onClick={stopRecording}
                >
                  Stop
                </Button>
              )}

              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={handleSubmit}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} style={{ color: "white" }} />
                  ) : (
                    <SendIcon />
                  )
                }
                className="bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Convert
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full sm:w-1/2 lg:w-[70%] p-2">
          <div className="p-10 border border-neutral-700 rounded-xl h-full">
            <Typography variant="h5" gutterBottom>
              Extracted Intent
            </Typography>

            <div className="max-h-[70vh] sm:h-[50vh] overflow-y-auto space-y-4">
              {intent ? (
                Object.entries(intent).map(
                  ([key, items]) =>
                    items.length > 0 && (
                      <div key={key}>
                        <Typography
                          variant="h6"
                          className="uppercase text-orange-500"
                        >
                          {key}
                        </Typography>
                        <ul className="list-disc ml-6 mt-2">
                          {items.map((item, i) => (
                            <li key={i} className="mb-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                )
              ) : (
                <Typography variant="body1" style={{ marginTop: "2rem" }}>
                  No intent extracted yet.
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  );
};

export default GetStarted;
