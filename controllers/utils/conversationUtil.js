import {v4 as uuid4} from 'uuid'
import Conversation from '../../db/models/conversation.js';

const createConversationId = async(senderId,reciverId)=>{
    let conversationId = new uuid4();
    conversationId = conversationId.toString();
    const participants=[senderId,reciverId];
    let newConversation = new Conversation({
        conversationId,
        participants
    });

    console.log(senderId,reciverId);

    try {
        await newConversation.save();
        console.log("new thingy created");
        return newConversation.conversationId;
    } catch (error) {
        console.log("idk Ma", error);
        return null;
    }
};

const getConversationId = async (sender, reciver) => {
    try {
        const conversation = await Conversation.findOne({
            participants: { $all: [sender, reciver] },
        });

        if (conversation) {
            return conversation.conversationId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving conversation ID:", error);
    }
}

export default { createConversationId, getConversationId}