import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import TaskDBC from '../../../dbc/TaskDBC'
import TaskService from '../../../services/TaskService'
import NotificationDBC from '../../../dbc/NotificationDBC'
import StripePaymentIntentService from '../../../services/stripe/StripePaymentIntentService'
import CancellationDBC from '../../../dbc/CancellationDBC'

export default class SessionStatusHandler {
  session: SessionDBC 
  
  constructor(session: SessionDBC) {
    this.session = session
  }

  public async potential(): Promise<void> {
    if (this.session.status === 'published') {
      for (let i=1; i<=this.session.slots!; i++) {
        await new SlotDBC(
          "",
          this.session.name,
          i,
          this.session.slots,
          this.session.mandatoryFill,
          this.session.start,
          this.session.end,
          this.session.sellerUid,
          this.session.serviceDocId,
          "",
          "",
          "",
          'published',
          this.session.id,
          undefined
        ).publish()
      }
      await new ChatRoomDBC().initialize({
        id: this.session.id!,
        creator: this.session.sellerUid!,
        title: this.session.name!
      })
    }
  }

  public async published(): Promise<void> {
    switch (this.session.status) {
      case 'published': 
        if (this.session.booked === this.session.slots) {
          await this.session.update({ status: 'full' })
          break
        }
        else break
      case 'active':
        await new NotificationDBC(
          this.session.sellerUid!,
          'Starting',
          'Your session is starting now!',
        ).send()
        break
      case 'full':
        if (this.session.mandatoryFill === true) {
          const task = await new TaskService().scheduleSessionStart(this.session.id!, this.session.start!)
          await new TaskDBC(this.session.id!).write(task)
        }
        await new NotificationDBC(
          this.session.sellerUid!,
          'Full',
          `You've filled up one of your sessions. Nice job!`,
        ).send()
        break
      case 'cancelled':
        const slots = await new SlotDBC().fetchByParent(this.session.id!)
        slots.forEach(async (slot) => {
          if (slot.status! === 'booked') {
            await new CancellationDBC(slot.toModel()).create(slot.sellerUid!)
            await new NotificationDBC(
              slot.buyerUid!,
              'Cancellation',
              'One of your bookings was cancelled by the seller. See your dashboard for details.'
            ).send()
            await new StripePaymentIntentService().cancel(slot.paymentIntent!)
            const start= await new TaskDBC(slot.id!).retrieve()
            await new TaskService().cancel(start)
            await new TaskDBC().delete(slot.id!)
          }
          await slot.ref!.delete()
            .catch(err => {
              console.error(err)
            })
        })
        await new ChatRoomDBC().delete(this.session.id!)
        await this.session.ref!.delete()
          .catch(err => {
            console.error(err)
          })
        break
      }
    }

    public async full(): Promise<void> {
      switch (this.session.status) {
        case 'full': 
          if (this.session.booked! < this.session.slots!) {
            await this.session.update({ status: 'published' })
            break
          }
        case 'active':
          await new NotificationDBC(
            this.session.sellerUid!,
            'Starting',
            `Your session is starting!`,
          ).send()
        case 'cancelled': 
          if (this.session.mandatoryFill! === true) {
            const start = await new TaskDBC(this.session.id!).retrieve()
            await new TaskService().cancel(start)
            await new TaskDBC().delete(this.session.id!)
          }
          const slots = await new SlotDBC().fetchByParent(this.session.id!)
          slots.forEach(async (slot) => {
            await new CancellationDBC(slot.toModel()).create(slot.sellerUid!)
            await new NotificationDBC(
              slot.buyerUid!,
              'Cancellation',
              'One of your bookings was cancelled by the seller. See your dashboard for details.'
            ).send()
            await new StripePaymentIntentService().cancel(slot.paymentIntent!)
            if (this.session.mandatoryFill === false) {
              const start = await new TaskDBC(slot.id!).retrieve()
              await new TaskDBC().delete(start)
            }
            await slot.ref!.delete()
            .catch(err => {
              console.error(err)
            })
          })
          await new ChatRoomDBC().delete(this.session.id!)
          await this.session.ref!.delete()
            .catch(err => {
              console.error(err)
            })
        case 'published': 
          if (this.session.mandatoryFill! === true) {
            const start = await new TaskDBC(this.session.id!).retrieve()
            await new TaskService().cancel(start)
            await new TaskDBC().delete(this.session.id!)
          }
          return
      }
    }

  public async active(): Promise<void> {
    switch (this.session.status) {
      case 'succeeded': 
        await new ChatRoomDBC().removeFromRoom(this.session.sellerUid!, this.session.id!)
        break
    }
  }

  public async cancelled(): Promise<void> {
    switch (this.session.status) {
      case 'published':
        // calls on session republish
        return
    }
  }
}
