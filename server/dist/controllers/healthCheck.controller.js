export const healthCheck = (req, res) => {
    try {
        res.json({ hello: "hello World 🌏" }).status(200);
    }
    catch (error) { }
};
