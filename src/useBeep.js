import { useSound } from "use-sound";

const beepSound = "./sound.mp3";

const useBeep = () => {
  const [playBeep] = useSound(beepSound, {
    volume: 0.3,
  });

  return playBeep;
};

export default useBeep;
