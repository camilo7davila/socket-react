import React, { useContext } from 'react';
import { ChatSelect } from '../components/ChatSelect';
import { Messages } from '../components/Messages';
import { InboxPeople } from '../components/sidebar/InboxPeople';
import { ChatContext } from '../context/chat/ChatContex';

import '../css/chat.css'

export const ChatPage = () => {

    const { chatState } = useContext(ChatContext);
    console.log();

    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {
                    (!chatState.chatActivo)
                        ? <ChatSelect />
                        : <Messages />
                }

            </div>


        </div>
    )
}
