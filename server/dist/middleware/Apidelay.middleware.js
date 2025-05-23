export const Apidelay = (_, __, next) => {
    const delay = 3000;
    setTimeout(() => {
        next();
    }, delay);
};
