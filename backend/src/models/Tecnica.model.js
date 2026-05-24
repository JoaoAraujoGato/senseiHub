import mongoose from 'mongoose';

import {getSchema, modelName, collectionName} from "../schemas/tecnica.schema.js";

export default mongoose.model(modelName, getSchema(), collectionName);