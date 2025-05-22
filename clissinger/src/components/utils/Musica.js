let musicAudio = null;
let effectAudio = null;

export const playMusic = (src, volume = 1, loop = true) => {
  if (musicAudio) {
    musicAudio.pause();
  }

  musicAudio = new Audio(src);
  musicAudio.volume = volume;
  musicAudio.loop = loop;
  musicAudio.play();
};

export const stopMusic = () => {
  if (musicAudio) {
    musicAudio.pause();
    musicAudio = null;
  }
};

export const playEffect = (src, volume = 1) => {
  effectAudio = new Audio(src);
  effectAudio.volume = volume;
  effectAudio.play();
};