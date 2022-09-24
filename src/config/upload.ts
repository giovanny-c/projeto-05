import multer from "multer"
import path from "path"
import * as crypto from "crypto"

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads")

export default {
    directory: uploadFolder, // onde vai ser salvo as files
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            // para renomear de forma unica as files
            const fileHash = crypto.randomBytes(10).toString("hex")

            const filename = `${fileHash}-${file.originalname}`

            callback(null, filename) // retorna o nome unico
        },
    }),
}
