"use client";

import { io } from "socket.io-client";

export let socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  auth: {
    token: process.env.NEXT_PUBLIC_SOCKET_TOKEN,
  },
});
