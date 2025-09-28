import { model, models, Schema } from "mongoose"

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v: string) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    authType: ({
        type: String,
        default: "email"
    }),
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
    },
    profile_pic: {
        type: String
    }
}, { timestamps: true });

const User = models.User || model("User", userSchema);

export default User;
