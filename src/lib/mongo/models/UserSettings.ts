// src/models/UserSettings.ts
import mongoose, { Schema, model, models } from 'mongoose';
import {supportedThemes} from "@/components/Theme/ThemeProvider";

const UserSettingsSchema = new Schema({
    email: { type: String,  required: true },
    theme: { type: String, required: true, default: supportedThemes[0], enum : supportedThemes },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSettingsSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserSettings = models.UserSettings || model('UserSettings', UserSettingsSchema);

export default UserSettings;
