// backend/src/models/Course.model.ts
import { Schema, model, Document } from "mongoose";

export interface IClass {
  title: string;
  videoUrl: string;
}

export interface IModule {
  moduleTitle: string;
  classes: IClass[];
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  modules: IModule[];
  createdBy?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { _id: false }
);

const moduleSchema = new Schema<IModule>(
  {
    moduleTitle: { type: String, required: true },
    classes: { type: [classSchema], default: [] },
  },
  { _id: false }
);

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    modules: { type: [moduleSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);























