export class Booking {
  constructor(
    public id: string,
    public ownerId: string,
    public actId: string,
    public bookingDate: Date,
    public quantity: number,
    public total: number,
    public contactPerson: {
      name: string,
      contactNumber: string,
      email: string
    },
    public status: string
  ) {}
}
