# MeetCode

A chrome extension that allows real time collaboration on Leetcode questions. 

## About

Made for those who like working with others on Leetcode questions but don't like screen sharing or using external editors. This app allows users connected to the same room to have synced code editors, so they have real time view of the others' thought process.

The app works by inserting a script in order to call CodeForce methods on the editor. This allows the text to be extracted and updated. Text is sent between users with a Node server running Socket.IO. 

## Demo

<!-- ![mc_mac_3](https://user-images.githubusercontent.com/88285952/200089175-2800561f-83a4-4dd9-92b0-9fb3f61d15b8.gif)

![meetcode_win3_30](https://user-images.githubusercontent.com/88285952/200089326-ff0d0dc0-42c6-4b3d-bd9b-cf9c4d8b4eb1.gif) -->

![meetcode-demo](https://user-images.githubusercontent.com/88285952/200093073-ebdd7263-a178-468f-94fe-fa67a6af9a67.gif)



## Running locally

1. Clone repo
2. CD into meetcode/server
3. Run `npm install`
4. In Chrome extension menu, click "Load Unpacked" and upload MeetCode folder (make sure Developer mode is on)

![load-unpacked](https://user-images.githubusercontent.com/88285952/200090947-547f6829-f0bb-4e89-aadf-35152129c3b2.png)

5. Extension should now be available to use


## Bugs
- Cursor resets to line start with every update
- Random disconnects
