import mongoose from 'mongoose';

import {getSchema, modelName, collectionName} from "../schemas/atleta.schema.js";

export default mongoose.model(modelName, getSchema(), collectionName);