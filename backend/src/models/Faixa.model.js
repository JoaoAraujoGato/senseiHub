import mongoose from 'mongoose';

import {getSchema, modelName, collectionName} from "../schemas/faixa.schema.js";

export default mongoose.model(modelName, getSchema(), collectionName);