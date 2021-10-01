import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import CancellationDBC from '../../dbc/CancellationDBC'
import NotificationDBC from '../../dbc/NotificationDBC';

export const cancelSlot = functions.https.onCall(async (data, context): Promise<void> => {
  const notif = new NotificationDBC(data.uid,"Cancellation","A user has cancled their session with you, please check your dashboard",true);
  const slot = await new SlotDBC().fromId(data.id)
  await new CancellationDBC(slot.toModel()).create(data.uid)
  await slot.update({ status: 'cancelled' })
  await notif.send();
})
