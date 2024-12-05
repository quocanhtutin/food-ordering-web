import express from 'express';
import { addFood } from '../controller/FoodController.js';
import multer from 'multer';
import e from 'express';

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post('/add',upload.single("image") ,addFood);




export default foodRouter;

