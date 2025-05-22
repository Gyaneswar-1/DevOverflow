import db from "../../db/db.js"
import { type Request, type Response } from "express"

export const getQuestions = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await db.questions.findMany({
            select:{
                title:true,
                description:true,
                tags:true,
                images:{
                    select:{
                        url:true
                    }
                }
            }
        })
    } catch (error) {
        
    }finally{

    }
}
