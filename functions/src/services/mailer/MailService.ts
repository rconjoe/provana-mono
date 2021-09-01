import { sg } from '../../config'

export default class MailService {
  email: string

  constructor(email: string) {
    this.email = email
  }

  public async slotSold(data: SlotSold): Promise<string> {
    const response = await sg.send({
      to: this.email,
      from: 'noreply@provana.gg',
      templateId: 'd-f644bc8af7284c169f1fc8e5535f65e7',
      dynamicTemplateData: {...data}
    })
    if (response[0].statusCode === 202) return 'Mail sent,'
    else throw new Error(`${response[0].statusCode}: ${response[0].body}`)
  }
}

interface SlotSold {
  username: string,
  service: string,
  buyer: string,
  time: string,
  date: string
}