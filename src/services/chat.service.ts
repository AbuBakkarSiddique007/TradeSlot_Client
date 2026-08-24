import { axiosPublic } from "@/hooks/useAxiosPublic";
import type { WebChatMessagePayload, WebChatResponse } from "@/types";

export const chatService = {
  sendMessage: async (payload: WebChatMessagePayload): Promise<WebChatResponse> => {
    const res = await axiosPublic.post<WebChatResponse>(
      "/channels/webchat/message",
      payload
    );
    return res.data;
  },

  getOrCreateSessionId: (): string => {
    if (typeof window === "undefined") return "session_guest";

    let sid = localStorage.getItem("tradeslot_webchat_session_id");

    if (!sid) {
      sid = "webchat_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      localStorage.setItem("tradeslot_webchat_session_id", sid);
    }

    return sid;
  },
};
