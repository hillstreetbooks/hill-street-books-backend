import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  userId: {
    type: String
  },
  username: {
    type: String
  },
  name: {
    type: String
  },
  lastUpdatedAt: {
    type: String
  },
  isViewed: {
    type: Boolean
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

export { Notification };
