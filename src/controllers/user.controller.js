import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from '..models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    // check validation, not empty
    // check if user already exists: username , email
    // check for image, then check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in database
    // remove password and refresh token fields from response
    // check for user cretion
    // return res


    // get user detail from frontend

    const { fullName, email, username, password } = req.body
    console.log("email", email);

    // check validation, not empty

    if(
        [fullName, email, username, password].some((field) =>
        field?.trim()==="")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username , email

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if ( existedUser ){
        throw new ApiError(409, "User with username or email already exists")
    }

    // check for image, then check for avatar

    const avatarLocalPath = req.file?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if ( !avatarLocalPath){
        throw new ApiError(409, "Avatar file is required")
    }

    // upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(409, "Avatar file is required")
    }

    // create user object - create entry in database

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    // check for user cretion

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return res

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {registerUser}