import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import {User} from "../models/user.model.js";
import { Message } from "../models/message.model.js"; 
import { v2 as cloudinary} from "cloudinary";
import { getRecieverSocketId } from "../utils/socket.js";

export const getAllUsers = catchAsyncError(async (req, res, next) =>{
   const user = req.user;
   const filteredUsers = await User.find({_id : {$ne : user }}).select(
    "-password"
   );
   res.status(200).json({
    success : true,
    users : filteredUsers,
   });
});2026

export const getMessages = catchAsyncError(async (req, res, next) => {
    const recieverId = req.params.id;
    const myId = req.user._id;
    const reciever = await User.findById(recieverId);
    if(!reciever) {
        return res.status(400).json ({
            success : false,
            message : "Reciever ID invalid.",
        });
    }
    const message = await Message.find({
        $or : [
            {senderId : myId, recieverId : recieverId},
            {senderId : recieverId, recieverId : myId},  
        ],
    }).sort({createdAt : 1}) ;
    res.status(200).json({
        success : true,
        message,
    });
});

export  const sendMessage = catchAsyncError(async (req, res, next) =>{
    const {text} = req.body;
    const media = req?.files?.media;
    const {id : recieverId} = req.params;
    const senderId = recieverId.ser._id;
    const recieer = await User.findById(recieverId);
    if(!recieverId) {
        return res.status(400).json({
            success :false,
            message : "Reciever Id Invalid.",
        });
    }
    const sanitizedText = text?.trim() || "";

    if(!sanitizedText && !media) {
        return req.status(400).json({
            success :false,
            message : "Cannot send empty messsage",
        });
    }
    
    let mediaUrl = "";
    if(media) {
        try {
        const uploadResponse = await cloudinary.uploader.upload(
            media.tempFilePath,
            {
                resource_type: "auto", //auto-detect image/video
                folder : "CHAT_APP_MEDIA",
                transformation : [
                    {width : 1080, height : 1080, crop : "limit"},
                    {quality : "auto"},
                    { fetch_format : "auto"} ,
                ],
            }
        );  
        mediaUrl= uploadResponse?.secure_url;
    } catch(error){
        console.error("Cloudinary upload error:", error);
        return res.status(500).json ({
            success : false,
            message : "Failed to upload media. Please try again later.",
        });
    }
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        text: sanitizedText,
        media : mediaUrl,
    });

    const recieverSocketId = getRecieverSocketId(recieverId);

    if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage", message)
    }
    res.status(201).json(newMessage);
});