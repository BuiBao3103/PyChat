from src import db, lm
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
import enum


@lm.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class ConversationType(enum.Enum):
    GROUP = "group"
    PERSONAL = "personal"


class Conversation(db.Model, SerializerMixin):
    __tablename__ = 'conversations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(Enum(ConversationType), nullable=False)
    last_message_id = Column(Integer, ForeignKey('messages.id'), nullable=True)
    last_message = relationship('Message', foreign_keys='Conversation.last_message_id', lazy=True)
    participants = relationship("Participant", backref="conversation",
                                foreign_keys='Participant.conversation_id', lazy=True)
    # messages = relationship("Message", backref="conversation.py",
    #                         foreign_keys='Message.conversation_id', lazy=True)
    # seen_conversations = relationship('SeenConversation', backref='conversation.py',
    #                                   foreign_keys='SeenConversation.conversation_id', lazy=True)
    # deleted_conversations = relationship('DeletedConversation', backref='conversation.py',
    #                                      foreign_keys='DeletedConversation.conversation_id', lazy=True)
    serialize_rules = ('-participants.conversation',)


class Participant(db.Model, SerializerMixin):
    __tablename__ = 'participants'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    conversation_id = Column(Integer, ForeignKey('conversations.id'))


class MessageType(enum.Enum):
    TEXT = 'text'
    MEDIA = 'media'
    IMAGE = 'image'
    VOICE = 'voice'


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String(255), nullable=False)
    time = Column(DateTime, nullable=False)
    type = Column(Enum(MessageType), nullable=False)
    conversation_id = Column(Integer, ForeignKey('conversations.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    attachments = relationship("Attachment", backref="message",
                               foreign_keys='Attachment.message_id', lazy=True)
    # deleted_messages = relationship('DeletedMessage', backref='message',
    #                                 foreign_keys='DeletedMessage.message_id', lazy=True)
    serialize_rules = ('-participants.conversation', '-user',)


class Attachment(db.Model):
    __tablename__ = 'attachments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(255), nullable=False)
    message_id = Column(Integer, ForeignKey('messages.id'))


class FriendshipStatus(enum.Enum):
    BLOCKED = "blocked"
    BE_BLOCKED = "be_blocked"
    REQUEST_SENT = "request_sent"
    REQUEST_RECEIVED = "request_received"
    FRIENDS = "friends"


class Friendship(db.Model, SerializerMixin):
    __tablename__ = 'friendships'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    friend_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    status = Column(Enum(FriendshipStatus), nullable=False)
    delete_at = Column(DateTime, default=None)

    # serialize_rules = ('-user',)


class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80))
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    last_online = Column(DateTime, nullable=True)
    first_name = Column(String(120), nullable=False)
    last_name = Column(String(120), nullable=False)
    participants = relationship("Participant", backref="user",
                                foreign_keys='Participant.user_id', lazy=True)
    messages = relationship("Message", backref="user",
                            foreign_keys='Message.user_id', lazy=True)
    friendships = relationship('Friendship', backref='friend',
                               foreign_keys='Friendship.friend_id', lazy=True)
    deleted_messages = relationship('DeletedMessage', backref='user',
                                    foreign_keys='DeletedMessage.user_id', lazy=True)
    seen_conversations = relationship('SeenConversation', backref='user',
                                      foreign_keys='SeenConversation.user_id', lazy=True)
    deleted_conversations = relationship('DeletedConversation', backref='user',
                                         foreign_keys='DeletedConversation.user_id', lazy=True)

    serialize_rules = ('-participants', '-friendships', '-messages',
                       '-deleted_messages', '-seen_conversations',
                       '-deleted_conversations', '-password',)


class DeletedMessage(db.Model):
    __tablename__ = 'deleted_messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    message_id = Column(Integer, ForeignKey('messages.id'))


class SeenConversation(db.Model):
    __tablename__ = 'seen_conversations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    conversation_id = Column(Integer, ForeignKey('conversations.id'))


class DeletedConversation(db.Model):
    __tablename__ = 'deleted_conversations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    conversation_id = Column(Integer, ForeignKey('conversations.id'))

