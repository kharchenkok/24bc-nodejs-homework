import path from "path"
import fs from 'fs'
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import Avatar  from 'avatar-builder';
import { getPaths } from "./utils.js";

const storage = multer.diskStorage({
  destination: "src/public/images",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
     cb(null, uuidv4() + ext);
  },
});

const upload = multer({ storage });

export const uploadAvatar = upload.single("avatar")

export const avatarCreate = () => {
  const avatar = Avatar.builder(
    Avatar.Image.margin(Avatar.Image.roundedRectMask(Avatar.Image.compose(
      Avatar.Image.randomFillStyle(),
      Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {blur: 5, offsetX: 2.5, offsetY: -2.5,color:'rgba(0,0,0,0.75)'})
    ), 32), 8),
    128, 128);
      const name = uuidv4()
avatar.create(`${name}`).then(buffer => fs.writeFileSync(`src/tmp/${name}.png`, buffer));
return `${name}.png`
}


export const transferFile = async (file) => {
    const { __dirname } = getPaths(import.meta.url);
    // console.log("__dirname",__dirname);
    const currentPath = path.parse(__dirname).dir;
    // console.log("currentPath",currentPath);
    const transferFrom = path.join(currentPath,`/tmp/${file}`);
    // console.log("transferFrom",transferFrom);
    const transferTo = path.join(currentPath,`/public/images/${file}`);
    // console.log("transferTo",transferTo);
  fs.readdir(transferFrom, () => {
      fs.rename(transferFrom, transferTo, err => {
        if (err) {
          console.error("there was an error:", err.message)
        };
      });
  });
}