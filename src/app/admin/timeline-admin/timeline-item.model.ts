export class TimelineItem {

  constructor(
    public role: string = '',
    public company: string = '',
    public description: string = '',
    public link: string = '',
    public badge: string = '',
    public year: number = 1991,
    public _id?: string
  ) {}
}
