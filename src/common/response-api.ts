export class ResponseApiSuccess<T> {
  constructor(public status: boolean = true, public data: T, public message?: string) {
  }
}

export class ResponseApiError<T> {
  constructor(public status: boolean = true, public data: T, public message?: string) {
  }
}