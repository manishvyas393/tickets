import { Publisher, ExpirationCompleteEvent, Subjects } from "@manish-npm-common-micro/odd";

export class ExplirePulisher extends Publisher<ExpirationCompleteEvent> {
      subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}