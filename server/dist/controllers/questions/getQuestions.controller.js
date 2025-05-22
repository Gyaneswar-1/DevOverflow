import db from "../../db/db.js";
export const getQuestions = async (req, res) => {
    try {
        const result = await db.questions.findMany({
            select: {
                title: true,
                description: true,
                tags: true,
                images: {
                    select: {
                        url: true
                    }
                }
            }
        });
    }
    catch (error) {
    }
    finally {
    }
};
