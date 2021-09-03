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

  public async onCheckout(slotId: string): Promise<void> {
    return await this.schedule(this.buildRequest('no-abandoned-checkouts', slotId))
  }

  private async schedule(request: protos.google.cloud.tasks.v2beta3.ICreateTaskRequest)
  : Promise<void> {
    await this.client!.createTask(request)
    .catch(err => {
      throw new Error(err)
    })
  }

  private buildRequest(type: string, payload: string)
  : protos.google.cloud.tasks.v2beta3.ICreateTaskRequest {
    let url: string
    let seconds: number
    const parent = this.client!.queuePath('db-abstract', 'us-central1', type)
    switch (type) {
      case 'no-abandoned-checkouts':
        url = 'https://www.google.com'
        seconds = 300 + Date.now() / 1000
        break
      case 'capture-intent':
        url = 'wow.com'
        seconds = 10
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
