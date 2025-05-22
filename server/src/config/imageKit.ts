import { validatedEnv } from "../helper/zodENVvalidation.js"
import ImageKit from "imagekit"

const imagekit = new ImageKit({
    publicKey: validatedEnv.IMAGEKIT_PUBLIC_KEY,
    privateKey: validatedEnv.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: validatedEnv.IMAGEKIT_URL_ENDPOINT,
})

export default imagekit