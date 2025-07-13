const { default: mongoose } = require("mongoose");



const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    university: { type: String, trim: true },
    address: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,

    },
    dueDate: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;
