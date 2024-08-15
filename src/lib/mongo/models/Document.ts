import mongoose, { Schema, model, models } from 'mongoose';

const DocumentSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

DocumentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Document = models.Document || model('Document', DocumentSchema);

export default Document;
