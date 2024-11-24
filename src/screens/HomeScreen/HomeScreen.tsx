import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, PermissionsAndroid, Platform, Alert } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import RNFS from "react-native-fs";
import TrackPlayer, {
  Capability,
  useProgress,
} from "react-native-track-player";
import { SafeAreaView } from "react-native-safe-area-context";
import useVoice from "@/src/services/useAudio";
import MicControls from "@/src/components/MicControls";
import CallControls from "@/src/components/CallComponent";
import Header from "@/src/components/Header";
import ProgressBar from "@/src/components/ProgressBar";
import Chat from "@/src/components/ChatComponent";

const WEBSOCKET_URL =
  "wss://app.openhome.xyz/websocket/shared-personality?token=eyJ1c2VyX2lkIjoxLCJwZXJzb25hbGl0eV9pZCI6MzEwNiwiZXhwaXJlc190aW1lIjpudWxsfQ.Z0B7yA.ISehLPk6tuQ1w0xU6En1gBXlvCA&demo=true";

const App: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const audioQueue = useRef<string[]>([]);
  const progress = useProgress();
  const {
    _startRecognizing,
    _stopRecognizing,
    _destroyRecognizer,
    results,
    partialResults,
    end,
  } = useVoice();
  console.log(end);

  useEffect(() => {
    const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      });
    };

    setupTrackPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);
  useEffect(() => {
    const processPartialResults = async () => {
      if (partialResults.length > 0) {
        const text = partialResults.join(" ").trim();
        if (text) {
          console.log("Sending message from partialResults:", text);
          await handleSend([
            {
              _id: Math.random().toString(),
              text,
              createdAt: new Date().toISOString(),
              user: { _id: 1, name: "User" },
            },
          ]),
            _destroyRecognizer();
        }
      }
    };

    if (end)
      processPartialResults().then(() => {
        _destroyRecognizer();
        setIsMicActive(false);
      });
  }, [partialResults, end]);

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "This app needs access to your microphone for calls.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Microphone permission denied");
        }
      }
    };
    requestMicrophonePermission();
  }, []);

  const handleWebSocketMessage = async (event: MessageEvent) => {
    const messageData = JSON.parse(event.data);
    console.log("json Data", messageData);
    if (messageData.type === "message") {
      const newMessage: IMessage = {
        _id: Math.random().toString(),
        text: messageData.data.content,
        createdAt: new Date(),
        user: { _id: 2, name: "Assistant" },
      };
      setMessages((prev) => GiftedChat.append(prev, [newMessage]));
    } else if (messageData.type === "audio") {
      console.log("audio coming ===>", messageData.data);
      await addAudioToQueue(messageData.data);
    }
  };

  const addAudioToQueue = async (base64String: string) => {
    try {
      const filePath = `${
        RNFS.CachesDirectoryPath
      }/temp_audio_${Date.now()}.mp3`;
      await RNFS.writeFile(filePath, base64String, "base64");
      audioQueue.current.push(filePath);
      playAudioFromQueue();
    } catch (error) {
      console.error("Error writing base64 audio to file:", error);
    }
  };

  const playAudioFromQueue = async () => {
    if (audioQueue.current.length === 0 || loadingAudio) return;
    const audioFilePath = audioQueue.current.shift()!;
    setLoadingAudio(true);

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: Date.now().toString(),
        url: `file://${audioFilePath}`,
        title: "Audio Message",
        artist: "Assistant",
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setLoadingAudio(false);
    }
  };

  const startCall = () => {
    if (websocketRef.current) websocketRef.current.close();
    setConnecting(true);
    websocketRef.current = new WebSocket(WEBSOCKET_URL);
    websocketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setConnecting(false);
      setIsCallActive(true);
      setIsMicActive(true), _startRecognizing();
    };
    websocketRef.current.onmessage = handleWebSocketMessage;
    websocketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsCallActive(false);
      setConnecting(false);
    };
    websocketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsCallActive(false);
      setConnecting(false);
    };
  };

  const endCall = () => {
    if (websocketRef.current) websocketRef.current.close();
    websocketRef.current = null;
    setTimeout(() => {
      setIsCallActive(false);
      setConnecting(false);
      setMessages([]);
      _destroyRecognizer;
      setIsMicActive(false);
    }, 500);
  };

  const handleSend = (newMessages: IMessage[]) => {
    setMessages((prev) => GiftedChat.append(prev, newMessages));

    const userMessage = newMessages[0]?.text;
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      const messagePayload = { data: userMessage, type: "transcribed" };

      websocketRef.current.send(JSON.stringify(messagePayload));
    } else {
      setConnecting(true);
      if (websocketRef.current) websocketRef.current.close();
      websocketRef.current = new WebSocket(WEBSOCKET_URL);

      websocketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsCallActive(true);
        setConnecting(false);
        const messagePayload = { data: userMessage, type: "transcribed" };
        websocketRef.current?.send(JSON.stringify(messagePayload));
      };
      websocketRef.current.onmessage = handleWebSocketMessage;
      websocketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsCallActive(false);
      };
      websocketRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsCallActive(false);
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Personality Assistant" />
      <ProgressBar progress={progress} />
      <Chat messages={messages} onSend={handleSend} />

      <CallControls
        isCallActive={isCallActive}
        connecting={connecting}
        startCall={startCall}
        endCall={endCall}
      />

      <MicControls
        isMicActive={isMicActive}
        startMic={() => {
          setIsMicActive(true);
          _startRecognizing();
        }}
        stopMic={() => {
          setIsMicActive(false);
          _destroyRecognizer();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
});

export default App;
