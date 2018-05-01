from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync

from django.apps import apps
Message = apps.get_model('testApp', 'Message')

class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.group_id = self.scope['url_route']['kwargs']['group_id']
        # self.user_name = self.scope['user']
        self.room_group_name = 'chat_%s' % self.group_id

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        # m = Message(username=username, message=message, travel_group=self.group_id)
        # m.save()
        # Send message to room group
        async_to_sync (self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'username': event['username']
        }))


