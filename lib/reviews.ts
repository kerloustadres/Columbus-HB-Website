/**
 * Reviews copied word for word from https://www.trustpilot.com/review/columbushb.com
 * (checked October 30, 2026). Keep text, titles and star ratings exactly as Trustpilot
 * shows them; add new ones here rather than writing summaries. Square brackets mark
 * the only edit: a typo fix for readability.
 */
export type Review = { name: string; initials: string; stars: number; title: string; text: string; date: string };

export const REVIEWS: Review[] = [
  {
    name: "Sum Di",
    initials: "SD",
    stars: 5,
    title: "Hit a bullseye!",
    text: "Working with Columbus Home Buyers was a refreshing experience. Where so many companies miss the mark, they hit a bullseye....compassionate, up front, honest and respectful. We had great communication, no hidden agendas, fees or complications and there was absolutely no pressure to make any decision. I would not hesitate to do business with them again.",
    date: "Oct 2026",
  },
  {
    name: "Connie",
    initials: "C",
    stars: 4,
    title: "Joe was awesome to work with",
    text: "Joe was awesome to work with. Highly recommend him. He is honest and thorough. Walked me through all the paperwork and explained everything to me. Joe and his brother worked very hard for me.",
    date: "Sep 2026",
  },
  {
    name: "Brian Rushley",
    initials: "BR",
    stars: 5,
    title: "Honest",
    text: "Honest. Trustworthy people to work with. No games. Efficient and easy to work with. The company [that] didn't play games.",
    date: "Sep 2026",
  },
  {
    name: "Kevin Salas",
    initials: "KS",
    stars: 5,
    title: "Shout out to Joe At Columbus",
    text: "Shout out to Joe At Columbus, he made the process simple and easy.",
    date: "Aug 2026",
  },
  {
    name: "Ruth McRoy",
    initials: "RM",
    stars: 5,
    title: "Excellent company",
    text: "Good communication and awesome to work with!",
    date: "Jul 2026",
  },
  {
    name: "Gilliland",
    initials: "G",
    stars: 5,
    title: "i can honestly say that they were",
    text: "i can honestly say that they were reasonable and a strait forward on the closing and went smoothly without any issues and would deal with home buyer Joseph again.",
    date: "Jun 2026",
  },
];
