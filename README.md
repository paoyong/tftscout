# TFT Scouter

Scout players in TFT, EZ Clap

To use this [https://paoyong.github.io/tftscout/](https://paoyong.github.io/tftscout/)

## How to Code

After git clone:

`npm build` to install dependencies

`npm start` to test out in [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Algorithm
from /u/naturesbflol
https://www.reddit.com/r/CompetitiveTFT/comments/jnzy7a/hidden_system_breakdown_opponent_tracking/gb5v9c9?utm_source=share&utm_medium=web2x&context=3

Once a player dies, the amount of rounds before you can face the same player goes down by 1

Thus...

8 = 5 rounds

7 = 4 rounds

6 = 3 rounds

5 = 2 rounds

The only time matchmaking completely resets is when there’s 3 players left

ghosts are completely separate. how it determines which ghost you are fighting and who is fighting the ghost is a pretty big ?, it could even be completely random, you can definitely face a player twice in a row if you are including the ghost.
