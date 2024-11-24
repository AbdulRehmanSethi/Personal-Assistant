import { useEffect, useState } from "react";

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

function useVoice() {
  const [recognized, setRecognized] = useState("");
  const [volume, setVolume] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    //console.log("onSpeechStart: ", e);
    setStarted("√");
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    //console.log("onSpeechRecognized: ", e);
  };

  const onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e);
    setEnd(e);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    //console.log("onSpeechError: ", e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    //console.log("onSpeechResults: ", e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    //console.log("onSpeechPartialResults: ", e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start("en-US");
      //console.log("called start");
    } catch (e) {
      //console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized("");
    setVolume("");
    setError("");
    setEnd("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
  };

  return {
    _startRecognizing,
    _stopRecognizing,
    _destroyRecognizer,
    results,
    partialResults,
    end,
  };
}

export default useVoice;
