export class Activity {
  constructor(
    public id: string,
    public name: string,
    public activityType: string,
    public description: string,
    public location: string,
    public price: number,
    public imgUrl: string,
    public contactDetails: string,
    public bookingStart: Date,
    public bookingEnd: Date,
    public capacity: number,
    public duration: number,
    public owner: any,
    public bookings: number,
    public cancelled: boolean
  ) {}
}
