export const pageTransition = {
  initial: { opacity: 0, x: -100 },
  open: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
