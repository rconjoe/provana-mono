import * as functions from 'firebase-functions'
import { HttpsError } from 'firebase-functions/lib/providers/https'
import { CloudTasksClient } from '@google-cloud/tasks'
import * as protos from '@google-cloud/tasks/build/protos/protos'
const client = new CloudTasksClient()

export default class TaskScheduler {
  queue: string
  url: string
  payload: string
  scheduleTime: number

  constructor(
    queue: string,
    url: string,
    payload: string,
    scheduleTime: number
  ) {
    this.queue = queue
    this.url = url
    this.payload = payload
    this.scheduleTime = scheduleTime
  }

  private async schedule(): Promise<protos.google.cloud.tasks.v2.ICreateTaskRequest> {
    const queuePath = client.queuePath('chillynebula55', 'us-central1', this.queue)
  }

}