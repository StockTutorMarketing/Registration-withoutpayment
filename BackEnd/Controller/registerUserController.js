import RegisterUser from '../module/registerUserSchema.js';

export const registerUser = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Please provide details"
        });
    }

    const { FullName, Email, Phone } = req.body;

    try {
        // Checking if user already exists by email or phone number
        const isUserAlreadyInDb = await RegisterUser.findOne({ Email });
        const isPhoneNumberInDb = await RegisterUser.findOne({ Phone });
        
        // if(Phone !=10){
        //     return res.status(400).json({
        //         message: "Enter Correact Phone  Number"
        //     });
        // }


        if (isUserAlreadyInDb || isPhoneNumberInDb) {
            return res.status(400).json({
                message: "User already registered with this Email or Phone number"
            });
        }

        // Creating a new user
        const newUser = await RegisterUser.create({
            FullName,
            Email,
            Phone
        });

        return res.status(201).json({
            message: "User created",
            user: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
