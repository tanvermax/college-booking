
const { default: mongoose } = require("mongoose");


// name, subject, email, phone, address, dob, image
const CollegeSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    subject: {
        type: String,

    },
    phone: {
        trype: Number,
    }
    ,
    college: {
        type: String,
        
    },
    address: {
        type: String,
        trim: true
    },
    dob: {
        type: Date,
    },
    image: {
        type: String,

        trim: true
    },
    reviews: [{
        rating: {
            type: Number,
            min: 1,
            max: 5,

        },
        comment: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },

    ],
   

}, { timestamps: true })

const College = mongoose.models.College || mongoose.model("College", CollegeSchema);


export default College;
