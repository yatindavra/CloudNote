// const { __esModule } = require('@testing-library/jest-dom/dist/matchers');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default:"General"
    },
    date: {
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model("notes",NotesSchema);