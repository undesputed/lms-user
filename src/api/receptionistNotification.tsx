import api from 'src/api/api';
import {
  Notification,
  NotificationCred
} from 'src/reducers/receptionistNotification/receptionistNotification';

export function createNotification(
  credentials: NotificationCred
): Promise<Notification> {
  return api
    .post<Notification>(`receptionistNotification`, credentials)
    .then((res) => res.data);
}

export function retrieveNotifById(id: number): Promise<Notification[]> {
  return api
    .get<Notification[]>(`receptionistNotification/notifById/${id}`)
    .then((res) => res.data);
}
