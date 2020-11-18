import React from 'react'
import { Chat } from '../components'

export default function ChatContainer({ onFocus = () => {}, isExpanded }) {

    // TODO
    const messages = [
      {id: 1, user: 'bob', color: '#d46d00', timestamp: '5:03', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ullamcorper lacus, id congue tellus.'},
      {id: 2, user: 'billy', color: '#1e90ff', timestamp: '5:05', message: 'Nam et finibus odio. Vivamus ac elit ac nisi eleifend efficitur et a neque.'},
      {id: 3, user: 'bob', color: '#d46d00', timestamp: '5:08', message: 'Nullam venenatis turpis ut enim tincidunt pharetra. Vestibulum at sem commodo nisi luctus eleifend.'},
      {id: 4, user: 'bob', color: '#d46d00', timestamp: '5:10', message: 'Integer tincidunt justo eros, ut luctus est venenatis vel.'},
      {id: 5, user: 'billy', color: '#1e90ff', timestamp: '5:15', message: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
    ]

  return (
    <Chat>
      <Chat.Form>
        <Chat.TextInput onFocus={onFocus} />
        <Chat.Send>Send</Chat.Send>
      </Chat.Form>
      <Chat.Log isExpanded={isExpanded}>
        {messages.map(message => (
          <Chat.Message key={message.id}>
            <Chat.Timestamp>
              {message.timestamp}
            </Chat.Timestamp>
            <Chat.Sender color={message.color}>
              {message.user}
            </Chat.Sender>
            <Chat.Text>
              {message.message}
            </Chat.Text>
          </Chat.Message>
        ))}
      </Chat.Log>
    </Chat>
  )
}