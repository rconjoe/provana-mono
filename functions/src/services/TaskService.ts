import { CloudTasksClient } from '@google-cloud/tasks'
import { credentials } from '@grpc/grpc-js'
import * as protos from '@google-cloud/tasks/build/protos/protos'

export default class TaskService {
  client: CloudTasksClient | undefined

  constructor() {
    // https://github.com/aertje/cloud-tasks-emulator
    if (process.env.NODE_ENV === 'test') {
      this.client = new CloudTasksClient({
        port: 8001,
        servicePath: 'localhost',
        sslCreds: credentials.createInsecure()
      })
    }
    else this.client = new CloudTasksClient()
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

  private async schedule(request: protos.google.cloud.tasks.v2beta3.ICreateTaskRequest)
  : Promise<string> {
    const [ task ] = await this.client!.createTask(request)
    .catch(err => {
      throw new Error(err)
    })
    return task.name!
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
      // ...
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
