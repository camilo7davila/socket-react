import React, { useContext } from 'react';
import { ChatContext } from '../../context/chat/ChatContex';
import { fetchConToken } from '../../helpers/fetch';
import { types } from '../../types/types';

export const SidebarChatItem = ({ usuario }) => {

    const { chatState ,dispatch } = useContext(ChatContext);

    const onClick = async () => {
        dispatch({
            type: types.activarChat,
            payload: usuario.uid
        });

        const resp = await fetchConToken(`mensajes/${usuario.uid}`);
        
        console.log(resp.message);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.message
        });
    }

    //Cargar los mensajes del chat

    return (
        <div
            className={`chat_list ${(usuario.uid === chatState.chatActivo && 'active_chat')}`}
            onClick={onClick}
        >
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{usuario.nombre}</h5>
                    {
                        (usuario.online)
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
