export interface Tweet {
    _id: string;
    name: string;
    username: string;
    profile_pic_url: string;
    content: string;
    media: any[];
    date: number;
    dateString: string;
    time: string;
    profile_url: string;
    tweet_url: string;
    retweeted: boolean;
}
