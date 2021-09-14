import * as functions from 'firebase-functions'
import TaskService from '../../../services/TaskService'
import TaskDBC from '../../../dbc/TaskDBC'

export const onSlotActive = functions
  .firestore
  .document('session/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context): Promise<void> => {
    const b = change.before.data()
    const a = change.after.data()
    if (b.status === 'booked' && a.status === 'active') {
      const secondsUntil = 10800 + a.end
      const task = await new TaskService().scheduleCapture(a.id, secondsUntil)
      await new TaskDBC(a.id).write(task)
    }
    else return 
  })
