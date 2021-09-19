import { CloudTasksClient } from '@google-cloud/tasks'
import { taskcfg } from '../config'
import * as protos from '@google-cloud/tasks/build/protos/protos'

export default class TaskService {
  client: CloudTasksClient | undefined

  constructor() {
    this.client = new CloudTasksClient(taskcfg)
  }

  public async onCheckout(slotId: string): Promise<string> {
    return await this.schedule(this.buildRequest('no-abandoned-checkouts', slotId))
  }

  public async scheduleSlotStart(slotId: string, secondsUntil: number): Promise<string> {
    return await this.schedule(this.buildRequest('slot-start', slotId, secondsUntil))
  }

  public async scheduleSessionStart(sessionId: string, secondsUntil: number): Promise<string> {
    return await this.schedule(this.buildRequest('session-start', sessionId, secondsUntil))
  }

  public async scheduleCapture(slotId: string, secondsUntil: number): Promise<string> {
    return await this.schedule(this.buildRequest('capture', slotId, secondsUntil))
  }

  private async schedule(request: protos.google.cloud.tasks.v2beta3.ICreateTaskRequest)
  : Promise<string> {
    const [ task ] = await this.client!.createTask(request)
    .catch(err => {
      throw new Error(err)
    })
    return task.name!
  }

  public async cancel(path: string) {
    await this.client!.deleteTask({name: path})
      .catch(err => {
        throw new Error(err)
      })
  }

  private buildRequest(type: string, payload: string, secondsUntil?: number)
  : protos.google.cloud.tasks.v2beta3.ICreateTaskRequest {
    let url: string
    let seconds: number
    const parent = this.client!.queuePath('db-abstract', 'us-central1', type)
    switch (type) {
      case 'no-abandoned-checkouts':
        url = 'https://us-central1-db-abstract.cloudfunctions.net/confirmCheckoutComplete'
        seconds = 300 + Date.now() / 1000
        break
      case 'slot-start':
        url = 'https://google.com'
        seconds = secondsUntil!
        break
      case 'session-start':
        url = 'https://google.com'
        seconds = secondsUntil!
        break
      case 'capture':
        url = 'https://google.com'
        seconds = secondsUntil!
      default:
        url = 'crazy.net'
        seconds = 10
        break
    }
    const task: protos.google.cloud.tasks.v2beta3.ITask = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(payload).toString('base64'),
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      },
      scheduleTime: {
        seconds: seconds
      }
    }
    return { parent, task }
  }
}
