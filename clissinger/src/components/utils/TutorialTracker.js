export const TutorialVisto = (tutorialKey) => {
  return localStorage.getItem(tutorialKey) === 'true';
};

export const setTutorialVistoTrue = (tutorialKey) => {
  localStorage.setItem(tutorialKey, 'true');
};