import { create } from "zustand";
import { colors } from "../constants";

type Post = {
  id: string;
  user: string;
  handle: string;
  initials: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  tag: string;
  tagColor: string;
  liked: boolean;
};

type PostState = {
  posts: Post[];
  likePost: (id: string) => void;
  addPost: (
    post: Omit<Post, "id" | "likes" | "comments" | "shares" | "liked">,
  ) => void;
};

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    user: "Amina Wanjiru",
    handle: "@amina_w",
    initials: "AW",
    time: "2m ago",
    content:
      "Just got accepted into the ALX Africa Software Engineering program! If you are a Kenyan youth looking to break into tech, apply now. Deadline is this Friday. #ALX #KenyanYouth #Tech",
    likes: 142,
    comments: 38,
    shares: 21,
    tag: "Opportunity",
    tagColor: colors.primary,
    liked: false,
  },
  {
    id: "2",
    user: "Kamau Njoroge",
    handle: "@kamau_dev",
    initials: "KN",
    time: "15m ago",
    content:
      "Built my first React Native app today using zConnect as inspiration. The Kenyan tech scene is on fire right now. Who else is building something? Drop your project below. #BuildInPublic",
    likes: 89,
    comments: 24,
    shares: 12,
    tag: "Tech",
    tagColor: colors.info,
    liked: false,
  },
  {
    id: "3",
    user: "Zawadi Ochieng",
    handle: "@zawadi_o",
    initials: "ZO",
    time: "1h ago",
    content:
      "Reminder: The Youth Enterprise Fund applications close next week. Up to KES 500,000 available for young entrepreneurs aged 18-35. Do not sleep on this opportunity! #YEF #KenyanEntrepreneur",
    likes: 310,
    comments: 67,
    shares: 89,
    tag: "Finance",
    tagColor: colors.warning,
    liked: false,
  },
  {
    id: "4",
    user: "Brian Otieno",
    handle: "@brian_otieno",
    initials: "BO",
    time: "3h ago",
    content:
      "Thread: 10 free online certifications that Kenyan employers actually value in 2024.\n\n1. Google Digital Skills for Africa\n2. Cisco Networking Academy\n3. HubSpot Marketing\n\n#CareerTips #Kenya",
    likes: 521,
    comments: 103,
    shares: 214,
    tag: "Career",
    tagColor: colors.accent,
    liked: false,
  },
];

const usePostStore = create<PostState>((set) => ({
  posts: INITIAL_POSTS,

  likePost: (id: string) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    })),

  addPost: (post) =>
    set((state) => ({
      posts: [
        {
          ...post,
          id: Date.now().toString(),
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
        },
        ...state.posts,
      ],
    })),
}));

export default usePostStore;
