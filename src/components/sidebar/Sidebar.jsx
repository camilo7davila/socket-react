import React, { useContext } from 'react';

import { AuthContext } from '../../auth/AuthContext';
import { ChatContext } from '../../context/chat/ChatContex';

import { SidebarChatItem } from './SidebarChat';

export const Sidebar = () => {

    const { chatState } = useContext(ChatContext);

    const { auth } = useContext(AuthContext);

    return (
        <div className="inbox_chat">

            {
                chatState?.usuarios.map((usuario) => (
                    (auth.uid !== usuario.uid) && (
                        <SidebarChatItem
                            key={usuario.uid}
                            usuario={usuario}
                        />
                    )
                ))
            }

            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>

        </div>
    )
}
