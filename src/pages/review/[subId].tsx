import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { parseSrt, useInterval } from "../../utils/subtitle";

export default function ReviewDetail() {
  const router = useRouter();
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [width, setWidth] = useState(1024);
  const [subtitle, setSubtitle] = useState<string[]>([]);
  const subtitleData = parseSrt(srt);

  useEffect(() => {
    axios
      .get(`/api/sub`, { params: { id: router.query.subId } })
      .then((res) => {});
  }, [router.query.subId]);

  const [subtitleText, setSubtitleText] = useState<string>("");

  const intervalSub = () => {
    const currentTime = player?.getCurrentTime();
    if (!currentTime) {
      return;
    }

    for (let i = 0; i < subtitleData.length; i++) {
      if (
        subtitleData[i].startTime <= currentTime &&
        currentTime <= subtitleData[i].endTime
      ) {
        console.log(subtitleData[i].text);
        setSubtitleText(subtitleData[i].text);
        break;
      }
    }
  };

  useInterval(intervalSub, 20);

  const opts = {
    width,
    height: width * (9 / 16),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      enablejsapi: 1,
      origin: "http://localhost:3000",
    },
  };

  return (
    <>
      <Box w="100%" h="80vh">
        <YouTube
          videoId="i7muqI90138"
          opts={opts}
          onReady={(event) => setPlayer(event.target)}
        />
        <Text fontSize="4xl" noOfLines={2}>
          {subtitleText}
        </Text>
      </Box>
    </>
  );
}

const srt = `1
00:00:19,552 --> 00:00:23,165
If I was your man, but not.

2
00:00:23,165 --> 00:00:25,162
We would have go to deokso alleypub.

3
00:00:25,162 --> 00:00:28,482
They would welcome me, my fucking friends.

4
00:00:28,482 --> 00:00:31,182
Beside you, the prince who will soon have seoul.

5
00:00:31,182 --> 00:00:34,282
I make money, enough to buy you saim, sejong.

6
00:00:34,282 --> 00:00:36,437
But the one who has you is my best friend.

7
00:00:36,454 --> 00:00:38,968
In a small town that kinda feeling is forbidden

8
00:00:38,968 --> 00:00:41,997
I wanna dance shuffle and get your heart, pshcye's heart

9
00:00:41,997 --> 00:00:44,587
Your heart will never know my real mind.

10
00:00:44,587 --> 00:00:46,473
Until you die naturally.

11
00:00:46,491 --> 00:00:49,358
2AM song, my iPhone's ringtone.

12
00:00:49,358 --> 00:00:51,882
Don't want to offend my friend.

13
00:00:51,882 --> 00:00:54,453
I don't betray my friend, protect my friendship.

14
00:00:54,453 --> 00:00:56,937
Till I die, It is sure. I only have my friends.

15
00:00:56,950 --> 00:00:59,740
Vow, loyal to each other, Me and him are like that.

16
00:00:59,740 --> 00:01:02,460
This makes us different from other fucking guys.

17
00:01:02,467 --> 00:01:06,437
My motto, Stay Fly Like Three 6 fia.

18
00:01:06,477 --> 00:01:08,127
Great meaning isn't it?

19
00:01:08,142 --> 00:01:10,152
Stay Fly Like Three 6 fia.

20
00:01:10,152 --> 00:01:12,679
But, I lose my mind thinking about you.

21
00:01:12,679 --> 00:01:14,879
Oh Fuck I want you mine

22
00:01:14,879 --> 00:01:17,646
However you cannot I gotta make it right

23
00:01:17,646 --> 00:01:20,240
But I stay, I think of you.

24
00:01:20,240 --> 00:01:23,112
In my dream, you are calling me baby

25
00:01:23,150 --> 00:01:25,320
Oh Fuck I want you mine

26
00:01:25,320 --> 00:01:28,120
However you cannot I gotta make it right

27
00:01:28,120 --> 00:01:30,700
But I stay, I think of you.

28
00:01:30,745 --> 00:01:33,653
In my dream, you are calling me baby.

29
00:01:33,653 --> 00:01:37,653
I have to erase you.

30
00:01:38,234 --> 00:01:42,234
Yes, I have to erase you.

31
00:01:43,166 --> 00:01:45,942
We must be different like bape and polo.

32
00:01:45,974 --> 00:01:48,584
Dukso, hyundai, Avante, Apgujeong's Roll Ro.

33
00:01:48,604 --> 00:01:51,064
However, We fit well like piano and cello.

34
00:01:51,110 --> 00:01:53,751
HOT and the 90's, vodka and Jello.

35
00:01:53,779 --> 00:01:56,327
However we should be the opposite like
South and North Korea.

36
00:01:56,362 --> 00:01:58,912
We together, there comes the storm.

37
00:01:58,912 --> 00:02:01,507
Soon as I see you my heartstrings.

38
00:02:01,507 --> 00:02:04,152
Your my forbidden steroid (I'm like usain bolt).

39
00:02:04,152 --> 00:02:07,532
For you, I will put on Cool 808 base.

40
00:02:07,532 --> 00:02:09,668
With you, no... I shouldn't ah...

41
00:02:09,672 --> 00:02:10,212
yeah.

42
00:02:10,212 --> 00:02:15,252
I thought a silly thought of fleeing to America with you
and changing your last name to goo.

43
00:02:15,257 --> 00:02:16,797
Ah, Please forgive me.

44
00:02:16,797 --> 00:02:20,007
Infront of love, money lose.

45
00:02:20,050 --> 00:02:22,070
In my heart, this is stronger then the avengers.

46
00:02:22,070 --> 00:02:25,770
Even multiplying one,ten,hundred,millon,billon on Ironman. 
Damn they lose.

47
00:02:25,789 --> 00:02:28,439
Being your man is the most important, baby.

48
00:02:28,444 --> 00:02:30,844
We must be the cool squad like asap.

49
00:02:30,959 --> 00:02:33,738
Yeah It is the past let's forget.

50
00:02:34,071 --> 00:02:35,058
Yeah I like ya girl.

51
00:02:35,078 --> 00:02:36,048
I got a fuckin problem.

52
00:02:36,119 --> 00:02:38,459
Oh Fuck I want you mine

53
00:02:38,499 --> 00:02:40,829
However you cannot I gotta make it right

54
00:02:40,845 --> 00:02:43,555
But I stay, I think of you.

55
00:02:43,593 --> 00:02:46,573
In my dream, you are calling me baby.

56
00:02:46,607 --> 00:02:48,737
Oh Fuck I want you mine

57
00:02:48,751 --> 00:02:51,361
However you cannot I gotta make it right

58
00:02:51,394 --> 00:02:53,904
But I stay, I think of you.

59
00:02:53,930 --> 00:02:56,870
In my dream, you are calling me baby.

60
00:02:56,895 --> 00:03:00,895
I have to erase you.

61
00:03:01,513 --> 00:03:05,513
Yes, I have to erase you.`;
