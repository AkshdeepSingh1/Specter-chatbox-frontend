import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
export default function Contacts({ Contacts, CurrentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    const [visibilityOfContacts, setVisibilityOfContacts] = useState(false)
    useEffect(() => {
        console.log(Contacts, CurrentUser)
        if (CurrentUser) {
            setCurrentUserImage(CurrentUser.avatarImage)
            setCurrentUserName(CurrentUser.username)
        }

    }, [Contacts, CurrentUser])
    const changeCurrentChat = (index, contact) => {
        setVisibilityOfContacts(false);
       // console.log(index, contact)
        setCurrentSelected(index);
        changeChat(contact,visibilityOfContacts);
    }

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                       <div className='title'>Contacts</div>
                        <div className="contacts">
                            {
                                Contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"
                                                />
                                            </div>
                                            <div className="username">
                                                <h6>{contact.username}</h6>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </Container>
                )
            }
        </>
    )
}
const Container = styled.div`
display:flex;
flex-direction:column;
height:100%;
width:100%;
overflow:hidden;
background-color:#111528;
border-radius:1rem;
.title{
    color:white;
    padding:1rem;
    font-size:1.5rem;
    font-weight:500;
}
.contacts{
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    overflow:auto;
    padding: 0rem 1.5rem;
    gap:0.8rem;
   

.contact{
    display:flex;
    min-height:5rem;
    width:100%;
    cursor:pointer;
    
    border-radius:0.2rem;
    padding:0.4rem;
    align-items:center;
    gap:1rem;
    transition:0.5s ease-in-out;
 

    .username{
       color:white;
    }
    .avatar{
        img{
            height:3rem;
        }
    }
}
.selected{
    background-color:darkgrey;
    color:white;
}
}
@media screen and (max-width:900px){
    .contacts{
        padding: 0rem 0rem;
    }
}
`;